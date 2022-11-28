import type { NextPage } from "next";
import Link from "next/link";
import { FloatingButton } from "../../components/button";
import Layout from "../../components/layout";

const Live: NextPage = () => {
  return (
    <Layout title="라이브" isTabBar>
      <div className="space-y-4 divide-y-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div className="pt-6 px-4" key={i}>
            <Link href="/live/1">
              <div className="w-full bg-slate-300 aspect-video rounded-md shadow-md" />
              <h3 className="font-medium text-gray-700 text-lg mt-2">
                🔥 DEAN&apos;s Comeback Stage
              </h3>
            </Link>
          </div>
        ))}
        <FloatingButton href="/live/create">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Live;
