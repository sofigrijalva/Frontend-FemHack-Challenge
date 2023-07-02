import React from "react";

interface CardProps {
  heading: string;
  data: string;
  description?: string;
}

export const Card = ({ heading, data, description }: CardProps) => {
  return (
    <div data-component="Card">
      <h4 className="tracking-wider text-gray-300">{heading}</h4>
      <h3 className="text-white text-xl">{data}</h3>
      <p className="text-gray-500 text-xs">{description}</p>
    </div>
  );
};
