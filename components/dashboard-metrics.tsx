import { Bell, Calendar, Clock, Activity } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface MetricCardProps {
    title: string
    value: string
    change: string
    icon: React.ReactNode
}

function MetricCard({ title, value, change, icon }: MetricCardProps) {
    return (
        <Card className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                <div className="text-muted-foreground">{icon}</div>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{change}</p>
            </CardContent>
        </Card>
    )
}

export default function DashboardMetrics() {
    const metrics = [
        {
            title: "Datum",
            value: "$1,329",
            change: "+201 since last hour",
            icon: <Calendar className="h-4 w-4" />,
        },
        {
            title: "Verlof uren",
            value: "$1,329",
            change: "+201 since last hour",
            icon: <Clock className="h-4 w-4" />,
        },
        {
            title: "Status personeel",
            value: "$1,329",
            change: "+201 since last hour",
            icon: <Activity className="h-4 w-4" />,
        },
        {
            title: "Aantal aanvragen",
            value: "$1,329",
            change: "+201 since last hour",
            icon: <Bell className="h-4 w-4" />,
        },
    ]

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
                <MetricCard
                    key={metric.title}
                    title={metric.title}
                    value={metric.value}
                    change={metric.change}
                    icon={metric.icon}
                />
            ))}
        </div>
    )
}

