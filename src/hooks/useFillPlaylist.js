import { postFetcher2 } from "../utils/postFetcher2";
import useSWRImmutable from "swr/immutable";
export const useFillPlaylist = (token, playlistId, tracksArray) => {
  const newArr = tracksArray?.tracks?.items.map(
    (elem) => `spotify:track:${elem.id}`
  );

  const {
    data: playlistWithTracks,
    error: playlistWithTracksError,
    isLoading: isLoadingFillPlaylist,
    // it's crucial to use useSWRImmutable instead of useSWR, because of auto revalidation, it was filling the playlist twice with the same songs
  } = useSWRImmutable(
    token && playlistId && Array.isArray(newArr) && newArr.length > 0
      ? [
          `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
          token,
          { uris: newArr },
        ]
      : null,
    postFetcher2
  );

  return { playlistWithTracks, playlistWithTracksError, isLoadingFillPlaylist };
};
