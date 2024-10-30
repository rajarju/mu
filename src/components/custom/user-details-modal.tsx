import { User } from "@/app/page"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

export const UserDetailsModal = ({ 
  selectedUser,
  isDialogOpen,
  setIsDialogOpen
 }: {
  selectedUser : User
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
}) => {
  return <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>User Details</DialogTitle>
      <DialogDescription>
        Detailed information for the selected user.
      </DialogDescription>
    </DialogHeader>
    {selectedUser && (
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-right font-medium">NID:</label>
          <span className="col-span-3">{selectedUser.nid}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-right font-medium">Surname:</label>
          <span className="col-span-3">{selectedUser.surname}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-right font-medium">Other Names:</label>
          <span className="col-span-3">{selectedUser.o_name}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-right font-medium">Alias:</label>
          <span className="col-span-3">{selectedUser.alias}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-right font-medium">Address:</label>
          <span className="col-span-3">{selectedUser.address}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-right font-medium">DL:</label>
          <span className="col-span-3">{selectedUser.dl}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-right font-medium">Constituency:</label>
          <span className="col-span-3">{selectedUser.constituency}</span>
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <label className="text-right font-medium">Number:</label>
          <span className="col-span-3">{selectedUser.voter_id}</span>
        </div>
      </div>
    )}
  </DialogContent>
</Dialog>
}