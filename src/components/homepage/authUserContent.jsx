import { useMemo, useState } from "react";

import { ListBox } from "./listbox";
import { generateArrayOfYears } from "../../utils/getYears";

const predefinedGenres = ["Pop", "Electronica", "Jazz", "Classical", "Country"];

export const AuthenticatedUsersContent = () => {
  const years = useMemo(() => generateArrayOfYears(), []);
  const [selectedGenre, setSelectedGenre] = useState("select a genre");
  const [selectedYear, setSelectedYear] = useState("select a year");

  const handleGenre = (value) => {
    setSelectedGenre(value);
  };

  const handleYear = (value) => {
    setSelectedYear(value);
  };

  return (
    <div className="mx-auto max-w-2xl py-16 px-6 sm:py-20 lg:px-8">
      {/* on submit will change later */}
      <form onSubmit={(event) => event.preventDefault()} className="space-y-8">
        <div className="space-y-8 divide-y divide-slate-200">
          <div>
            <div>
              <h3 className="text-lg font-semibold leading-6 text-slate-900">
                Select your desired genre and year, then hit generate to create
                your playlist!
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <ListBox
                  selectedData={selectedGenre}
                  data={predefinedGenres}
                  name="Genre"
                  handleChange={handleGenre}
                />
              </div>

              <div className="sm:col-span-4">
                <ListBox
                  selectedData={selectedYear}
                  data={years}
                  name="Year"
                  handleChange={handleYear}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <button
            disabled={
              selectedGenre === "select a genre" ||
              selectedYear === "select a year"
                ? true
                : false
            }
            // this will change later
            onClick={() => console.log(`aosdijaosdijaosidj`)}
            className={
              selectedGenre === "select a genre" ||
              selectedYear === "select a year"
                ? "inline-flex justify-center rounded-md border border-transparent bg-slate-300 py-2 px-4 text-sm font-medium text-white shadow-sm"
                : "inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            }
          >
            Generate Playlist
          </button>
        </div>
      </form>
    </div>
  );
};
