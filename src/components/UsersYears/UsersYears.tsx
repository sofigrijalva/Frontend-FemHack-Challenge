import React, { useState, useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { Card } from "../Card/Card";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { Info } from "../Info/Info";

export const UsersYears = () => {
  const [chartData, setChartData] = useState<{ name: number; amt: number }[]>(
    []
  );
  const [year, setYear] = useState<number>(1988);
  const { data, error } = useRequest(`/internet-users/${year}`);

  useEffect(() => {
    const interval = setInterval(() => {
      setYear((prevYearValue) => {
        const newValue = prevYearValue + 1;
        if (newValue === 2020 || newValue > 2020) {
          clearInterval(interval);
        }

        return newValue;
      });
    }, 1000);

    // Cleanup function to clear the interval
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (data) {
      setChartData((prevValue) => {
        return [...prevValue, { name: year, amt: data?.Data?.Total }];
      });
    }
  }, [data]);

  if (error) {
    <p>Seems there was an error retrieving the data, try again later</p>;
  }
  return (
    <div className="min-h-screen flex flex-1 flex-col">
      <h1 className="text-2xl font-bold tracking-tight text-gray-50 sm:text-5xl lg:w-1/2 lg:p-10 p-5">
        Tracking the Growth of Internet Users Worldwide
      </h1>
      <div className="grid md:grid-cols-3 lg:p-10 p-5 pt-0 gap-3 ">
        <Card
          heading="Users"
          data={chartData[chartData.length - 1]?.amt?.toLocaleString("en-US")}
          description="Number of users consuming digital content online"
        />
        <Card
          heading="Year"
          data={year.toString()}
          description="Year of how many users could access the Internet"
        />
        <Info
          classNames="lg:flex hidden"
          content="The chart displays how many Internet Users could access the Internet
            per Year."
        />
      </div>

      <ResponsiveContainer width="100%" height={400} className="mt-auto ">
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="amt"
            stroke="#2451B7"
            strokeWidth={2}
            fill="url(#colorUv)"
          />
          <XAxis dataKey="name" axisLine={false} />
          <Tooltip
            content={({ active, payload, label }) => {
              return (
                <CustomTooltip
                  active={active}
                  amount={payload?.[0]?.payload?.amt?.toLocaleString("en-US")}
                  label={label}
                />
              );
            }}
          />
          <CartesianGrid opacity={0.1} vertical={false} />
        </AreaChart>
      </ResponsiveContainer>
      <Info
        classNames="lg:hidden px-5"
        content="The chart displays how many Internet Users could access the Internet
            per Year."
      />
    </div>
  );
};
