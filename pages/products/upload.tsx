import { Button } from "@components/button";
import Input from "@components/input";
import Layout from "@components/layout";
import TextArea from "@components/textarea";
import useMutation from "@libs/client/hooks/useMutation";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IUploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface IUploadProductMutation {
  ok: boolean;
  product: Product;
}

const Upload: NextPage = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<IUploadProductForm>();
  const [uploadProduct, { loading, data }] =
    useMutation<IUploadProductMutation>("/api/products");
  const onValid = (data: IUploadProductForm) => {
    if (loading) return;
    uploadProduct(data);
  };
  useEffect(() => {
    if (data?.ok) {
      router.push(`/products/${data.product.id}`);
    }
  }, [data, router]);
  return (
    <Layout title="내 아이템 업로드" isGoBack>
      <form className="px-4 py-16 space-y-2" onSubmit={handleSubmit(onValid)}>
        <div>
          <label className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-48 rounded-md text-gray-600 hover:text-fuchsia-700 hover:border-fuchsia-700 cursor-pointer">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input type="file" className="hidden" />
          </label>
        </div>
        <Input
          register={register("name")}
          label="Name"
          name="name"
          type="text"
          required
        />
        <Input
          register={register("price", {
            valueAsNumber: true,
            required: true,
            validate: (value) => value >= 0,
          })}
          required
          label="Price"
          placeholder="0.00"
          name="price"
          type="text"
          kind="price"
        />
        <TextArea
          register={register("description")}
          name="description"
          label="Description"
          required
        />
        <Button text={loading ? "Loading..." : "Upload item"} />
      </form>
    </Layout>
  );
};

export default Upload;
