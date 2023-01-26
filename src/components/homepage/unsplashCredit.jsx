import { byDefault } from "../../utils/byDefault";
import { genres } from "../../utils/genres";
import { useTheme } from "../providers/themeProvider";

//
export const UnsplashCredit = () => {
  const { theme } = useTheme();
  return (
    <div>
      <p className="text-white mt-1 text-sm">
        <i>Photo by </i>
        <a
          href={
            genres.filter((elem) => elem.genre === theme)[0]?.authorLink ||
            byDefault?.authorLink
          }
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <i>
            {genres.filter((elem) => elem.genre === theme)[0]?.author ||
              byDefault?.author}
          </i>
        </a>
        <i> on </i>
        <a
          href={
            genres.filter((elem) => elem.genre === theme)[0]?.unsplashLink ||
            byDefault?.unsplashLink
          }
          rel="nofollow noopener noreferrer"
          target="_blank"
        >
          <i>Unsplash</i>
        </a>
      </p>
    </div>
  );
};
