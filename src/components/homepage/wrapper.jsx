import { AuthenticatedUsersContent } from "./authUserContent";
import { Banner } from "./banner";
import { Image } from "./Image";
import { UnsplashCredit } from "./unsplashCredit";
import { genres } from "../../utils/genres";
import { useProvideAuth } from "../../hooks/useProvideAuth";
import { useTheme } from "../providers/themeProvider";

export const Wrapper = () => {
  const { token } = useProvideAuth();
  const { theme } = useTheme();

  return (
    <div
      className={
        genres.filter((elem) => elem.genre === theme)[0]?.gradient ||
        `bg-gradient-to-r from-red-500 to-red-800`
      }
    >
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Details */}
        <div className="lg:max-w-lg lg:self-end">
          <Banner />
        </div>

        {/* Images */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <Image />
          <UnsplashCredit />
        </div>

        {/* Form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          {token && <AuthenticatedUsersContent />}
        </div>
      </div>
    </div>
  );
};
