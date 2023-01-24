export const ProgressBar = ({ percentage }) => {
  return (
    <div className="w-full bg-slate-300">
      <div
        className="bg-indigo-600 text-sm h-6 flex items-center justify-center font-medium text-indigo-50 text-center leading-none transition-all ease-in-out duration-700 delay-200"
        style={{ width: `${percentage}%` }}
      >
        {percentage}%
      </div>
    </div>
  );
};
