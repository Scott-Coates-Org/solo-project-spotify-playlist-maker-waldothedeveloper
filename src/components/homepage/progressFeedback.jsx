export const ProgressFeedback = ({
  isMutating,
  isLoadingFillPlaylist,
  isLoadingTracks,
  playlistComplete,
}) => {
  return (
    <div className="mt-6">
      {isMutating ? (
        <p className="mt-1 text-base font-medium tracking-tight text-slate-800">
          Creating Playlist...
        </p>
      ) : isLoadingFillPlaylist ? (
        <p className="mt-1 textbasel font-medium tracking-tight text-slate-800">
          Adding songs to your playlist...
        </p>
      ) : isLoadingTracks ? (
        <p className="mt-1 text-base font-medium tracking-tight text-slate-800">
          Finding cool songs...
        </p>
      ) : playlistComplete ? (
        <p className="mt-1 text-base font-medium tracking-tight text-slate-800">
          Done, your playlist is now available in your Spotify account.
        </p>
      ) : null}
    </div>
  );
};
