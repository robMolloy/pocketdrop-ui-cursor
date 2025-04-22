import { ConfirmationModalContent } from "@/components/Modal";
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
const statusColorClassMap = {
  pending: "bg-gray-400",
  approved: "bg-green-500",
  denied: "bg-destructive",
} as const;

const UserStateSelect = (p: { user: TUser; onStatusChange: (x: TUser) => void }) => {
  return (
    <>
      <Select
        value={p.user.status}
        onValueChange={(status: TUserStatus) => p.onStatusChange({ ...p.user, status })}
      >
        <SelectTrigger className={`w-[180px] ${statusColorClassMap[p.user.status]}`}>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {p.user.status === "pending" && <SelectItem value="pending">Pending</SelectItem>}
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
                      <ConfirmationModalContent
                        title="Update status"
                        description={`Are you sure you want to change the status of ${user.name} to ${user.status}?`}
                        onConfirm={() => updateUserStatus({ pb, id: user.id, status: user.status })}
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
