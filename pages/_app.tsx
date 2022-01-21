import type { AppProps } from "next/app";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowLeft,
  faCaretLeft,
  faCaretRight,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

import "@/styles/globals.scss";

library.add(faArrowLeft, faCaretLeft, faCaretRight, faChevronRight);

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
