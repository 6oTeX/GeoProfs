import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, XCircle } from "lucide-react"

export interface Application {
    name: string
    email: string
    status: "approved" | "rejected" | "pending"
}

const applications: Application[] = [
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        status: "approved",
    },
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        status: "rejected",
    },
    {
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        status: "pending",
    },
]

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
}

export default function RecentApplications(Application: Application[] = applications) {
    return (
        <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-semibold mb-1">Recente aanvragen</h2>
                    <p className="text-muted-foreground">Recente ingediende aanvragen voor verlof</p>
                </div>
                <Button variant="default" className="bg-[#09090b] text-white hover:bg-[#09090b]/90">
                    Toon alle
                    <span className="ml-2">↗</span>
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="text-sm font-medium text-muted-foreground">Werknemer</div>
                <div className="text-sm font-medium text-muted-foreground">Status</div>
            </div>

            <div className="space-y-4">
                {applications.map((application, index) => {
                    const status = statusConfig[application.status]
                    const StatusIcon = status.icon

                    return (
                        <div key={index} className="grid grid-cols-2 gap-4 items-center">
                            <div className="flex items-center gap-3">
                                <Avatar>
                                    <AvatarImage
                                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Design_GeoProfs____40shadcn_2Fui-kDYGu1fpVshBz2pn9T8vsGvVyXcgta.png"
                                        alt={application.name}
                                    />
                                    <AvatarFallback>OM</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className="font-medium">{application.name}</div>
                                    <div className="text-sm text-muted-foreground">{application.email}</div>
                                </div>
                            </div>
                            <div className={`flex items-center gap-2 ${status.color}`}>
                                <StatusIcon className="w-5 h-5" />
                                {status.label}
                            </div>
                        </div>
                    )
                })}
            </div>
        </Card>
    )
}

