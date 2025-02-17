import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useState } from "react";

interface VerlofRequest {
  id: string;
  userName: string;
  startDate: string;
  endDate: string;
  reason: string;
  status: string;
}

interface VerlofRequestsSectionProps {
  groups: string[];
  requests: VerlofRequest[];
}

const VerlofRequests: React.FC<VerlofRequestsSectionProps> = ({
  groups,
  requests,
}) => {
  const [selectedGroup, setSelectedGroup] = useState(groups[0] || "");

  const filteredRequests = requests.filter((req) => {
    return true;
  });

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Verlof Aanvragen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Gebruiker</TableHead>
                <TableHead>Begin datum</TableHead>
                <TableHead>Eind Datum</TableHead>
                <TableHead>Reden</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.userName}</TableCell>
                  <TableCell>{req.startDate}</TableCell>
                  <TableCell>{req.endDate}</TableCell>
                  <TableCell>{req.reason}</TableCell>
                  <TableCell>{req.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default VerlofRequests;
