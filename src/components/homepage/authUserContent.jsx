import { ListBox } from "./listbox";
// import { ProgressBar } from "../progress";
import { ProgressFeedback } from "./progressFeedback";
import { genres } from "../../utils/genres";
import { useHandleForm } from "../../hooks/useHandleForm";
import { useTheme } from "../providers/themeProvider";

//
export const AuthenticatedUsersContent = () => {
  const {
    resetInputs,
    createPlaylist,
    handleYear,
    playlistComplete,
    // percentage,
    years,
    isMutating,
    isLoadingFillPlaylist,
    isLoadingTracks,
    setPlaylist,
    selectedYear,
    playlist,
  } = useHandleForm();
  const { setTheme, theme } = useTheme();
  return (
    <div>
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
          <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <ListBox
                shouldDisable={
                  playlistComplete ||
                  isMutating ||
                  isLoadingFillPlaylist ||
                  isLoadingTracks
                }
                selectedData={theme}
                data={genres}
                name="genre"
                handleChange={setTheme}
              />
            </div>

            <div className="sm:col-span-4">
              <ListBox
                shouldDisable={
                  playlistComplete ||
                  isMutating ||
                  isLoadingFillPlaylist ||
                  isLoadingTracks
                }
                selectedData={selectedYear}
                data={years}
                name="year"
                handleChange={handleYear}
              />
            </div>
          </div>
        </div>

        <div className="pt-5">
          {playlist && playlistComplete ? (
            <button
              onClick={resetInputs}
              className="inline-flex items-center rounded-md border-2 border-amber-50 bg-transparent px-6 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
            >
              Start Over
            </button>
          ) : (
            <button
              disabled={
                isMutating ||
                isLoadingFillPlaylist ||
                isLoadingTracks ||
                theme === "select a genre" ||
                selectedYear === "select a year"
                  ? true
                  : false
              }
              type="submit"
              className="inline-flex items-center rounded-md border-2 border-amber-50 bg-transparent px-6 py-3 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-700 focus:ring-offset-2"
            >
              Generate Playlist
            </button>
          )}
        </div>
      </form>

      <div className="mt-4">
        {/* <ProgressBar percentage={percentage} /> */}
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
