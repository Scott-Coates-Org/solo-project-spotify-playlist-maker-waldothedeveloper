import Login from "../login/Login";

export const NonAuthenticatedUsersContent = () => {
  return (
    <div>
      <div className="mx-auto max-w-2xl py-16 px-6 text-center sm:py-20 lg:px-8">
        <p className="text-lg font-semibold text-indigo-600">Powered by SMX</p>
        <h2 className="mt-4 font-bold tracking-tight text-slate-900 text-4xl lg:text-5xl">
          Spotify Playlist Generator
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg text-slate-500">
          Our playlist maker provides you with just the right music to get you
          in the zone without wasting your time
        </p>

        <div className="mt-8 inline-flex w-full items-center justify-center">
          <Login />
        </div>
      </div>
    </div>
  );
};
