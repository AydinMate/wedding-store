import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          <img
            src="/path/to/your/image.jpg" // Replace with your image path
            alt="Diamond Wedding Hire"
            className="w-full md:w-1/3 object-cover rounded-md mb-6 md:mb-0 md:mr-6"
          />
          <div className="text-gray-700">
            <p className="mb-4">
              Greetings! Welcome to Diamond Wedding Hire, the brainchild of Laura and Andrew.
            </p>
            <p className="mb-4">
              Our journey began in 2022, inspired by our shared passion for curating unforgettable events. As a happily married duo, we understand the significance of every little detail that goes into making an event truly special.
            </p>
            <p className="mb-4">
              Our mission? To provide you with top-notch event essentials without breaking the bank. We believe that elegance and affordability can go hand in hand. With Diamond Wedding Hire, you're not just getting products; you're gaining partners dedicated to easing the event planning process for you.
            </p>
            <p className="mb-4">
              As we continue to grow, our commitment remains unwavering: to expand our collection, ensuring you have access to the latest and most sought-after event decor and essentials. Our vision is to be your one-stop destination for all things event-related, making your celebrations as seamless and memorable as possible.
            </p>
            <p className="mb-4">
              Thank you for considering us to be a part of your special moments. We're excited to be on this journey with you, whether it's for a magical wedding, a memorable engagement, or any other cherished occasion.
            </p>
            <p className="font-semibold">
              Warm regards, <br />
              Laura, Andrew, and the Diamond Wedding Hire Team
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
