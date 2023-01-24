import { postFetcher } from "../utils/postFetcher";
import useSWRMutation from "swr/mutation";
//
export const useCreateNewPlaylist = (token, userId) => {
  const { trigger, isMutating } = useSWRMutation(
    [`https://api.spotify.com/v1/users/${userId}/playlists`, token],
    postFetcher
  );

  return { trigger, isMutating };
};
