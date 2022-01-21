import type { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

import "@/styles/globals.scss";

library.add(faArrowLeft, faChevronRight);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
