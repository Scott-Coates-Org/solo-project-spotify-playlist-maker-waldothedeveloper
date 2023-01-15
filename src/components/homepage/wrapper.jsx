import { AuthenticatedUsersContent } from "./authUserContent";
import { NonAuthenticatedUsersContent } from "./nonAuthUserContent";
import { useProvideAuth } from "../../hooks/useProvideAuth";

//
export const HomepageWrapper = () => {
  let content;
  const { token } = useProvideAuth();

  if (token) {
    content = <AuthenticatedUsersContent />;
  } else {
    content = <NonAuthenticatedUsersContent />;
  }

  return content;
};
