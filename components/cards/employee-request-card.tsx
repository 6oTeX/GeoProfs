'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { FormField, FormItem } from '../ui/form';

interface EmployeeRequestCardProps {
    element: any;
    currentDate: Date;
    isManager: Boolean;
}

export default function EmployeeRequestCard({ element, currentDate, isManager }: EmployeeRequestCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showResponse = () => {
        setIsModalOpen(true); // Open the modal to show detailed information
    };

    const closeModal = () => {
        setIsModalOpen(false); // Close the modal
    };

    return (
        <>
            <Card
                // Show response
                onClick={showResponse}
                // Change hover based on if request has passed.
                className={`flex items-center justify-between w-full max-w-md p-3 border rounded-lg gap-3 cursor-pointer ${
                    currentDate < element.endDate
                        ? 'hover:bg-accent hover:shadow-md transition'
                        : 'bg-inactive'
                }`}
            >
                <div className="flex items-center gap-3">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{element.reason || "Niet beschikbaar."}</span>
                        <span className="text-xs text-muted-foreground">{element.userData.full_name || "Niet beschikbaar."}</span>
                        <span className="text-xs text-muted-foreground">{element.userData.email || "Niet beschikbaar."}</span>
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
                        {element.state || "Niet beschikbaar"}
                    </div>
                </div>
            </Card>

            {/* Modal with leave request info */}
            {isModalOpen && (
                <Modal onClose={closeModal} title="Verlofaanvraag">
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4">
                        <div className="bg-background border rounded-lg w-full max-w-lg p-6">
                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-lg font-semibold">Reden:</h3>
                                    <p>{element.reason || "Niet beschikbaar."}</p>
                                </div>
                                <div>   
                                    <h3 className="text-lg font-semibold">Opmerking:</h3>
                                    <p>{element.explanation || "Niet beschikbaar."}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Gebruiker Informatie:</h3>
                                    <p>Naam: {element.userData.full_name || "Niet beschikbaar."}</p>
                                    <p>Email: {element.userData.email || "Niet beschikbaar."}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Datum:</h3>
                                    <p>Vanaf: {new Intl.DateTimeFormat('en-GB').format(element.startDate)}</p>
                                    <p>Tot: {new Intl.DateTimeFormat('en-GB').format(element.endDate)}</p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">Status:</h3>
                                    <p>{element.state || "Niet beschikbaar."}</p>
                                </div>
                                <div>
                                    <p>Verlof aangevraagd op: {new Intl.DateTimeFormat('en-GB').format(element.createdAtDate)}</p>
                                </div>
                                {/* For manager display a review form. */}
                                {isManager 
                                    ?   <div>
                                            <h3 className="text-lg font-semibold">Beoordeel:</h3>
                                            {/* Accept / Decline */}
                                            {/* Enter response text. */}
                                        </div>
                                        // For employee display the response.
                                    :   <div>
                                            <h3 className="text-lg font-semibold">Reactie:</h3>
                                            <p>Beoordeeld door: {element.state === 'submitted' && !element.reviewed_by 
                                                    ? "Nog geen beoordeling" 
                                                    : element.reviewByUser?.full_name || "Niet beschikbaar."}
                                            </p>
                                            <p>Reactie: {element.state === 'submitted' && !element.response 
                                                    ? "Nog geen reactie" 
                                                    : element.response || "Niet beschikbaar."}
                                            </p>
                                        </div>
                                }
                            </div>
                            <button
                                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

        </>
    );
}
