import { Dialog, Transition } from "@headlessui/react";

import { CheckIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";
import { ProgressBar } from "./progress";
import { ProgressFeedback } from "../components/homepage/progressFeedback";
import { genres } from "../utils/genres";
import { motion } from "framer-motion";
import { useTheme } from "./providers/themeProvider";

export const Modal = ({
  percentage,
  open,
  setOpen,
  isMutating,
  isLoadingFillPlaylist,
  isLoadingTracks,
  playlistComplete,
}) => {
  const { theme } = useTheme();
  const currTheme = genres.filter((elem) => elem.genre === theme)[0]?.gradient;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-50 backdrop-blur-sm bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg border-2 border-amber-50/50 bg-white/50 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  {playlistComplete && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ rotate: 360, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-amber-50"
                    >
                      <CheckIcon
                        className="h-6 w-6 text-amber-800"
                        aria-hidden="true"
                      />
                    </motion.div>
                  )}
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-slate-900"
                    >
                      <ProgressFeedback
                        isMutating={isMutating}
                        isLoadingFillPlaylist={isLoadingFillPlaylist}
                        isLoadingTracks={isLoadingTracks}
                        playlistComplete={playlistComplete}
                      />
                    </Dialog.Title>
                    <div className="mt-2">
                      <ProgressBar percentage={percentage} />
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-6">
                  <button
                    disabled={
                      isMutating || isLoadingFillPlaylist || isLoadingTracks
                        ? true
                        : false
                    }
                    type="button"
                    className={
                      currTheme
                        ? `inline-flex w-full justify-center rounded-md border border-transparent ${currTheme} px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:text-sm`
                        : `inline-flex w-full justify-center rounded-md border border-transparent bg-slate-900 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none sm:text-sm`
                    }
                    onClick={() => setOpen(false)}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
