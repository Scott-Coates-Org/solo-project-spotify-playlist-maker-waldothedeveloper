import "react-spotify-auth/dist/index.css"; // if using the included styles

import { Scopes, SpotifyAuth } from "react-spotify-auth";

import React from "react";
import { useProvideAuth } from "../../hooks/useProvideAuth";

const spotifyClientKey = process.env.REACT_APP_SPOTIFY_CLIENT_KEY;
if (!spotifyClientKey)
  throw new Error(
    `spotify client key missing. Did you read the issues? If not, visit the Issues page in this repo on GitHub.`
  );

const Login = () => {
  let retVal;
  const { loginHandler, logoutHandler, token } = useProvideAuth();

  if (token) {
    retVal = (
      <button
        onClick={logoutHandler}
        className="mt-10 inline-flex items-center rounded-lg border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
      >
        Sign Out
      </button>
    );
  } else {
    retVal = (
      <SpotifyAuth
        noCookie={true}
        redirectUri={
          process.env.NODE_ENV === "production"
            ? "https://smx-spotify-playlist-mak-56a0f.web.app/callback"
            : "http://localhost:3000/callback"
        }
        clientID={spotifyClientKey}
        scopes={[
          Scopes.playlistModifyPrivate,
          Scopes.playlistModifyPublic,
          Scopes.playlistReadPrivate,
          Scopes.playlistReadCollaborative,
        ]}
        onAccessToken={loginHandler}
      />
    );
  }

  return retVal;
};

export default Login;
