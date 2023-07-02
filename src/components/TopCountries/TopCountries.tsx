import React, { useState, useEffect } from "react";
import { Dropdown } from "../Dropdown/Dropdown";
import { years } from "../../data/years";
import { useRequest } from "../../hooks/useRequest";
import { countriesCode } from "../../data/countriesCode";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "../../utility/formatNumber";
import { Info } from "../Info/Info";

interface TopCountry {
  country: string;
  percentage: string;
  amountFormatted: string;
  amount: number;
}

export const TopCountries = () => {
  const [year, setYear] = useState<string>("2020");
  const [topCountries, setTopCountries] = useState<TopCountry[]>();
  const { data, isLoading } = useRequest(`/year/${year}`);

  useEffect(() => {
    if (!isLoading && data?.Data) {
      // Sort countries descending by number of internet users
      const countries = Object.keys(data?.Data)
        ?.map((key) => ({
          country: key,
          ...data?.Data[key],
        }))
        .sort((a, b) => a?.internet_users_number - b?.internet_users_number)
        .reverse()
        .slice(0, 10)
        .map(
          (item) =>
            ({
              country: `${item.country}`,
              percentage: `${item?.internet_users_percentatge.toFixed(2)}%`,
              amountFormatted: `${item?.internet_users_number.toLocaleString(
                "en-US"
              )}`,
              amount: item?.internet_users_number,
            } as TopCountry)
        );

      setTopCountries(countries);
    }
  }, [data, isLoading]);

  return (
    <div
      id="top-countries"
      data-component="TopCountries"
      className="lg:px-10 px-5 lg:py-20 py-10"
    >
      <div>
        <span className="text-blue-400 font-bold text-lg">Internet Giants</span>
        <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 mb-4 lg:w-1/2">
          Countries with the largest internet user bases
        </h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div>
          <div className="lg:w-1/2 mb-5">
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
          <div className="flex lg:grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:overflow-hidden overflow-x-scroll">
            {topCountries &&
              topCountries.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col p-2 border-indigo-950 border-2 rounded-lg md:min-w-[200px] text-gray-300 mb-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold mr-2">{index + 1}</span>
                      <span className="mr-2">{item.country}</span>
                    </div>
                    <img
                      className="h-[32px]"
                      alt={item.country}
                      src={`https://flagsapi.com/${
                        countriesCode.find(
                          (country) => country.name === item.country
                        )?.code
                      }/flat/32.png`}
                    ></img>
                  </div>
                  <span className="text-xs text-gray-500">Breakdown</span>
                  <div>
                    <span>{item.percentage}</span>
                    <span className="ml-10">{item.amountFormatted}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topCountries}>
              <PolarGrid />
              <PolarAngleAxis dataKey="country" />
              <PolarRadiusAxis
                domain={[0, topCountries?.[0] ? topCountries[0]?.amount : 0]}
                tickFormatter={formatNumber}
              />
              <Radar
                name="Users"
                dataKey="amount"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
          <Info
            classNames="justify-center"
            content={`The chart displays how many Internet Users each country had
            in ${year}.`}
          />
        </div>
      </div>
    </div>
  );
};
