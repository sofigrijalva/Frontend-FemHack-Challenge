import React from "react";
import "./App.css";
import { UsersYears } from "./components/UsersYears/UsersYears";
import { CountryYear } from "./components/CountryYear/CountryYear";
import { TopCountries } from "./components/TopCountries/TopCountries";
import { MapContainer } from "./components/MapContainer/MapContainer";

const nav = [
  {
    name: "Growth",
    href: "users-years",
  },
  {
    name: "By country",
    href: "country-years",
  },
  {
    name: "Internet Giants",
    href: "top-countries",
  },
  {
    name: "World Map",
    href: "world-map",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-slate-950  flex flex-col relative isolate">
      <ul className="z-50 flex text-sm flex-row items-center p-4 fixed ml-auto w-full md:justify-end justify-between md:bg-transparent bg-slate-950/90">
        {nav.map((item) => (
          <li className="lg:mx-4 mx-1">
            <a
              href={`#${item.href}`}
              className="text-white hover:text-indigo-400"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
      <UsersYears />
      <CountryYear />
      <TopCountries />
      <MapContainer />
    </div>
  );
}

export default App;
