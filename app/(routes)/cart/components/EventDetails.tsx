import { Label } from "@/components/ui/label";
import { useEvent } from "@/hooks/useEvent";

const EventDetails = () => {
  const { isDelivery, address, date } = useEvent();

  const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: '2-digit', month: '2-digit', day: '2-digit' };
  const formattedDate = new Date(date).toLocaleDateString('en-AU', options);

  return (
    <div className="p-4 bg-white shadow rounded-lg flex flex-col">

      {isDelivery && 
        <Label className="text-sm text-gray-600 mb-2 w-full">
          Address:<span className="ml-2 font-medium text-black">{address}</span>
        </Label>}
      
      <Label className="text-sm text-gray-600 mb-2 w-full">
        Order Method: 
        <span className="ml-2 font-medium text-black">{isDelivery ? "Delivery" : "Ballarat Pickup"}</span>
      </Label>
      
      <Label className="text-sm text-gray-600 w-full">
        Hire date: <span className="ml-2 font-medium text-black">{formattedDate}</span>
      </Label>

    </div>
  );
};

export default EventDetails;
