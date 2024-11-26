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
  date: DateRange | undefined;
  availableDays: string;
  comments: string;
}

export default function LeaveRequestForm() {
  const leaveReasons = [
    "Ziek",
    "Vakantie",
    "Huwelijk",
    "Overlijden",
    "Doktersbezoek",
    "Anders",
  ];

  const [isCustomReason, setIsCustomReason] = useState(false);

  const form = useForm({
    defaultValues: {
      reason: "",
      customReason: "",
      date: undefined,
      comments: "",
    } as LeaveRequestFormProps,
  });

  useEffect(() => {
    if (!isCustomReason) {
      form.setValue("customReason", "");
    }
  }, [isCustomReason, form]);

  const onSubmit = (data: LeaveRequestFormProps) => {
    console.log(data);
    fetch("/api/leave-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    form.reset();
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Verlof aanvragen</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                    setIsCustomReason(value === "Anders");
                  }}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecteer een reden" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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

          {isCustomReason && (
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

<FormField
            control={form.control}
            name="date"
            rules={{ required: "Datum is verplicht!" }}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Datum</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value?.from ? (
                          field.value.to && field.value.to !== field.value.from ? (
                            <span>
                              {format(field.value.from, "d MMMM yyyy", { locale: nl })}
                              &nbsp;-&nbsp;
                              {format(field.value.to, "d MMMM yyyy", { locale: nl })}
                            </span>
                          ) : (
                            <span>{format(field.value.from, "d MMMM yyyy", { locale: nl })}</span>
                          )
                        ) : (
                          <span>Selecteer een datum</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={field.value}
                      onSelect={(selectedDate) => {
                        if (selectedDate?.from && !selectedDate.to) {
                          field.onChange({ from: selectedDate.from, to: selectedDate.from });
                        } else {
                          field.onChange(selectedDate);
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
            )}
          />

          <FormField
            control={form.control}
            name="comments"
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
            <Button type="button" variant="destructive">
              Sluiten
            </Button>
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

