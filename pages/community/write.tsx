import { Button } from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useCoords from "@libs/client/hooks/useCoords";
import useMutation from "@libs/client/hooks/useMutation";
import { Post } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IWriteForm {
  question: string;
}

interface IWriteResponse {
  ok: boolean;
  post: Post;
}

const Write: NextPage = () => {
  const router = useRouter();
  const { latitude, longitude } = useCoords();
  const [post, { loading, data }] = useMutation<IWriteResponse>("/api/posts");
  const { register, handleSubmit } = useForm<IWriteForm>();
  const onValid = (data: IWriteForm) => {
    if (loading) return;
    post({ ...data, latitude, longitude });
  };
  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="새 피드" isGoBack>
      <form className="px-4 py-10" onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register("question", { required: true, minLength: 5 })}
          placeholder="피드를 적어주세요."
          label="새 피드는 언제나 환영이에요!"
        />
        <Button text={loading ? "로딩 중..." : "업로드"} />
      </form>
    </Layout>
  );
};

export default Write;
