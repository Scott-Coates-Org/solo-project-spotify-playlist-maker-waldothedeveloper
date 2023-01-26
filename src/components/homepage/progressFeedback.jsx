export const ProgressFeedback = ({
  isMutating,
  isLoadingFillPlaylist,
  isLoadingTracks,
  playlistComplete,
}) => {
  return (
    <div className="mt-6">
      {isMutating ? (
        <p className="mt-1 text-2xl font-medium tracking-tight text-white">
          Creating Playlist...
        </p>
      ) : isLoadingFillPlaylist ? (
        <p className="mt-1 text-2xl font-medium tracking-tight text-white">
          Adding songs to your playlist...
        </p>
      ) : isLoadingTracks ? (
        <p className="mt-1 text-2xl font-medium tracking-tight text-white">
          Finding cool songs...
        </p>
      ) : playlistComplete ? (
        <p className="mt-1 text-2xl font-medium tracking-tight text-white">
          You're done! Your playlist is now available in your Spotify account.
        </p>
      ) : null}
    </div>
  );
};
