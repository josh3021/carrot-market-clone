import type { NextPage } from "next";
import { Button } from "../../components/button";
import Layout from "../../components/layout";
import TextArea from "../../components/textarea";

const Write: NextPage = () => {
  return (
    <Layout title="새 피드" isGoBack>
      <form className="px-4 py-10">
        <TextArea
          placeholder="Ask Any Question!"
          label="새 피드는 언제나 환영이에요!"
        />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
