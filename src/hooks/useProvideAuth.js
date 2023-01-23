import { fetcher } from "../utils/fetcher";
import { useAuth } from "../components/login/Auth";
import useSWR from "swr";
//
export const useProvideAuth = () => {
  const { token, setToken } = useAuth();

  const { data: userProfile } = useSWR(
    token ? ["https://api.spotify.com/v1/me", token] : null,
    fetcher
  );

  //
  const loginHandler = (token) => {
    setToken(token);
    // SpotifyAuth looks at the token in the url fragment, so we must remove it because the logout method will not work until we remove this.
    window.location = "/";
  };

  const logoutHandler = () => {
    setToken(null);
    window.location = "/";
  };

  return { loginHandler, logoutHandler, token, userProfile };
};
