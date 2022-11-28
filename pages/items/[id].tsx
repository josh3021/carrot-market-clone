import type { NextPage } from "next";
import Link from "next/link";
import { Button } from "../../components/button";
import Layout from "../../components/layout";

const ItemDetail: NextPage = () => {
  return (
    <Layout title="아이템 1" isGoBack>
      <div className="px-4">
        <div className="flex flex-col">
          <div className="w-full h-96 bg-gray-400" />
          <div className="flex py-2 space-x-3 items-center border-b">
            <div className="w-12 h-12 bg-gray-400 rounded-full" />
            <div className="py-2">
              <p className="font-bold">Steve Jobs</p>
              <Link className="text-sm font-light" href="/profile">
                View profile &rarr;
              </Link>
            </div>
          </div>
          <div className="my-8">
            <h1 className="font-extrabold text-2xl">Galaxy S50</h1>
            <p className="font-light text-xl text-green-700">$140</p>
            <p className="my-2">
              My money&apos;s in that office, right? If she start giving me some
              bullshit about it ain&apos;t there, and we got to go someplace
              else and get it, I&apos;m gonna shoot you in the head then and
              there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
              out where my goddamn money is. She gonna tell me too. Hey, look at
              me when I&apos;m talking to you, motherfucker. You listen: we go
              in there, and that ni**a Winston or anybody else is in there, you
              the first motherfucker to get shot. You understand?
            </p>
            <div className="flex space-x-2 items-center">
              <Button large text="Talk To Seller" />
              <button className="w-11 h-11 flex items-center justify-center rounded-lg shadow-sm hover:shadow-md group focus:ring-pink-500 focus:ring-2 focus:ring-offset-2 focus:outline-none">
                <svg
                  className="h-6 w-6 stroke-gray-300 group-hover:stroke-pink-500 group-active:fill-pink-500 transition"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="w-full h-48 bg-gray-400 rounded-lg" />
                <h3 className="font-semibold text-gray-700 -mb-1">
                  Galaxy S60
                </h3>
                <p className="text-sm font-medium text-gray-800">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
