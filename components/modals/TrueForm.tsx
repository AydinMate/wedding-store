import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useEvent } from "@/hooks/useEvent";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import PlacesAutocomplete from "./PlacesAutocomplete";

import { useLoadScript } from "@react-google-maps/api";
import { DialogTrigger } from "../ui/dialog";
import { useEffect, useState } from "react";

const today = new Date();

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const eighteenMonthsFromNow = new Date(today);
eighteenMonthsFromNow.setMonth(today.getMonth() + 18);

const formSchema = z.object({
  address: z.any(),
  date: z.date({
    required_error: "An event date is required",
  }),
});

export const TrueForm = () => {
  const router = useRouter();

  const { address, setAddress, isDelivery, setIsDelivery, date, setDate } =
    useEvent();

  const [selectedValue, setSelectedValue] = useState(address);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY!,
    libraries: ["places"],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: selectedValue,
      date: date,
    },
  });

  useEffect(() => {
    sessionStorage.removeItem('upa')
  }, [])

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log("onSubmit selectedValue: ", selectedValue);
      if (values.date !== date) {
        setDate(values.date);
      }

      setAddress(selectedValue);
      router.push("/");
      toast.success("Event successfully updated.");
    } catch (error) {
      toast.error("Please contact support.");
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Event/Dropoff Address</FormLabel>
              <FormControl>
                <PlacesAutocomplete
                  selectedValue={selectedValue}
                  setSelectedValue={setSelectedValue}
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
                          "w-[100%] pl-3 text-left font-normal",
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
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          const utcDate = new Date(
                            Date.UTC(
                              selectedDate.getFullYear(),
                              selectedDate.getMonth(),
                              selectedDate.getDate()
                            )
                          );
                          field.onChange(utcDate);
                        }
                      }}
                      disabled={(date) =>
                        date < tomorrow || date > eighteenMonthsFromNow
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  The date of your event will display the available stock on
                  that day.
                </FormDescription>
                <FormMessage />
              </FormItem>
            </div>
          )}
        />
        <div className="pt-6 space-x-2 flex items-center justify-center w-full">
          <DialogTrigger className="w-[90%]">
            <Button disabled={selectedValue.length === 0} type="submit" className="bg-black hover:bg-gray-900 w-[90%]">
              Set Event Details
            </Button>
          </DialogTrigger>
        </div>
      </form>
    </Form>
  );
};
