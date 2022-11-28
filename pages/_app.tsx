import type { NextPage } from "next";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="w-full mx-auto">
      <Component {...pageProps} />
    </div>
  );
};

export default App;
