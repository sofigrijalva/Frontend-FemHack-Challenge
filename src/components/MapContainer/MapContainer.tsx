import React, { useState, useEffect } from "react";
import { WorldMap } from "../WorldMap/WorldMap";
import { useRequest } from "../../hooks/useRequest";
import { worldMap } from "../../data/worldMap";
import { Dropdown } from "../Dropdown/Dropdown";
import { years } from "../../data/years";
import { Card } from "../Card/Card";

export interface Country {
  id?: string;
  country: string;
  amount: any;
  percentage: any;
}

export const MapContainer = () => {
  const [year, setYear] = useState<string>("2020");
  const [countries, setCountries] = useState<Country[]>();
  const { data, isLoading } = useRequest(`/year/${year}`);
  const [country, setCountry] = useState<Country>();

  useEffect(() => {
    if (!isLoading && data?.Data) {
      // Sort countries descending by number of internet users
      const countries = Object.keys(data?.Data)
        ?.map((key) => ({
          country: key,
          ...data?.Data[key],
        }))
        .map((item) => {
          const countryId = worldMap.layers.find(
            (layer) => layer.name.toLowerCase() === item.country.toLowerCase()
          )?.id;

          return {
            id: countryId,
            country: item.country,
            percentage: item?.internet_users_percentatge.toFixed(0),
            amount: item?.internet_users_number.toLocaleString("en-US"),
          };
        });

      const defaultCountry = countries?.find(
        (item) => item.country === "United States"
      );

      setCountry(defaultCountry);

      setCountries(countries);
    }
  }, [data, isLoading]);

  const handleClick = (country: string) => {
    const countryData = countries?.find((item) => item.country === country);
    setCountry(countryData);
  };

  return (
    <div id="world-map" className="lg:px-10 px-5 py-10 pt-20 lg:pb-20">
      <span className="text-blue-400 font-bold text-lg">World Map</span>
      <h2 className="text-2xl sm:text-4xl font-bold text-gray-300 mb-4 lg:w-1/2">
        Examining total users and yearly access
      </h2>
      <div className="grid lg:grid-cols-12">
        <div className="col-span-4 flex flex-col">
          <div className="flex items-end">
            <div className="w-1/2 mr-5">
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
            <h3 className="text-xl text-gray-300">{country?.country}</h3>
          </div>

          <div className="grid md:grid-cols-2 py-5 gap-3">
            <Card
              heading="Users"
              data={country?.amount}
              description="Number of users consuming digital content online"
            />
            <Card
              heading="Percentage"
              data={`${country?.percentage}%`}
              description="Year of how many users could access the Internet"
            />
          </div>
          <div className="mt-auto">
            <div className="bg-gradient-to-r rounded-xl from-[rgba(56,43,168,0.3)] to-[rgba(56,43,168,1)]  h-3 w-1/4 lg:w-1/2"></div>
            <div className="text-xs text-gray-500 flex align-middle justify-between w-1/4 lg:w-1/2 mt-1">
              <span>0%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
        <div className="col-span-8">
          <div className="mx-auto w-[90%] lg:w-[80%] mt-10 ">
            <WorldMap countries={countries} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </div>
  );
};
