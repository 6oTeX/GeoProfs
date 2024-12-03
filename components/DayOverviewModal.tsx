// components/DayOverviewModal.tsx
import React from 'react';
import { Button } from './ui/button'; // Adjust the import path as necessary

interface DayOverviewModalProps {
  date: Date;
  verlofNames: string[];
  ziekNames: string[];
  onClose: () => void;
}

const DayOverviewModal: React.FC<DayOverviewModalProps> = ({
  date,
  verlofNames,
  ziekNames,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 max-w-md mx-auto rounded shadow-lg p-4 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Dag overzicht</h2>
          <span className="text-gray-600">
            {date.toLocaleDateString('default', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
        </div>
        <table className="w-full mb-4">
          <thead>
            <tr className=''>
              <th className="text-left text-red-600">Verlof</th>
              <th className="text-left text-yellow-500">Ziek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {verlofNames.length > 0 ? (
                  <ul>
                    {verlofNames.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Geen</p>
                )}
              </td>
              <td>
                {ziekNames.length > 0 ? (
                  <ul>
                    {ziekNames.map((name, index) => (
                      <li key={index}>{name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>Geen</p>
                )}
              </td>
            </tr>
          </tbody>
        </table>
        <Button onClick={onClose} variant={"destructive"} className=' float-end'>Sluiten</Button>
      </div>
    </div>
  );
};

export default DayOverviewModal;
