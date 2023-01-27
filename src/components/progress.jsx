import { classNames } from "../utils/classNames";

export const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full bg-slate-300">
      <div
        className={classNames(
          "bg-slate-800",
          "text-sm h-6 flex items-center justify-center font-medium text-slate-50 text-center leading-none transition-all ease-in-out duration-700 opacity-50"
        )}
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};
