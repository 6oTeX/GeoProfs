import LeaveRequestForm from "@/components/forms/leave-request-form";

export default async function Dashboard() {
    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <main className="grid flex-1 items-start gap-4 p-4 pt-28 sm:px-6 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
                <LeaveRequestForm/>
            </main>
        </div>
    );
}
