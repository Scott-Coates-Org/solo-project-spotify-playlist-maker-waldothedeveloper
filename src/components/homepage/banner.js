import { NonAuthenticatedUsersContent } from "./nonAuthUserContent";
import { byDefault } from "../../utils/byDefault";
import { useProvideAuth } from "../../hooks/useProvideAuth";
import { useTheme } from "../providers/themeProvider";

//
export const Banner = () => {
  const { token } = useProvideAuth();
  const { theme } = useTheme();
  return token ? (
    <>
      <div className="mt-4">
        <h1
          className={
            theme === "select a genre"
              ? "font-bold tracking-tight text-red-50 text-4xl lg:text-5xl"
              : "font-bold tracking-tight text-slate-50 text-4xl lg:text-5xl"
          }
        >
          Spotify Playlist Generator
        </h1>
      </div>

      <section aria-labelledby="information-heading" className="mt-4">
        <h2 id="information-heading" className="sr-only">
          Spotify Playlist Generator
        </h2>

        <div className="mt-4 space-y-6">
          <p
            className={
              theme === "select a genre"
                ? "text-lg text-slate-50"
                : "text-lg text-slate-100"
            }
          >
            {byDefault.description}
          </p>
        </div>
      </section>
    </>
  ) : (
    <NonAuthenticatedUsersContent />
  );
};
