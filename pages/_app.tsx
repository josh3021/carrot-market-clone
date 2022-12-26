import "@styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <SWRConfig value={{ fetcher }}>
      <div className="w-full mx-auto">
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
};

export default App;
