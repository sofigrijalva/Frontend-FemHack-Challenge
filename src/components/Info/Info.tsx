import { InformationCircleIcon } from "@heroicons/react/24/outline";
import React from "react";

interface InfoProps {
  content: string;
  classNames?: string;
}
export const Info = ({ content, classNames }: InfoProps) => {
  return (
    <div className={`flex lg:w-[60%] items-start mx-auto ${classNames}`}>
      <div className="text-gray-300 pt-0.5 mr-2">
        <InformationCircleIcon className="lg:w-[25px] w-5" />
      </div>
      <p className="text-gray-500 text-sm">{content}</p>
    </div>
  );
};
