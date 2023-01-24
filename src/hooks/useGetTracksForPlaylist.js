import { fetcher } from "../utils/fetcher";
import useSWR from "swr";

//
export const useGetTracksForPlaylist = (token, genre, year, playlist) => {
  const { data: tracks, isLoading: isLoadingTracks } = useSWR(
    token &&
      playlist?.id &&
      genre !== "select a year" &&
      year !== "select a genre"
      ? [
          `https://api.spotify.com/v1/search?q=year:${year}+genre:${genre.toLowerCase()}&type=track&market=US&locale=en&offset=1&limit=15`,
          token,
        ]
      : null,
    fetcher
  );

  return { tracks, isLoadingTracks };
};
