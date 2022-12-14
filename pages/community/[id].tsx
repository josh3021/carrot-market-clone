import { FullButton } from "@components/button";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import { cls } from "@libs/client/functions/classnames";
import useMutation from "@libs/client/hooks/useMutation";
import { Answer, Post, User } from "@prisma/client";
import moment from "moment";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface IAnswerWithUser extends Answer {
  user: User;
}

interface IPostWithUser extends Post {
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  _count: {
    answers: number;
    interests: number;
  };
  answers: IAnswerWithUser[];
}

interface IPostResponse {
  ok: boolean;
  post: IPostWithUser | null;
  isInteresting: boolean;
}

interface IAnswerForm {
  answer: string;
}

interface IAnswerReponse {
  ok: boolean;
  answer: IAnswerWithUser;
}

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<IAnswerForm>();
  const {
    query: { id },
  } = router;
  const {
    data: postData,
    error,
    mutate,
  } = useSWR<IPostResponse>(id ? `/api/posts/${id}` : null);
  const [interest, { loading: interestLoading }] = useMutation(
    `/api/posts/${id}/interest`
  );
  const [answer, { loading: answerLoading, data: answerData }] =
    useMutation<IAnswerReponse>(`/api/posts/${id}/answer`);
  const handleInterestClick = () => {
    if (!postData || !postData.post) return;
    mutate(
      {
        ...postData,
        post: {
          ...postData.post,
          _count: {
            ...postData.post?._count,
            interests: postData.isInteresting
              ? postData.post._count.interests - 1
              : postData.post._count.interests + 1,
          },
        },
        isInteresting: !postData.isInteresting,
      },
      false
    );
    if (interestLoading) return;
    interest({});
  };
  const onValid = (answerFormData: IAnswerForm) => {
    if (answerLoading) return;
    answer(answerFormData);
  };
  useEffect(() => {
    if (answerData && answerData.ok) {
      reset({ answer: "" });
      mutate();
    }
  }, [answerData, mutate, reset]);

  if (!postData && !error) {
    return (
      <Layout title="??????" isGoBack>
        Loading...
      </Layout>
    );
  }
  if (!postData?.post) {
    return (
      <Layout title="??????" isGoBack>
        <div className="w-full text-center mt-32">
          <span className="font-bold">Oops.. ????????? ???????????? ?????????</span>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="??????" isGoBack>
      <span className="inline-flex my-3 ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        ????????????
      </span>
      <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-slate-300">
          {postData.post.user.avatar && (
            <Image
              src={postData.post.user.avatar}
              alt={postData.post.user.name}
              width={40}
              height={40}
              className="rounded-full border border-fuchsia-700"
            />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">
            {postData.post.user.name}
          </p>
          <Link
            className="text-xs font-medium text-gray-500"
            href={`/users/profiles/${postData.post.user.id}`}
          >
            View profile &rarr;
          </Link>
        </div>
      </div>
      <div>
        <div className="mt-2 px-4 text-gray-700">
          <span className="text-fuchsia-700 font-medium">Q.</span>{" "}
          {postData.post.question}
        </div>
        <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
          <button
            onClick={handleInterestClick}
            className={cls(
              "flex space-x-2 items-center text-sm cursor-pointer",
              postData.isInteresting
                ? "text-green-600 hover:text-green-800"
                : "hover:text-gray-400"
            )}
          >
            <svg
              className="w-4 h-4"
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
            <span>???????????? {postData.post._count.interests}</span>
          </button>
          <span className="flex space-x-2 items-center text-sm">
            <svg
              className="w-4 h-4"
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
            <span>?????? {postData.post._count.answers}</span>
          </span>
        </div>
      </div>
      <div className="px-4 my-5 space-y-5">
        {postData.post.answers.map((answer) => (
          <div className="flex items-start space-x-3" key={answer.id}>
            <div className="w-8 h-8 bg-slate-200 rounded-full">
              {answer.user.avatar && (
                <Image
                  src={answer.user.avatar}
                  alt={answer.user.name}
                  width={40}
                  height={40}
                  className="rounded-full border border-fuchsia-700"
                />
              )}
            </div>
            <div>
              <span className="text-sm block font-medium text-gray-700">
                {answer.user.name}
              </span>
              <span className="text-xs text-gray-500 block ">
                {moment(answer.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
              </span>
              <p className="text-gray-700 mt-2">{answer.answer}</p>
            </div>
          </div>
        ))}
      </div>
      <form className="px-4 space-y-2" onSubmit={handleSubmit(onValid)}>
        <TextArea
          register={register("answer", { required: true, minLength: 1 })}
          placeholder="Answer this Question!"
        />
        <FullButton text={answerLoading ? "Loading..." : "Reply"} />
      </form>
    </Layout>
  );
};

export default CommunityPostDetail;
