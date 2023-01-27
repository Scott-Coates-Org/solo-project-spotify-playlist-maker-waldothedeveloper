import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Listbox, Transition } from "@headlessui/react";

import { Fragment } from "react";

export const ListBox = ({
  selectedData,
  data,
  handleChange,
  shouldDisable,
}) => {
  return (
    <>
      <Listbox
        value={selectedData}
        onChange={handleChange}
        disabled={shouldDisable}
      >
        <div className="relative mt-1">
          <Listbox.Button
            className={
              shouldDisable
                ? "relative w-full cursor-default rounded-lg bg-slate-50 py-2 pl-3 pr-10 text-left focus:outline-none sm:text-sm text-slate-500 font-medium"
                : "relative w-full cursor-default rounded-lg bg-transparent py-2 pl-3 pr-10 text-left focus:outline-none border-2 shadow-lg shadow-amber-50/50 border-amber-50 focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm text-white"
            }
          >
            <span className="block truncate">{selectedData}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-white"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="z-50 absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white-50/30 backdrop-blur-md py-1 text-base shadow-lg border-2 border-white focus:outline-none sm:text-sm">
              {data.map((elem, dataIdx) => (
                <Listbox.Option
                  key={dataIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? "bg-white/30 text-amber-50" : "text-white"
                    }`
                  }
                  value={elem.genre || elem}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate  ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {elem.genre || elem}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
};
