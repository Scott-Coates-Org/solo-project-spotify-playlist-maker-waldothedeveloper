import { Menu, Transition } from "@headlessui/react";

import { ErrorAlert } from "../error";
import { Fragment } from "react";
import { classNames } from "../../utils/classNames";
import { fetcher } from "../../utils/fetcher";
import { useProvideAuth } from "../../hooks/useProvideAuth";
import useSWR from "swr";

export const UserDetails = () => {
  const { logoutHandler, token } = useProvideAuth();
  const { data, error, isLoading } = useSWR(
    token ? ["https://api.spotify.com/v1/me", token] : null,
    fetcher
  );

  const userNavigation = [{ name: "Sign out", href: () => logoutHandler() }];

  if (isLoading) {
    return <p className="mt-2 text-sm text-white">Loading..</p>;
  }

  if (error) {
    return <ErrorAlert error={error} />;
  }

  if (token) {
    return (
      <Menu as="div" className="relative ml-3">
        <div>
          {Array.isArray(data?.images) && data?.images.length > 0 ? (
            <Menu.Button className="flex max-w-xs items-center rounded-full bg-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-10 w-10 rounded-full"
                src={data?.images[0]?.url}
                alt=""
              />
            </Menu.Button>
          ) : (
            <Menu.Button className="flex max-w-xs items-center rounded-full bg-indigo-600 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600">
              <span className="inline-block h-10 w-10 overflow-hidden rounded-full bg-slate-600">
                <svg
                  className="h-full w-full text-slate-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </span>
            </Menu.Button>
          )}
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {userNavigation.map((item) => (
              <Menu.Item key={item.name}>
                {({ active }) => (
                  <button
                    onClick={item.href}
                    className={classNames(
                      active ? "bg-slate-100" : "",
                      "block px-4 py-2 text-sm text-slate-700 w-full"
                    )}
                  >
                    {item.name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Transition>
      </Menu>
    );
  }
};
