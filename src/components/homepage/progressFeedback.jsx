export const ProgressFeedback = ({
  isMutating,
  isLoadingFillPlaylist,
  isLoadingTracks,
  playlistComplete,
}) => {
  return (
    <div className="mt-6">
      {isMutating ? (
        <p className="mt-1 text-2xl font-medium tracking-tight text-slate-700">
          Creating Playlist...
        </p>
      ) : isLoadingFillPlaylist ? (
        <p className="mt-1 text-2xl font-medium tracking-tight text-slate-700">
          Adding songs to your playlist...
        </p>
      ) : isLoadingTracks ? (
        <p className="mt-1 text-2xl font-medium tracking-tight text-slate-700">
          Finding cool songs...
        </p>
      ) : playlistComplete ? (
        <p className="mt-1 text-2xl font-medium tracking-tight text-slate-700">
          You're done! Your playlist is now available in your Spotify account.
        </p>
      ) : null}
    </div>
  );
};
