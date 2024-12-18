'use client'

import { Card } from '@/components/ui/card';

interface EmployeeRequestCardProps {
    element: any;
    currentDate: Date;
}

export default function EmployeeRequestCard({ element, currentDate }: EmployeeRequestCardProps) {
    const showResponse = () => {
        console.log(element.response);
    };

    return (
        <Card
            // Show response 
            onClick={showResponse}
            // Change hover based on if request has passed.
            className={`flex items-center justify-between w-full max-w-md p-3 border rounded-lg ${
                currentDate < element.endDate
                ? 'hover:bg-accent hover:shadow-md transition cursor-pointer'
                : 'bg-inactive'
            }`}
        >
            <div className="flex items-center gap-3">
                <div className="flex flex-col">
                    <span className="text-sm font-medium">{element.reason}</span>
                    <span className="text-xs text-muted-foreground">{element.user_name}</span>
                    <span className="text-xs text-muted-foreground">{element.user_mail}</span>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="flex">
                    <span className="text-sm font-medium flex justify-start">
                        {new Intl.DateTimeFormat('en-GB').format(element.startDate)} - {new Intl.DateTimeFormat('en-GB').format(element.endDate)}
                    </span>
                </div>
                <div
                // Display based on request state.
                    className={`px-2.5 py-0.1 text-xs font-medium rounded-lg flex items-center ${
                        element.state === 'accepted'
                            ? 'text-green-500'
                            : element.state === 'submitted'
                            ? 'text-orange-500'
                            : element.state === 'declined'
                            ? 'text-red-500'
                            : 'text-gray-600'
                    }`}
                >
                    {element.state}
                </div>
            </div>
        </Card>
    );
}

