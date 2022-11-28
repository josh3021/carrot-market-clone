import type { NextPage } from "next";
import Link from "next/link";
import { FloatingButton } from "../../components/button";
import Layout from "../../components/layout";

const Community: NextPage = () => {
  return (
    <Layout title="피드" isTabBar>
      <div className="px-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Link
            href="/community/1"
            className="flex flex-col items-start border-b py-8"
            key={i}
          >
            <span className="flex mx-2 my-2 bg-gray-200 py-0.5 px-2 font-medium text-sm rounded-full shadow-sm">
              동네질문
            </span>
            <span className="font-light text-lg">
              <span className="text-fuchsia-700 font-medium">Q.</span> What is
              the best mandu restaurant?
            </span>
            <div className="my-4 w-full flex justify-between">
              <span className="text-sm font-medium text-gray-600">니꼬</span>
              <span className="text-sm font-medium text-gray-600">
                18시간 전
              </span>
            </div>
            <div className="flex justify-end w-full space-x-4 items-center">
              <span className="flex space-x-1 items-center cursor-pointer group">
                <svg
                  className="w-4 h-4 stroke-gray-600 group-hover:stroke-gray-700 group-active:stroke-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-600  group-hover:text-gray-700 group-active:text-gray-900">
                  궁금해요 1
                </span>
              </span>
              <span className="flex items-center space-x-1 group cursor-pointer">
                <svg
                  className="w-4 h-4 stroke-gray-600 group-hover:text-gray-700 group-active:text-gray-900"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
                <span className="text-gray-600 group-hover:text-gray-700 group-active:text-gray-900">
                  답변 1
                </span>
              </span>
            </div>
          </Link>
        ))}
        <FloatingButton href="/community/write">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
