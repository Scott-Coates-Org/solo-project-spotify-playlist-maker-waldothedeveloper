import { useAuth } from "../components/login/Auth";

export const useProvideAuth = () => {
  const { token, setToken } = useAuth();
  const loginHandler = (token) => {
    setToken(token);
    // SpotifyAuth looks at the token in the url fragment, so we must remove it because the logout method will not work until we remove this.
    window.location = "/";
  };

  const logoutHandler = () => {
    setToken(null);
    window.location = "/";
  };

  return { loginHandler, logoutHandler, token };
};
