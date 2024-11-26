// components/Calendar.tsx
import React, { useState } from 'react';
import { Button } from '@/components/ui/button'; // Adjust the import path as necessary

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  verlof: number;
  ziek: number;
}

interface CalendarProps {
  events?: { [key: string]: { verlof: number; ziek: number } };
}

const Calendar: React.FC<CalendarProps> = ({ events = {} }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const getDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format: 'YYYY-MM-DD'
  };

  const getCalendarDates = (date: Date): CalendarDay[] => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    // Start from the Sunday of the first week
    const startDate = new Date(startOfMonth);
    startDate.setDate(startDate.getDate() - startDate.getDay());

    // End on the Saturday of the last week
    const endDate = new Date(endOfMonth);
    endDate.setDate(endDate.getDate() + (6 - endDate.getDay()));

    const dates: CalendarDay[] = [];

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateKey = getDateKey(d);
      const event = events[dateKey] || { verlof: 0, ziek: 0 };

      dates.push({
        date: new Date(d),
        isCurrentMonth: d.getMonth() === date.getMonth(),
        verlof: event.verlof,
        ziek: event.ziek,
      });
    }

    return dates;
  };

  const dates = getCalendarDates(currentDate);

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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold">
            {currentDate.toLocaleString('default', { month: 'long' })}{' '}
            {currentDate.getFullYear()}
          </h2>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={currentDate.getMonth()}
            onChange={handleMonthChange}
            className="border rounded px-2 py-1 h-10"
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
            className="border rounded px-2 py-1 w-20 h-10"
          />
          <Button onClick={handlePrevMonth} variant="default">
            Previous
          </Button>
          <Button onClick={handleNextMonth} variant="default">
            Next
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 text-center font-bold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName) => (
          <div key={dayName} className="py-2">
            {dayName}
          </div>
        ))}
      </div>
      {weeks.map((week, index) => (
        <div key={index} className="grid grid-cols-7 text-left">
          {week.map((day, idx) => {
            const isToday = day.date.toDateString() === today.toDateString();

            let cellClasses = 'border border-gray-200 h-20 p-1 flex flex-row';

            if (isToday) {
              cellClasses += ' bg-yellow-50';
            } else if (!day.isCurrentMonth) {
              cellClasses += ' bg-gray-100';
            }else if (day.verlof >= 5 || day.ziek >= 5) {
              cellClasses += ' bg-red-200';
            }

            let afwezig = null;
            if (day.verlof || day.ziek) {
              afwezig = (
                <div className="flex flex-col w-3/12 text-right justify-end items-center">
                  {day.verlof ? (
                    <div className="flex flex-row justify-center items-center text-yellow-200">
                      {/* Verlof Icon */}
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m4.5 13c-.475-9.333-14.525-9.333-15 0" />
                      </svg>{' '}
                      {day.verlof}
                    </div>
                  ) : null}
                  {day.verlof && day.ziek ? (
                    <span className="w-6 border border-black text-right"></span>
                  ) : null}
                  {day.ziek ? (
                    <div className="flex flex-row justify-center items-center text-red-600">
                      {/* Ziek Icon */}
                      <svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M15 7.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m4.5 13c-.475-9.333-14.525-9.333-15 0" />
                      </svg>{' '}
                      {day.ziek}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <div key={idx} className={cellClasses}>
                <span className="font-bold w-9/12">{day.date.getDate()}</span>
                {afwezig}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Calendar;
