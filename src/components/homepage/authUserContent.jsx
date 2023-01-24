import { useEffect, useMemo, useState } from "react";

import { ListBox } from "./listbox";
import { ProgressBar } from "../progress";
import { ProgressFeedback } from "./progressFeedback";
import { generateArrayOfYears } from "../../utils/getYears";
import { useCreateNewPlaylist } from "../../hooks/useCreateNewPlaylist";
import { useFillPlaylist } from "../../hooks/useFillPlaylist";
import { useGetTracksForPlaylist } from "../../hooks/useGetTracksForPlaylist";
import { useProvideAuth } from "../../hooks/useProvideAuth.js";

const predefinedGenres = ["Pop", "Electronica", "Jazz", "Classical", "Country"];

export const AuthenticatedUsersContent = () => {
  const { token, userProfile } = useProvideAuth();
  const years = useMemo(() => generateArrayOfYears(), []);
  const [selectedGenre, setSelectedGenre] = useState("select a genre");
  const [selectedYear, setSelectedYear] = useState("select a year");
  const [playlist, setPlaylist] = useState(null);
  const [playlistComplete, setPlaylistComplete] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const handleGenre = (value) => setSelectedGenre(value);
  const handleYear = (value) => setSelectedYear(value);

  const { trigger, isMutating } = useCreateNewPlaylist(token, userProfile?.id);

  const { tracks, isLoadingTracks } = useGetTracksForPlaylist(
    token,
    selectedGenre,
    selectedYear,
    playlist
  );

  const { playlistWithTracks, isLoadingFillPlaylist } = useFillPlaylist(
    token,
    playlist?.id,
    tracks
  );

  useEffect(() => {
    if (isMutating) setPercentage(50);
    if (isLoadingTracks) setPercentage(75);
    if (isLoadingFillPlaylist) setPercentage(100);
  }, [isMutating, isLoadingTracks, isLoadingFillPlaylist]);

  useEffect(() => {
    if (playlistWithTracks?.snapshot_id) setPlaylistComplete(true);
  }, [playlistWithTracks]);

  const createPlaylist = async () => {
    try {
      const result = await trigger({
        name: `${selectedGenre} Playlist by SWR`,
        description: `A super cool selection of ${selectedGenre} tracks`,
        public: true,
      });

      return result;
    } catch (error) {
      // console.log("error creating a new playlist: ", error);
    }
  };

  const resetInputs = () => {
    setSelectedGenre("select a genre");
    setSelectedYear("select a year");
    setPlaylist(null);
    setPlaylistComplete(false);
    setPercentage(0);
  };

  return (
    <div className="mx-auto max-w-2xl py-16 px-6 sm:py-20 lg:px-8">
      <form
        className="space-y-8"
        onSubmit={(event) => {
          if (event) event.preventDefault();
          createPlaylist().then((data) => {
            setPlaylist({ id: data?.id });
          });
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
                  name="genre"
                  handleChange={handleGenre}
                />
              </div>

              <div className="sm:col-span-4">
                <ListBox
                  selectedData={selectedYear}
                  data={years}
                  name="year"
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
              className="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            >
              Start Over
            </button>
          ) : (
            <button
              disabled={
                isMutating ||
                isLoadingFillPlaylist ||
                isLoadingTracks ||
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

      <div className="mt-4">
        <ProgressBar percentage={percentage} />
        <ProgressFeedback
          isMutating={isMutating}
          isLoadingFillPlaylist={isLoadingFillPlaylist}
          isLoadingTracks={isLoadingTracks}
          playlistComplete={playlistComplete}
        />
      </div>
    </div>
  );
};
