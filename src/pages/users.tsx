import { ModalContent } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { pb } from "@/config/pocketbaseConfig";
import { TUser, updateUserStatus } from "@/modules/users/dbUsersUtils";
import { useUsersStore } from "@/modules/users/usersStore";
import { useModalStore } from "@/stores/modalStore";

type TUserStatus = TUser["status"];

const UserStateSelect = (p: { user: TUser; onStatusChange: (x: TUser) => void }) => {
  return (
    <>
      <Select
        value={p.user.status}
        onValueChange={(status: TUserStatus) => p.onStatusChange({ ...p.user, status })}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="denied">Denied</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

const UsersPage = () => {
  const usersStore = useUsersStore();
  const modalStore = useModalStore();

  return (
    <div>
      <h1 className="m-0 text-3xl font-bold">Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersStore.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <UserStateSelect
                  user={user}
                  onStatusChange={async (user: TUser) => {
                    modalStore.setData(
                      <ModalContent
                        title="Update status"
                        description={`Are you sure you want to change the status of ${user.name} to ${user.status}?`}
                        buttons={
                          <>
                            <Button variant="destructive" onClick={() => modalStore.close()}>
                              Cancel
                            </Button>
                            <Button
                              onClick={async () => {
                                await updateUserStatus({ pb, id: user.id, status: user.status });
                                modalStore.close();
                              }}
                            >
                              Confirm
                            </Button>
                          </>
                        }
                      />,
                    );
                  }}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
