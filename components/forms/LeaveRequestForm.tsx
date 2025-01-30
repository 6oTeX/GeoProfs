"use client";

import { CalendarIcon } from "lucide-react";
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
import { Card } from "../ui/card";
import LeaveRequestController from "@/controllers/leave-request-controller";

interface LeaveRequestFormProps {
  reason: string;
  customReason?: string;
  dateStart: Date | null;
  dateEnd: Date | null;
  comments: string;
}

async function serverWrapper(payload: LeaveRequestFormProps) {
  if (payload.dateStart && payload.dateEnd) {
    await LeaveRequestController.createRequest(
      payload.reason,
      payload.comments,
      payload.dateStart,
      payload.dateEnd,
    );
  }
}

export default function LeaveRequestForm() {
  //List with reasons for leave.
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
  const [isLoading, setIsLoading] = useState(false);

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
  const onSubmit = async (data: LeaveRequestFormProps) => {
    setIsLoading(true);
    // Fetching the daterange and turning it into two separate values.
    const payload = {
      ...data,
      dateStart: dateRange?.from || null,
      dateEnd: dateRange?.to || null,
    };

    fetch("/api/leave-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((responseData) => {})
      .catch((error) => {
        console.error("Error:", error);
      });

    form.reset();
    // Resetting the daterange after submitting.
    setDateRange(undefined);
    setIsCustomReason(false);
    setIsLoading(false);
  };

  //Form component.
  return (
    <Card className="w-full p-10 max-w-md p-6rounded-lg shadow-md">
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
                    <Input
                      placeholder="Typ hier uw reden"
                      {...field}
                      autoComplete="off"
                    />
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
                <FormItem className="flex flex-col bg-background">
                  <FormLabel>Datum</FormLabel>
                  {/* Opening the popup */}
                  <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !dateRange && "text-muted-foreground",
                          )}
                        >
                          {/* Displaying the selected date(s) based on if 1 or 2 dates have been selected. */}
                          {dateRange?.from ? (
                            dateRange.to && dateRange.to !== dateRange.from ? (
                              <>
                                <span>
                                  {format(dateRange.from, "d MMMM yyyy", {
                                    locale: nl,
                                  })}
                                </span>
                                {" - "}
                                <span>
                                  {format(dateRange.to, "d MMMM yyyy", {
                                    locale: nl,
                                  })}
                                </span>
                              </>
                            ) : (
                              <>
                                <span>
                                  {format(dateRange.from, "d MMMM yyyy", {
                                    locale: nl,
                                  })}
                                </span>
                                {" - "}
                                <span>
                                  {format(dateRange.from, "d MMMM yyyy", {
                                    locale: nl,
                                  })}
                                </span>
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
                        // Changing the data based on if 1 or 2 dates have been selected.
                        mode="range"
                        locale={nl}
                        selected={dateRange}
                        onSelect={(selectedDateRange) => {
                          if (selectedDateRange?.from) {
                            const newDateRange = {
                              from: selectedDateRange.from,
                              to:
                                selectedDateRange.to || selectedDateRange.from,
                            };
                            setDateRange(newDateRange);
                            form.setValue("dateStart", newDateRange.from, {
                              shouldValidate: true,
                            });
                            form.setValue("dateEnd", newDateRange.to, {
                              shouldValidate: true,
                            });
                          } else {
                            setDateRange(undefined);
                            form.setValue("dateStart", null, {
                              shouldValidate: true,
                            });
                            form.setValue("dateEnd", null, {
                              shouldValidate: true,
                            });
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
                    placeholder="Voer hier uw opmerkingen in..."
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
            <Button
              type="button"
              variant="destructive"
              className="text-secondary font-medium bg-red-500 hover:bg-red-600"
            >
              Sluiten
            </Button>
            {/* Submit form button. */}
            <Button
              type="submit"
              className="text-secondary font-medium bg-emerald-500 hover:bg-emerald-600"
              disabled={isLoading}
            >
              Verlof aanvragen
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}
