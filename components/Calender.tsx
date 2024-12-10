import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import DayOverview from './DayOverview';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from './ui/dialog';

interface CalenderDay {
  date: Date;
  isCurrentMonth: boolean;
  verlof: number;
  ziek: number;
  verlofNames: string[];
  ziekNames: string[];
}

interface CalenderProps {
  events?: {
    [key: string]: {
      verlof: number;
      ziek: number;
      verlofNames: string[];
      ziekNames: string[];
    };
  };
}

const Calender: React.FC<CalenderProps> = ({ events = {} }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const getDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCalenderDates = (date: Date): CalenderDay[] => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    const endDate = new Date(endOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const dates: CalenderDay[] = [];

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateKey = getDateKey(d);
      const event = events[dateKey] || {
        verlof: 0,
        ziek: 0,
        verlofNames: [],
        ziekNames: [],
      };

      dates.push({
        date: new Date(d),
        isCurrentMonth: d.getMonth() === date.getMonth(),
        verlof: event.verlof,
        ziek: event.ziek,
        verlofNames: event.verlofNames,
        ziekNames: event.ziekNames,
      });
    }

    return dates;
  };

  const dates = getCalenderDates(currentDate);

  const weeks = [];
  for (let i = 0; i < dates.length; i += 7) {
    weeks.push(dates.slice(i, i + 7));
  }

  const today = new Date();

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newMonth = parseInt(e.target.value, 10);
    setCurrentDate(new Date(currentDate.getFullYear(), newMonth, 1));
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newYear = parseInt(e.target.value, 10);
    setCurrentDate(new Date(newYear, currentDate.getMonth(), 1));
  };

  return (
    <div className="p-2 sm:p-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <div className="mb-2 sm:mb-0">
          <h2 className="text-xl sm:text-2xl font-bold">
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </h2>
        </div>
        <div className="flex flex-wrap items-center space-x-2">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="border rounded px-2 py-1 h-10 mb-2 sm:mb-0"
          >
            {months.map((month, index) => (
              <option key={index} value={index}>
                {month}
              </option>
            ))}
          </select>
          <input
            type="number"
            value={currentDate.getFullYear()}
            onChange={handleYearChange}
            className="border rounded px-2 py-1 w-20 h-10 mb-2 sm:mb-0"
          />
          <Button onClick={handlePrevMonth} variant="default" className="mb-2 sm:mb-0">
            Previous
          </Button>
          <Button onClick={handleNextMonth} variant="default" className="mb-2 sm:mb-0">
            Next
          </Button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center font-bold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
          <div key={dayName} className="py-2 text-xs sm:text-base">
            {dayName}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      {weeks.map((week, index) => (
        <div key={index} className="grid grid-cols-7 text-left">
          {week.map((day, idx) => {
            const isToday = day.date.toDateString() === today.toDateString();

            let cellClasses =
              'border border-gray-200 h-16 sm:h-24 p-1 flex flex-col items-start cursor-pointer';

            if (isToday) {
              cellClasses += ' bg-yellow-50';
            } else if (!day.isCurrentMonth) {
              cellClasses += ' bg-gray-100';
            } else if (day.verlof >= 5 || day.ziek >= 5) {
              cellClasses += ' bg-red-200';
            }
            let size: number;
            if (window.innerWidth > 700) {
              size = 18;
            } else {
              size = 12;
            }
            let afwezig = null;
            if (day.verlof || day.ziek) {
              afwezig = (
                <div className="flex flex-col w-6/12 sm:w-auto text-right justify-end items-center h-full divide-y divide-gray-500">
                  {day.verlof ? (
                    <div className="flex flex-row justify-center sm:text-base text-xs items-center text-red-600 px-1">
                     <User size={size} />
                      {day.verlof}
                    </div>
                  ) : null}
                  {day.ziek ? (
                    <div className="flex flex-row justify-center sm:text-base text-xs items-center text-yellow-500 px-1">
                      <User size={size} />
                      {day.ziek}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Dialog key={idx}>
                <DialogTrigger asChild>
               
              <div
                key={idx}
                className={cellClasses}
              >
                <span className="font-bold text-xs sm:text-base flex w-full sm:w-10/12">
                  {day.date.getDate()}
                </span>
                {afwezig}
              </div>
          
                </DialogTrigger>
                <DialogContent>
                  <DayOverview
                    date={day.date}
                    verlofNames={day.verlofNames}
                    ziekNames={day.ziekNames}
                  />
                  <DialogClose asChild>
                    <Button variant="destructive" className="mt-4">
                      Sluiten
                    </Button>
                  </DialogClose>
                </DialogContent>
              </Dialog>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calender;
