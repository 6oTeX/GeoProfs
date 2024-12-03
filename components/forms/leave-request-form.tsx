"use client";

import { CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { DateRange } from "react-day-picker";

interface LeaveRequestFormProps {
  reason: string;
  customReason?: string;
  dateStart: Date | null;
  dateEnd: Date | null;
  comments: string;
}

export default function LeaveRequestForm() {
  //List with resons for leave.
  const leaveReasons = [
    "Ziek",
    "Vakantie",
    "Huwelijk",
    "Overlijden",
    "Doktersbezoek",
    "Anders",
  ];

  //Checking if the custom reason is selected.
  const [isCustomReason, setIsCustomReason] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();

  const form = useForm({
    //Default values for the form fields.
      defaultValues: {
        reason: "",
        customReason: "",
        dateStart: null, 
        dateEnd: null,
        comments: "",
      } as LeaveRequestFormProps,
    });

  //Checking if there is a custom reason.
  useEffect(() => {
    if (!isCustomReason) {
      form.setValue("customReason", "");
    }
  }, [isCustomReason, form]);

  //Form submit.
  const onSubmit = (data: LeaveRequestFormProps) => {
    // Fetching the daterange and turning it into two seperate values.
    const payload = {
      ...data,
      dateStart: dateRange?.from || null,
      dateEnd: dateRange?.to || null,
    };

    console.log("Submitting Payload:", payload);

    fetch("/api/leave-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log("Success:", responseData);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    form.reset();
    // Resetting the daterange after sumbitting.
    setDateRange(undefined);
  };

  //Form component.
  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Verlof aanvragen</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Field for leave reason. */}
          <FormField
            control={form.control}
            name="reason"
            rules={{ required: "Reden is verplicht!" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Verlof reden</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    //isCustomReason to true if "Anders" is selected.
                    setIsCustomReason(value === "Anders");
                  }}
                  value={field.value}
                >
                  {/* Select field with all reasons for leave. */}
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een reden" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {/* Retrieve all options from the leave reasons list. */}
                    {leaveReasons.map((reason, index) => (
                      <SelectItem key={index} value={reason}>
                        {reason}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Checking if the custom reason has been selected. */}
          {isCustomReason && (
            // Form field for custom reason.
            <FormField
              control={form.control}
              name="customReason"
              rules={{ required: "Reden is verplicht!" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geef een reden</FormLabel>
                  <FormControl>
                    <Input placeholder="Typ hier uw reden" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* Form field for the date of the requested leave. */}
          <FormField
            control={form.control}
            name="dateStart"
            rules={{ required: "Datum is verplicht!" }}
            render={() => {
              const [isPopoverOpen, setPopoverOpen] = useState(false);

              return (
                <FormItem className="flex flex-col">
                  <FormLabel>Datum</FormLabel>
                  <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !dateRange && "text-muted-foreground"
                          )}
                        >
                          {dateRange?.from ? (
                            dateRange.to && dateRange.to !== dateRange.from ? (
                              <>
                                <span>{format(dateRange.from, "d MMMM yyyy", { locale: nl })}</span>
                                {" - "}
                                <span>{format(dateRange.to, "d MMMM yyyy", { locale: nl })}</span>
                              </>
                            ) : (
                              <>
                                <span>{format(dateRange.from, "d MMMM yyyy", { locale: nl })}</span>
                                {" - "}
                                <span>{format(dateRange.from, "d MMMM yyyy", { locale: nl })}</span>
                              </>
                            )
                          ) : (
                            // Default if no date has been selected yet.
                            <span>Selecteer een datum</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={dateRange}
                        onSelect={(selectedDateRange) => {
                          if (selectedDateRange?.from) {
                            const newDateRange = {
                              from: selectedDateRange.from,
                              to: selectedDateRange.to || selectedDateRange.from
                            };
                            setDateRange(newDateRange);
                            form.setValue('dateStart', newDateRange.from);
                            form.setValue('dateEnd', newDateRange.to);
                          } else {
                            setDateRange(undefined);
                            form.setValue('dateStart', null);
                            form.setValue('dateEnd', null);
                          }
                          if (selectedDateRange?.from && selectedDateRange.to) {
                            setPopoverOpen(false);
                          }
                        }}
                        disabled={(date) =>
                          date < new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {/* Form field for any comments (not required) */}
          <FormField
            control={form.control}
            name="comments"
            rules={{ required: "Opmerking is verplicht!" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Opmerkingen</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Type your message here"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between">
            {/* Close form button. */}
            <Button type="button" variant="destructive">
              Sluiten
            </Button>
            {/* Submit form button. */}
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Verlof aanvragen
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}