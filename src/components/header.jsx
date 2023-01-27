import { UserDetails } from "./user/userDetails";
import { genres } from "../utils/genres";
import { useTheme } from "./providers/themeProvider";

export const Header = () => {
  const { theme } = useTheme();

  return (
    <header
      className={
        genres.filter((elem) => elem.genre === theme)[0]?.gradient ||
        `bg-gradient-to-r from-red-500 to-red-800`
      }
    >
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-amber-50 py-6 lg:border-none">
          <div className="flex items-center">
            <a href="/" className="inline-flex items-center">
              <span className="sr-only"></span>
              <img
                className="h-8 md:h-10 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt=""
              />
              <span className="ml-3 md:text-2xl text-xl text-white">
                TheCoolMusicCo &#8482;
              </span>
            </a>
          </div>

          <UserDetails />
        </div>
      </nav>
    </header>
  );
};
