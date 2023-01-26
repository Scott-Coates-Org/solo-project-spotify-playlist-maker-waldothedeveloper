import { AnimatePresence, motion } from "framer-motion";

import { byDefault } from "../../utils/byDefault";
import { genres } from "../../utils/genres";
import { useTheme } from "../providers/themeProvider";

export const Image = () => {
  const { theme } = useTheme();
  const currImg =
    genres.filter((elem) => elem.genre === theme)[0]?.image ||
    byDefault.imageSrc;

  return (
    <AnimatePresence>
      <motion.div
        whileHover={{
          scale: 1.1,
          transition: { duration: 1 },
        }}
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeOut", duration: 2 }}
        exit={{ x: -300, opacity: 0 }}
        className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg"
      >
        <img
          src={currImg}
          alt={byDefault.imageAlt}
          className="h-full w-full object-cover object-center"
        />
      </motion.div>
    </AnimatePresence>
  );
};
