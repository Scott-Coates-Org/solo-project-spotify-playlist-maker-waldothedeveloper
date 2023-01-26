import { useEffect, useMemo, useState } from "react";

import { generateArrayOfYears } from "../utils/getYears";
import { useCreateNewPlaylist } from "./useCreateNewPlaylist";
import { useFillPlaylist } from "./useFillPlaylist";
import { useGetTracksForPlaylist } from "./useGetTracksForPlaylist";
import { useProvideAuth } from "./useProvideAuth.js";
import { useTheme } from "../components/providers/themeProvider";

//
export const useHandleForm = () => {
  const { token, userProfile } = useProvideAuth();
  const { theme } = useTheme();
  const years = useMemo(() => generateArrayOfYears(), []);
  const [selectedYear, setSelectedYear] = useState("select a year");
  const [playlist, setPlaylist] = useState(null);
  const [playlistComplete, setPlaylistComplete] = useState(false);
  const [percentage, setPercentage] = useState(0);

  const handleYear = (value) => setSelectedYear(value);

  const { trigger, isMutating } = useCreateNewPlaylist(token, userProfile?.id);

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
        name: `${theme} Playlist by SWR`,
        description: `A super cool selection of ${theme} tracks`,
        public: true,
      });

      return result;
    } catch (error) {
      // console.log("error creating a new playlist: ", error);
    }
  };

  const resetInputs = () => {
    setSelectedYear("select a year");
    setPlaylist(null);
    setPlaylistComplete(false);
    setPercentage(0);
  };

  return {
    resetInputs,
    createPlaylist,
    handleYear,
    playlistComplete,
    percentage,
    years,
    isMutating,
    isLoadingFillPlaylist,
    isLoadingTracks,
    setPlaylist,
    theme,
    selectedYear,
    playlist,
  };
};
