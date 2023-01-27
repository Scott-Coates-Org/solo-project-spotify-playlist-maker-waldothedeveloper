import { NonAuthenticatedUsersContent } from "./nonAuthUserContent";
import { byDefault } from "../../utils/byDefault";
import { motion } from "framer-motion";
import { useProvideAuth } from "../../hooks/useProvideAuth";
import { useTheme } from "../providers/themeProvider";

const title = `Spotify Playlist Generator`;
//
export const Banner = () => {
  const { token } = useProvideAuth();
  const { theme } = useTheme();

  return token ? (
    <>
      <div className="mt-4">
        <motion.h1
          initial={{
            opacity: 0,
            y: 50,
          }}
          transition={{ duration: 1 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={
            theme === "select a genre"
              ? "font-bold tracking-tight text-red-50 text-4xl lg:text-5xl inline-block"
              : "font-bold tracking-tight text-slate-50 text-4xl lg:text-5xl inline-block"
          }
        >
          {title}
        </motion.h1>
      </div>

      <div className="mt-4 space-y-6">
        <motion.p
          initial={{
            opacity: 0,
            y: 50,
          }}
          transition={{ duration: 1.5 }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className={
            theme === "select a genre"
              ? "text-lg text-slate-50"
              : "text-lg text-slate-100"
          }
        >
          {byDefault.description}
        </motion.p>
      </div>
    </>
  ) : (
    <NonAuthenticatedUsersContent />
  );
};
