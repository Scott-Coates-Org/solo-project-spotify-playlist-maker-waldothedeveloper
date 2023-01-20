import { useMemo, useState } from "react";

import { ListBox } from "./listbox";
import { createPlaylistFetcher } from "../../utils/createPlaylistFetcher";
import { generateArrayOfYears } from "../../utils/getYears";
import { useProvideAuth } from "../../hooks/useProvideAuth.js";
import useSWRMutation from "swr/mutation";

const predefinedGenres = ["Pop", "Electronica", "Jazz", "Classical", "Country"];

export const AuthenticatedUsersContent = () => {
  const { token } = useProvideAuth();
  const years = useMemo(() => generateArrayOfYears(), []);
  const [selectedGenre, setSelectedGenre] = useState("select a genre");
  const [selectedYear, setSelectedYear] = useState("select a year");
  const [playlist, setPlaylist] = useState(null);

  const { trigger, isMutating } = useSWRMutation(
    [
      `https://api.spotify.com/v1/users/h4gs8n9joa4pg0ep40daw1zkd/playlists`,
      token,
    ],
    createPlaylistFetcher,
    { token }
  );

  const handleGenre = (value) => {
    setSelectedGenre(value);
  };

  const handleYear = (value) => {
    setSelectedYear(value);
  };

  const createPlaylist = async () => {
    try {
      const result = await trigger({
        name: `New ${selectedGenre} Playlist`,
        description: `New ${selectedGenre} Playlist Description`,
        public: true,
      });
      setPlaylist({
        playlist_name: result?.name,
        playlist_description: result?.description,
        playlist_owner: result?.owner?.display_name,
      });
    } catch (error) {
      // console.log("error creating a new playlist: ", error);
    }
  };

  return (
    <div className="mx-auto max-w-2xl py-16 px-6 sm:py-20 lg:px-8">
      {/* on submit will change later */}
      <form
        className="space-y-8"
        onSubmit={(event) => {
          if (event) event.preventDefault();
          createPlaylist();
        }}
      >
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
              isMutating ||
              selectedGenre === "select a genre" ||
              selectedYear === "select a year"
                ? true
                : false
            }
            type="submit"
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
      {playlist && (
        <div className="mt-5">
          <p className="mt-5 text-xl text-gray-500">
            {JSON.stringify(playlist)}
          </p>
        </div>
      )}
    </div>
  );
};
