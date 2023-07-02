import React, { useState, useEffect } from "react";
import { useRequest } from "../../hooks/useRequest";
import { Dropdown } from "../Dropdown/Dropdown";

import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Cell,
  Tooltip,
  Label,
} from "recharts";
import { CustomTooltip } from "../CustomTooltip/CustomTooltip";
import { years } from "../../data/years";
import { Info } from "../Info/Info";

const COLORS = ["#2451B7", "#172554"];

interface CountryYearData {
  internet_users_percentatge: number;
  internet_users_number: number;
}

export const CountryYear = () => {
  const [country, setCountry] = useState<string>("Ecuador");
  const [chartSize, setChartSize] = useState<{
    width: number;
    height: number;
  }>();
  const [year, setYear] = useState<string>("2020");
  const [error, setError] = useState<boolean>(false);
  const { data: countries } = useRequest("/countries");
  const [pieData, setPieData] = useState<
    {
      name: string;
      value: number;
    }[]
  >();
  const { data } = useRequest(`/country/${country}/year/${year}`);

  useEffect(() => {
    if (data) {
      const percentage = (Object.values(data?.Data)?.[0] as CountryYearData)
        ?.internet_users_percentatge;

      if (!percentage) {
        setError(true);
        setPieData([
          {
            name: "Internet Users",
            value: 0,
          },
          {
            name: "Users with no access to internet",
            value: 100,
          },
        ]);
        return;
      }
      setError(false);
      setPieData([
        {
          name: "Internet Users",
          value: Number(percentage.toFixed(2)),
        },
        {
          name: "Users with no access to internet",
          value: Number((100 - percentage).toFixed(2)),
        },
      ]);
    }
  }, [data]);

  const resizeListener = (width: number) => {
    if (width > 1055) {
      setChartSize({ width: width / 1.5, height: width / 1.5 });
    } else {
      setChartSize({ width, height: width });
    }
  };
  return (
    <div
      id="country-years"
      className="lg:grid lg:grid-cols-12 lg:px-10 px-5 py-10 pt-20 lg:pb-20 items-center"
    >
      <div className="col-span-6">
        <span className="text-blue-400 font-bold text-lg">
          Internet adoption by country
        </span>
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 mb-4 lg:w-[70%]">
          Examining total users and yearly access
        </h2>
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Country
            </label>
            <Dropdown
              id="country"
              label={country}
              data={countries?.Countries}
              clickHandler={(value: string) => setCountry(value)}
            />
          </div>
          <div>
            <label
              htmlFor="country"
              className="block text-sm font-medium leading-6 text-gray-300"
            >
              Year
            </label>
            <Dropdown
              id="year"
              label={year}
              data={years}
              clickHandler={(value: string) => setYear(value)}
            />
          </div>
        </div>
      </div>
      <div className="col-span-6">
        <div
          style={
            chartSize?.height
              ? {
                  height: `${chartSize?.height / 2 + 45}px`,
                  width: `${chartSize?.width}px`,
                }
              : {}
          }
          className="overflow-hidden lg:mx-0 mx-auto"
        >
          {pieData && (
            <ResponsiveContainer
              onResize={resizeListener}
              height={chartSize?.height}
              width="100%"
            >
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  startAngle={180}
                  endAngle={0}
                  cx="50%"
                  cy="50%"
                  innerRadius={"65%"}
                  paddingAngle={5}
                  fill="#82ca9d"
                >
                  <Label
                    value="0%"
                    position="insideStart"
                    className="font-bold"
                  />
                  <Label
                    value="100%"
                    position="insideEnd"
                    className="font-bold"
                    fill="#2451B7"
                  />
                  <Label
                    value={`${pieData[0].value}%`}
                    position="centerBottom"
                    className="text-6xl font-bold"
                    fill={error ? "#172554" : "#2451B7"}
                  />
                  <Label
                    value={
                      error
                        ? `Year ${year} not registered`
                        : `Internet users in ${country} on ${year}`
                    }
                    position="centerTop"
                    className="text-sm font-bold"
                    fill={error ? "#172554" : "#2451B7"}
                    dy={10}
                  />
                  {pieData?.map((item, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      stroke={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    return (
                      <CustomTooltip
                        active={active}
                        amount={`${payload?.[0]?.value}%`}
                        label={`${payload?.[0]?.name}`}
                      />
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        <Info
          classNames="justify-center"
          content="The chart displays how many Internet Users each specific Country
            could access the Internet per Year."
        />
      </div>
    </div>
  );
};
