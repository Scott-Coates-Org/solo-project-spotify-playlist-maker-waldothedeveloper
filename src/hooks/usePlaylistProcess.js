import { useEffect, useState } from "react";

import { useCreateNewPlaylist } from "./useCreateNewPlaylist";
import { useFillPlaylist } from "./useFillPlaylist";
import { useGetTracksForPlaylist } from "./useGetTracksForPlaylist";
import { useProvideAuth } from "./useProvideAuth.js";
import { useTheme } from "../components/providers/themeProvider";

//
export const usePlaylistProcess = (selectedYear, setOpenModal) => {
  const { theme } = useTheme();
  const [percentage, setPercentage] = useState(0);
  const { token, userProfile } = useProvideAuth();
  const { trigger, isMutating } = useCreateNewPlaylist(token, userProfile?.id);
  const [playlist, setPlaylist] = useState(null);
  const [playlistComplete, setPlaylistComplete] = useState(false);

  const { tracks, isLoadingTracks } = useGetTracksForPlaylist(
    token,
    theme,
    selectedYear,
    playlist
  );

  const { playlistWithTracks, isLoadingFillPlaylist } = useFillPlaylist(
    token,
    playlist?.id,
    tracks
  );

  const resetAll = () => {
    setPlaylistComplete(false);
    setPlaylist(null);
    setPercentage(0);
  };

  useEffect(() => {
    if (isMutating) setPercentage(50);
    if (isLoadingTracks) setPercentage(75);
    if (isLoadingFillPlaylist) setPercentage(100);
  }, [isMutating, isLoadingTracks, isLoadingFillPlaylist]);

  useEffect(() => {
    if (playlistWithTracks?.snapshot_id) setPlaylistComplete(true);
  }, [playlistWithTracks]);

  const createPlaylist = async () => {
    setOpenModal(true);
    try {
      const result = await trigger({
        name: `${theme} Playlist by SWR`,
        description: `A super cool selection of ${theme} tracks`,
        public: true,
      });

      return result;
    } catch (error) {
      // console.log("error creating a new playlist: ", error);
    }
  };

  return {
    percentage,
    createPlaylist,
    setPlaylist,
    playlistComplete,
    isMutating,
    isLoadingTracks,
    isLoadingFillPlaylist,
    playlist,
    resetAll,
  };
};
