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
} from "@/components/ui/form";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useEvent } from "@/hooks/useEvent";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const today = new Date();

const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const eighteenMonthsFromNow = new Date(today);
eighteenMonthsFromNow.setMonth(today.getMonth() + 18);

const formSchema = z.object({
  address: z.string().optional() || z.null,
  date: z.date({
    required_error: "An event date is required",
  }),
});

export const FalseForm = () => {
  const router = useRouter();

  const { address, setAddress, isDelivery, setIsDelivery, date, setDate } =
    useEvent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      date: date,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (values.date !== date) {
        setDate(values.date);
      }
      setAddress("");
      router.push("/");
      toast.success("Event successfully updated.");
    } catch (error) {
      toast.error("Please contact support.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
          {/* <DialogTrigger className="w-[90%]"> */}
            <Button type="submit" className="bg-black hover:bg-gray-900 w-[90%]">
              Set Event Details
            </Button>
          {/* </DialogTrigger> */}
        </div>
      </form>
    </Form>
  );
};
