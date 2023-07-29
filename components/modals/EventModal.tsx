"use client";

import { Modal } from "@/components/ui/Modal";
import { useEventModal } from "@/hooks/useEventModal";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Link from "next/link";

const today = new Date();

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const eighteenMonthsFromNow = new Date(today);
eighteenMonthsFromNow.setMonth(today.getMonth() + 18);

export const EventModal = () => {
  const formSchema = z.object({
    address: z.string().min(1),
    date: z.date({
      required_error: "A date of birth is required.",
    }),
    isPickUp: z
      .string({
        required_error: "Please select a delivery/pick up option",
      })
      .email(),
  });

  const eventModal = useEventModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      date: tomorrow,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Modal
      trigger="Set your event"
      title="Set event details"
      description="Please note that the event's address will only be visible if it falls within our designated serving area. If it does not, we kindly ask you to opt for local pick up instead."
    >
      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="isPickUp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery/Pick up</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="pickup">Pick up</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Would you like a delivery to the local Ballarat area or if
                      you prefer to pick up your order in Ballarat.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        autoComplete="off"
                        placeholder="Event Address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <div className="pt-2">
                    <FormItem className="flex flex-col">
                      <FormLabel>Date of event</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-[240px] pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < tomorrow || date > eighteenMonthsFromNow
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>
                        The date of your event will display the available stock
                        on that day.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  </div>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button type="submit" className="bg-black hover:bg-gray-900">
                  Set Event Details
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Modal>
  );
};
