import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LeaveRequestController from "@/controllers/leave-request-controller";
import { LeaveRequestData } from "@/models/leave_request";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

export interface Application {
  name: string;
  email: string;
  status: "approved" | "rejected" | "pending";
}

const statusConfig = {
  approved: {
    label: "Goedgekeurd",
    color: "text-[#4ade80]",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Afgekeurd",
    color: "text-[#dc2626]",
    icon: XCircle,
  },
  pending: {
    label: "In afwachting",
    color: "text-[#fde047]",
    icon: Clock,
  },
};

export default async function RecentApplications() {
  const { data, errors, success } =
    await LeaveRequestController.getMyRequests();


  data.map(
    (element: {
      start_date: string | number | Date;
      end_date: string | number | Date;
    }) => ({
      ...element,
      startDate: new Date(element.start_date),
      endDate: new Date(element.end_date),
    }),
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Recente aanvragen</h2>
          <p className="text-muted-foreground">
            Recente ingediende aanvragen voor verlof
          </p>
        </div>
        <Button
          variant="default"
          className="bg-[#09090b] text-white hover:bg-[#09090b]/90 ml-4"
        >
          Toon alle
          <span className="ml-2">↗</span>
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-sm font-medium text-muted-foreground">
          Werknemer
        </div>
        <div className="text-sm font-medium text-muted-foreground">Status</div>
      </div>

      <div className="space-y-4">
        {success ? (
          data.map((application: LeaveRequestData, index: number) => {
            const status = {
              label: application.state,
              color: "text-gray-500",
              icon: XCircle,
            };
            const StatusIcon = status.icon;

            return (
              <div key={index} className="grid grid-cols-2 gap-4 items-center">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage
                      src={application.user?.avatar_url}
                      alt={application.user?.full_name}
                    />
                    <AvatarFallback>OM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{application.user?.full_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {application.user?.email}
                    </div>
                  </div>
                </div>
                <div className={`flex items-center gap-2 ${status.color}`}>
                  <StatusIcon className="w-5 h-5" />
                  {status.label}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-muted-foreground">
            Er zijn geen recente aanvragen
          </div>
        )}
      </div>
    </Card>
  );
}
