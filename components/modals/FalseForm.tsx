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

import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { cn } from "@/lib/utils";
import { useEvent } from "@/hooks/useEvent";
import { toast } from "react-hot-toast";


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
  const { address, setAddress, isDelivery, setIsDelivery, date, setDate } =
    useEvent();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      date: date
    },
  });

 

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setDate(values.date)
      setAddress("")
      toast.success("Event successfully updated.")
     } catch (error) {
      toast.error("Please contact support.")
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
                  The date of your event will display the available stock on
                  that day.
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
  );
};
