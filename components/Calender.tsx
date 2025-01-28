"use client";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { useState } from "react";
import DayOverview from "./DayOverview";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "./ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { DialogTitle } from "@radix-ui/react-dialog";
interface CalenderDay {
  date: Date;
  isCurrentMonth: boolean;
  furlough: number;
  sick: number;
  furloughNames: string[];
  sickNames: string[];
}

interface CalenderProps {
  events?: {
    [key: string]: {
      furlough: number;
      sick: number;
      furloughNames: string[];
      sickNames: string[];
      team: string;
    }[];
  };
}

const Calender: React.FC<CalenderProps> = ({ events = {} }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedTeam, setSelectedTeam] = useState<string>("All");

  const months = [
    "januari",
    "februari",
    "maart",
    "april",
    "mei",
    "juni",
    "juli",
    "augustus",
    "september",
    "oktober",
    "november",
    "december",
  ];

  const getDateKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getCalenderDates = (date: Date): CalenderDay[] => {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const startDate = new Date(startOfMonth);
    const dayOfWeek = startDate.getDay();
    const offset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    startDate.setDate(startDate.getDate() - offset);

    const endDate = new Date(endOfMonth);
    const endDayOfWeek = endDate.getDay();
    const endOffset = endDayOfWeek === 0 ? 0 : 7 - endDayOfWeek;
    endDate.setDate(endDate.getDate() + endOffset);

    const dates: CalenderDay[] = [];

    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateKey = getDateKey(d);
      const dayEvents = events[dateKey] || [];
      const relevantEvents =
        selectedTeam === "All"
          ? dayEvents
          : dayEvents.filter((e) => e.team === selectedTeam);

      const filteredFurloughNames = relevantEvents.flatMap(
        (e) => e.furloughNames,
      );
      const filteredSickNames = relevantEvents.flatMap((e) => e.sickNames);

      dates.push({
        date: new Date(d),
        isCurrentMonth: d.getMonth() === date.getMonth(),
        furlough: filteredFurloughNames.length,
        sick: filteredSickNames.length,
        furloughNames: filteredFurloughNames,
        sickNames: filteredSickNames,
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
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
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

  const teams = Array.from(
    new Set(
      Object.values(events).flatMap((eventArray) =>
        eventArray.map((event) => event.team),
      ),
    ),
  ).filter(Boolean);

  return (
    <div className="p-2 sm:p-4">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <div className="mb-2 sm:mb-0">
          <h2 className="text-xl sm:text-2xl font-bold">
            {format(currentDate, "MMMM yyyy", { locale: nl })}
          </h2>
        </div>
        <div className="flex flex-wrap items-center space-x-2">
          {/* Team Filter */}
          <Select value={selectedTeam} onValueChange={setSelectedTeam}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Filter op team" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">Alle teams</SelectItem>
              {teams.map((team, index) => (
                <SelectItem key={index} value={team}>
                  {team}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={handlePrevMonth}>Vorige</Button>
          <Button onClick={handleNextMonth}>Volgende</Button>
        </div>
      </div>

      {/* Days of the Week */}
      <div className="grid grid-cols-7 text-center font-bold">
        {["Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"].map((dayName) => (
          <div key={dayName} className="py-2">
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
              "border border-gray-200 h-16 sm:h-24 p-1 flex flex-col items-start cursor-pointer";

            if (isToday) {
              cellClasses += " bg-accent";
            } else if (!day.isCurrentMonth) {
              cellClasses += " bg-background-foreground ";
            } else if (day.furlough >= 5 || day.sick >= 5) {
              cellClasses += " bg-error";
            }

            let size = 12; // default size
            if (window.matchMedia("(min-width: 700px)").matches) {
              size = 18;
            }

            let absent = null;
            if (day.furlough || day.sick) {
              absent = (
                <div className="flex flex-col w-6/12 sm:w-auto text-right justify-end items-center h-full divide-y divide-gray-500">
                  {day.furlough ? (
                    <div className="flex flex-row justify-center sm:text-base text-xs items-center text-red-600 px-1">
                      <User size={size} />
                      {day.furlough}
                    </div>
                  ) : null}
                  {day.sick ? (
                    <div className="flex flex-row justify-center sm:text-base text-xs items-center text-yellow-500 px-1">
                      <User size={size} />
                      {day.sick}
                    </div>
                  ) : null}
                </div>
              );
            }

            return (
              <Dialog key={idx}>
                <DialogTrigger asChild>
                  <div key={idx} className={cellClasses}>
                    <span className="font-bold text-xs sm:text-base flex w-full sm:w-10/12">
                      {day.date.getDate()}
                    </span>
                    {absent}
                  </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>
                    {format(day.date, "EEEE", { locale: nl })}
                  </DialogTitle>
                  <DayOverview
                    date={day.date}
                    furloughNames={day.furloughNames}
                    sickNames={day.sickNames}
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
