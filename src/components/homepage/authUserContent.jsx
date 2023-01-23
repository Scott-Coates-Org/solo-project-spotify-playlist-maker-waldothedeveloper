import { useEffect, useMemo, useState } from "react";

import { ListBox } from "./listbox";
import { fetcher } from "../../utils/fetcher";
import { generateArrayOfYears } from "../../utils/getYears";
import { postFetcher } from "../../utils/postFetcher";
import { useProvideAuth } from "../../hooks/useProvideAuth.js";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const predefinedGenres = ["Pop", "Electronica", "Jazz", "Classical", "Country"];

export const AuthenticatedUsersContent = () => {
  const { token, userProfile } = useProvideAuth();
  const years = useMemo(() => generateArrayOfYears(), []);
  const [selectedGenre, setSelectedGenre] = useState("select a genre");
  const [selectedYear, setSelectedYear] = useState("select a year");
  const [playlist, setPlaylist] = useState(null);
  const [tracksForPlaylist, setTracksForPlaylist] = useState(null);
  const [playlistComplete, setPlaylistComplete] = useState(false);

  // 1. create a blank playlist
  const { trigger, isMutating } = useSWRMutation(
    [`https://api.spotify.com/v1/users/${userProfile?.id}/playlists`, token],
    postFetcher
  );

  //2. get tracks related to genre and year
  const { data: tracks } = useSWR(
    token && playlist
      ? [
          `https://api.spotify.com/v1/search?q=year:${selectedYear}+genre:${selectedGenre.toLowerCase()}&type=track&market=US&locale=en&offset=1&limit=15`,
          token,
        ]
      : null,
    fetcher
  );

  // 3. add tracks to playlist
  const { trigger: playlistTrigger } = useSWRMutation(
    [`https://api.spotify.com/v1/playlists/${playlist?.id}/tracks`, token],
    postFetcher
  );

  const handleGenre = (value) => setSelectedGenre(value);
  const handleYear = (value) => setSelectedYear(value);

  const createPlaylist = async () => {
    try {
      const result = await trigger({
        name: `${selectedGenre} Playlist by SWR`,
        description: `A super cool selection of ${selectedGenre} tracks`,
        public: true,
      });

      setPlaylist({
        id: result?.id,
        playlist_name: result?.name,
        playlist_description: result?.description,
        playlist_owner: result?.owner?.display_name,
      });
    } catch (error) {
      // console.log("error creating a new playlist: ", error);
    }
  };

  useEffect(() => {
    const arrOfTrackIds = [];
    //
    if (tracks && tracks?.tracks?.items?.length > 0) {
      tracks?.tracks?.items.map((item) =>
        arrOfTrackIds.push(`spotify:track:${item.id}`)
      );
      setTracksForPlaylist(arrOfTrackIds);
    }
  }, [tracks]);

  useEffect(() => {
    const addTracksToPlaylist = async () => {
      try {
        const res = await playlistTrigger({
          uris: tracksForPlaylist,
        });

        if (res?.snapshot_id) setPlaylistComplete(true);
      } catch (error) {
        // console.log("error: ", error);
      }
    };

    if (tracksForPlaylist && tracksForPlaylist.length === 15) {
      addTracksToPlaylist();
    }
  }, [tracksForPlaylist, playlistTrigger]);

  const resetInputs = () => {
    setSelectedGenre("select a genre");
    setSelectedYear("select a year");
    setPlaylist(null);
    setTracksForPlaylist(null);
    setPlaylistComplete(false);
  };

  return (
    <div className="mx-auto max-w-2xl py-16 px-6 sm:py-20 lg:px-8">
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
          {playlist && playlistComplete ? (
            <button
              onClick={resetInputs}
              className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Start Over
            </button>
          ) : (
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
          )}
        </div>
      </form>
      {playlist && playlistComplete && (
        <div className="mt-5">
          <p className="mt-5 text-xl text-gray-500">
            {JSON.stringify(playlist)}
          </p>
        </div>
      )}
    </div>
  );
};
