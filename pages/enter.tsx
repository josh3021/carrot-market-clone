import { FullButton } from "@components/button";
import Input from "@components/input";
import { cls } from "@libs/client/functions/classnames";
import useMutation from "@libs/client/hooks/useMutation";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

enum Method {
  Email = "Email",
  Phone = "Phone",
}

interface EnterForm {
  email?: string;
  phone?: string;
}

interface TokenForm {
  token: string;
}
interface IMutationResult {
  ok: boolean;
}

const Enter: NextPage = () => {
  const router = useRouter();
  const [enter, { loading, data, error }] =
    useMutation<IMutationResult>("/api/users/enter");
  const [confirmToken, { loading: tokenLoading, data: tokenData }] =
    useMutation<IMutationResult>("/api/users/confirm");
  const { register, watch, handleSubmit, reset } = useForm<EnterForm>();
  const { register: registerToken, handleSubmit: handleSubmitToken } =
    useForm<TokenForm>();
  const [method, setMethod] = useState<Method>(Method.Email);
  const onEmailClick = () => {
    reset();
    setMethod(Method.Email);
  };
  const onPhoneClick = () => {
    reset();
    setMethod(Method.Phone);
  };
  const onValid = async (validForm: EnterForm) => {
    // fetch("/api/users/enter", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    // if (loading) return;
    enter(validForm);
    console.log(loading, data, error);
  };
  const onTokenValid = (validForm: TokenForm) => {
    if (tokenLoading) return;
    confirmToken(validForm);
  };
  useEffect(() => {
    if (tokenData?.ok) {
      router.push("/");
    }
  }, [router, tokenData]);
  return (
    <div className="my-16 px-4">
      <h3 className="text-3xl text-center font-bold">Enter to Carrot</h3>
      <div className="mt-12">
        {data?.ok ? (
          <form
            onSubmit={handleSubmitToken(onTokenValid)}
            className="flex flex-col mt-8 space-y-4"
          >
            <Input
              register={registerToken("token")}
              name="token"
              label="6자리 인증번호"
              type="number"
              required
            />
            <FullButton text={tokenLoading ? "Loading..." : "토큰 인증하기"} />
          </form>
        ) : (
          <>
            <div className="flex flex-col items-center mb-6">
              <h5 className="text-center text-gray-500 text-sm font-medium">
                I will enter with...
              </h5>
              <div className="grid w-full mt-8 grid-cols-2">
                <button
                  className={cls(
                    "pb-2 font-medium border-b-2",
                    method === Method.Email
                      ? "border-b-2 border-fuchsia-700 text-fuchsia-700 transition ease-linear"
                      : ""
                  )}
                  onClick={onEmailClick}
                >
                  Email
                </button>
                <button
                  className={cls(
                    "pb-2 font-medium border-b-2",
                    method === Method.Phone
                      ? "border-b-2 border-fuchsia-700 text-fuchsia-700 transition ease-linear"
                      : ""
                  )}
                  onClick={onPhoneClick}
                >
                  Phone
                </button>
              </div>
            </div>
            <form
              onSubmit={handleSubmit(onValid)}
              className="flex flex-col mt-8 space-y-4"
            >
              {method === Method.Email ? (
                <Input
                  register={register("email")}
                  name="email"
                  label="Emaill Address"
                  type="email"
                  required
                />
              ) : null}
              {method === Method.Phone ? (
                <Input
                  register={register("phone")}
                  name="phone"
                  label="Phone Number"
                  type="tel"
                  required
                />
              ) : null}
              <button className="w-full py-2 bg-fuchsia-700 hover:bg-fuchsia-800 active:bg-fuchsia-900 rounded-md text-white shadow-md mt-4 border border-transparent text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-700 focus:outline-none">
                {method === Method.Email ? "Get login link" : null}
                {method === Method.Phone ? "Get one-time password" : null}
              </button>
            </form>
          </>
        )}
        <div className="mt-8">
          <div className="relative">
            <div className="absolute w-full border-t border-gray-300" />
            <div className="relative -top-3 text-center ">
              <span className="bg-white px-2 text-sm text-gray-500">
                Or enter with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 mt-2 gap-3">
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 focus:outline-none">
              <svg
                className="w-5 h-5 fill-blue-500 hover:fill-blue-600 active:fill-blue-700"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:border-gray-300 focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 focus:outline-none">
              <svg
                className="w-5 h-5 fill-gray-700 hover:fill-gray-800 active:fill-gray-900"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Enter;
