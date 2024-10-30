
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { format } from "date-fns"

import { UserDetailsModal } from '@/components/custom/user-details-modal'
import { UserFilters } from '@/components/custom/user-filters'
import { UserRow } from '@/components/custom/user-row'
import { listMembers } from "./actions/members"
import { UserPaginator } from "@/components/custom/user-paginator"
import { UserSummary } from "@/components/custom/user-summary"

export interface User {
  nid: string
  surname: string
  o_name: string
  alias: string
  address: string
  dl: string
  constituency: string
  voter_id: string
}


export default async function UserTable({
  searchParams
}: {
  searchParams: Promise<{
    page: string
    nid: string
    surname: string
    o_name: string
    alias: string
    address: string
    dl: string
    constituency: string
    voter_id: string
    limit: string
  }>
}) {

  const {
    page = '1',
    limit = '20',
    surname,
    o_name,
    alias,
    address,
    dl,
    constituency,
    voter_id
  } = await searchParams


  const {
    rows: users,
    total
  } = await listMembers({
    page: parseInt(page),
    limit: parseInt(limit || '20'),
    filters: {
      surname,
      o_name,
      alias,
      address,
      dl,
      constituency,
      voter_id
    }
  })



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Voters</h1>
      <UserFilters user={users[0]} />
      <UserSummary total={total} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>NID</TableHead>
            <TableHead>Surname</TableHead>
            <TableHead>Other Names</TableHead>
            <TableHead>Alias</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>DL</TableHead>
            <TableHead>Constituency</TableHead>
            <TableHead>ID</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <UserRow user={user} key={index} />
          ))}
        </TableBody>
      </Table>
      
      <UserPaginator />

      {/* <UserDetailsModal
        selectedUser={selectedUser}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen} /> */}
    </div>
  )
}