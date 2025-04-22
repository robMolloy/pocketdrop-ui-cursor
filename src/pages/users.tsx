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
import { updateUserStatus } from "@/modules/users/dbUsersUtils";
import { useUsersStore } from "@/modules/users/usersStore";

const UsersPage = () => {
  const usersStore = useUsersStore();

  const handleStatusChange = async (
    userId: string,
    newStatus: "undefined" | "approved" | "denied",
  ) => {
    try {
      await updateUserStatus({ pb, id: userId, status: newStatus });
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
                <Select
                  value={user.status}
                  onValueChange={(value: "undefined" | "approved" | "denied") =>
                    handleStatusChange(user.id, value)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="undefined">Undefined</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="denied">Denied</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersPage;
