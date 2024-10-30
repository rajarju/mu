import { NextRequest } from 'next/server'
import pool from "@/lib/db"
import { Transform } from 'stream'
import { Readable } from 'stream'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  
  // Extract filter parameters
  const filters: { [key: string]: string } = {}
  const filterKeys = ['surname', 'o_name', 'alias', 'address', 'dl', 'constituency', 'voter_id']
  filterKeys.forEach(key => {
    const value = searchParams.get(key)
    if (value) filters[key] = value
  })

  // Build WHERE clause similar to listMembers
  const _filters = Object.entries(filters)
    .map(([key, value]) => {
      if (value && String(value).trim()) {
        return key === 'constituency'
          ? `${key} ILIKE '${value}%'`
          : `${key} ILIKE '%${value}%'`;
      }
      return null;
    })
    .filter(Boolean);

  const whereClause = _filters.length ? `WHERE ${_filters.join(" AND ")}` : "";

  // Create a readable stream from the database query
  const cursor = await pool.query(
    `SELECT * FROM voters ${whereClause} ORDER BY dl`
  )

  // Create a readable stream from the query result
  const dbStream = new Readable({
    objectMode: true,
    read(this: Readable & { rowIndex?: number }) {
      if (!this.rowIndex) this.rowIndex = 0
      if (this.rowIndex >= cursor.rows.length) {
        this.push(null)
      } else {
        this.push({ row: cursor.rows[this.rowIndex++] })
      }
    }
  })

  // Create transform stream to convert rows to CSV
  const csvTransform = new Transform({
    objectMode: true,
    transform(this: Transform & { isFirstChunk?: boolean }, chunk, encoding, callback) {
      // First row - write headers
      if (this.isFirstChunk) {
        this.push(
          'nid,surname,o_name,alias,address,dl,constituency,voter_id\n'
        )
        this.isFirstChunk = false
      }
      
      // Convert row to CSV line
      const row = chunk.row
      const line = [
        row.nid,
        row.surname,
        row.o_name,
        row.alias,
        row.address,
        row.dl,
        row.constituency,
        row.voter_id
      ].map(field => `"${String(field).replace(/"/g, '""')}"`).join(',') + '\n'
      
      callback(null, line)
    }
  }) as Transform & { isFirstChunk: boolean }
  csvTransform.isFirstChunk = true

  // Create the response stream
  const stream = Readable.from(dbStream.pipe(csvTransform))

  
  return new Response(stream as any, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="voters.csv"',
      'Transfer-Encoding': 'chunked'
    }
  })
}

