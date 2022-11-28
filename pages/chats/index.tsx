import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" isTabBar>
      <div className="divide-y-[1px] ">
        {Array.from({ length: 12 }).map((_, i) => (
          <Link
            key={i}
            className="flex px-4 py-3 items-center space-x-3"
            href="/chats/1"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm  text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
