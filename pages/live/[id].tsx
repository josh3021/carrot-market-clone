import Layout from "@components/layout";
import Message from "@components/message";
import type { NextPage } from "next";
import React from "react";

const Stream: NextPage = () => {
  return (
    <Layout title="라이브 1" isGoBack>
      <div className="px-4 space-y-4">
        <div className="w-full bg-slate-300 aspect-video rounded-md shadow-md" />
        <h3 className="font-semibold text-gray-800 text-center text-2xl mt-2">
          🔥 DEAN&apos;s Comeback Stage
        </h3>
        <div className="mt-10 py-10 px-4 space-y-4 h-[50vh] overflow-y-scroll">
          {Array.from({ length: 10 }).map((_, i) => (
            <React.Fragment key={i}>
              <Message message="오옹! 나이스~" />
              <Message message="으시안~ 오옹!" reversed />
            </React.Fragment>
          ))}
        </div>
        <div className="fixed w-full mx-auto max-w-md bottom-2 inset-x-0 px-2">
          <div className="flex items-center relative">
            <input
              className="shadow-sm rounded-full w-full border-gray-300 focus:ring-fuchsia-700 focus:outline-none focus:border-fuchsia-700 pr-10"
              type="text"
            />
            <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
              <button className="flex items-center bg-fuchsia-700 rounded-full px-2 text-sm text-white hover:bg-fuchsia-800 active:bg-fuchsia-900 focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-700 focus:outline-none">
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
