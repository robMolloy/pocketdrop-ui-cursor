import { pb } from "@/config/pocketbaseConfig";
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
import { TUser, updateUserStatus } from "@/modules/users/dbUsersUtils";
import { useUsersStore } from "@/modules/users/usersStore";



const UserStateSelect = (p: {
  user: TUser
  onStatusChange: (x: TUser) => void
}) => {
  return (
    <Select
      value={p.user.status}
      onValueChange={(value: "pending" | "approved" | "denied") =>
        p.onStatusChange({ ...p.user, status: value })
      }
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
  );
};

const UsersPage = () => {
  const usersStore = useUsersStore();

  const handleStatusChange = async (user: TUser) => {
    try {
      await updateUserStatus({ pb, id: user.id, status: user.status });
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="mb-8 text-3xl font-bold">Users</h1>
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
                  onStatusChange={handleStatusChange}
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
