import { classNames } from "../utils/classNames";
import { genres } from "../utils/genres";
import { useTheme } from "./providers/themeProvider";

export const ProgressBar = ({ percentage }) => {
  const { theme } = useTheme();
  return (
    <div className="w-full bg-slate-300">
      <div
        className={classNames(
          genres.filter((elem) => elem.genre === theme)[0]?.gradient,
          "text-sm h-6 flex items-center justify-center font-medium text-white text-center leading-none transition-all ease-in-out duration-700 delay-200 opacity-50"
        )}
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};
