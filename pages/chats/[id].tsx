import Layout from "@components/layout";
import Message from "@components/message";
import type { NextPage } from "next";

const ChatDetail: NextPage = () => {
  return (
    <Layout title="Steve님과의 채팅방" isGoBack>
      <div className="py-10 px-4 space-y-4">
        <Message message="얼마 생각하시나요?" />
        <Message message="4억 어떤한가유" reversed />
        <Message message="오옹! 나이스~" />
        <div className="fixed w-full mx-auto max-w-md bottom-0 inset-x-0 px-2">
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

export default ChatDetail;
