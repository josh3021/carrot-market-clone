import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../../components/layout";

const Like: NextPage = () => {
  const router = useRouter();
  return (
    <Layout title="❤️" isGoBack>
      <div className="flex flex-col space-y-5 py-10">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            className="flex px-4 border-b pb-5 cursor-pointer justify-between"
            key={i}
            onClick={() => router.push(`items/${i}`)}
          >
            <div className="flex space-x-4 items-center">
              <div className="w-20 h-20 bg-gray-400 rounded-lg" />
              <div className="flex flex-col py-3">
                <div className="flex flex-col justify-center">
                  <h3 className="font-semibold text-lg">New iPhone 14</h3>
                  <span className="text-sm font-light text-gray-400">
                    Black
                  </span>
                </div>
                <span className="font-bold mt-1">$95</span>
              </div>
            </div>
            <div className="flex items-end py-2 space-x-2">
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 fill-pink-500 stroke-pink-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
                <span className="ml-1 text-gray-600 text-sm">1</span>
              </div>
              <div className="flex items-center">
                <svg
                  className="w-4 h-4 stroke-gray-800"
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
                <span className="ml-1 text-gray-600 text-sm">1</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Like;
