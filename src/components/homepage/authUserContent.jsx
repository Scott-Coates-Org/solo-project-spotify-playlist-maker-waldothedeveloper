export const AuthenticatedUsersContent = () => {
  return (
    <div className="mx-auto max-w-2xl py-16 px-6 sm:py-20 lg:px-8">
      <form className="space-y-8">
        <div className="space-y-8 divide-y divide-slate-200">
          <div>
            <div>
              <h3 className="text-lg font-semibold leading-6 text-slate-900">
                Select your desired genre and year, then hit generate to create
                your playlist!
              </h3>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Genre
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue="Canada"
                  >
                    <option>Electronica</option>
                    <option>Jazz</option>
                    <option>Classical</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-4">
                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Year
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    defaultValue="Canada"
                  >
                    <option>2023</option>
                    <option>2022</option>
                    <option>2021</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Generate Playlist
          </button>
        </div>
      </form>
    </div>
  );
};
