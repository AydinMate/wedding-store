import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

const currentDate = new Date();
const currentYear = currentDate.getFullYear();

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="mx-auto py-10 flex flex-col items-center">
        <div className="flex space-x-4 mb-4">
          <div className="w-6 h-6 ">
            <Link
              target="_blank"
              href={"https://www.instagram.com/diamondweddinghireballarat/"}
            >
              <Instagram className="hover:text-gray-700" />
            </Link>
          </div>
          <div className="w-6 h-6 ">
            <Link
              target="_blank"
              href={"https://www.facebook.com/diamondweddinghireballarat"}
            >
              <Facebook className="hover:text-gray-700" />
            </Link>
          </div>
        </div>
        <div className="w-full flex flex-col md:flex-row space-y-4 justify-between items-center">
          <div className="flex space-x-4 lg:ml-[8rem] md:ml-[4rem]">
            <Link
              href="/privacy"
              className="text-xs text-neutral-500 hover:text-black"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-neutral-500 hover:text-black"
            >
              Terms & Conditions
            </Link>
          </div>
          <p className="text-xs text-black lg:mr-[8rem] md:mr-[4rem]">
            &copy; {currentYear} Diamond Wedding Hire, All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
