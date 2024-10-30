"user server"

import pool from "@/lib/db"


export async function listMembers({
  page = 1,
  limit = 20,
  filters = {},
}: {
  page?: number;
  limit?: number;
  filters?: { [key: string]: string };
}) {
  const offset = (page - 1) * limit;

  const _filters = Object.entries(filters || {})
    .map(([key, value]) => {
      if (value && String(value).trim()) {
        // Use starts with (^) for constituency, regular ILIKE for others
        return key === 'constituency'
          ? `${key} ILIKE '${value}'`
          : `${key} ILIKE '%${value}%'`;
      }
      return null;
    })
    .filter(Boolean);

  const whereClause = _filters.length ? `WHERE ${_filters.join(" AND ")}` : "";

  // Get total count without limit
  const countResult = await pool.query(
    `SELECT COUNT(*) as total FROM voters ${whereClause}`
  );

  // Get paginated results
  const result = await pool.query(
    `SELECT * FROM voters ${whereClause} ORDER BY dl LIMIT ${limit} OFFSET ${offset}`
  );

  return {
    rows: result.rows,
    total: parseInt(countResult.rows[0].total)
  };
}