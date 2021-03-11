//CSS
import "../styles/G-theme.scss";
//Swr, this is just a simple context that provides fetcher to all swr hooks
import { SWRConfig, cache } from "swr";
import apiHelper from "../utils/players/api-helper";
const { fetcher } = apiHelper;
export default function FrontendAssignmentGUI({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher, onError: () => cache.clear() }}>
      <Component {...pageProps} />
    </SWRConfig>
  );
}
