import { User } from "@/app/page"
import {
  TableCell,
  TableRow,
} from "@/components/ui/table"

export const UserRow = ({ user }: {
  user: User
}) => {

  return <TableRow className="cursor-pointer hover:bg-muted">
  <TableCell>{user.nid}</TableCell>
  <TableCell>{user.surname}</TableCell>
  <TableCell>{user.o_name}</TableCell>
  <TableCell>{user.alias}</TableCell>
  <TableCell>{user.address}</TableCell>
  <TableCell>{user.dl}</TableCell>
  <TableCell>{user.constituency}</TableCell>
  <TableCell>{user.voter_id}</TableCell>
</TableRow>
}