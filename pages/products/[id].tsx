import { Button } from "@components/button";
import Layout from "@components/layout";
import { cls } from "@libs/client/functions/classnames";
import useMutation from "@libs/client/hooks/useMutation";
import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

interface IProductResponse {
  ok: boolean;
  product?: Product & {
    user: {
      id: number;
      name: string;
      avatar: string | null;
    };
  };
  isLiked: boolean;
  relatedProducts: Product[];
}

const ProductDetail: NextPage = () => {
  const router = useRouter();
  const { data, mutate } = useSWR<IProductResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const [toggleFavorite] = useMutation(
    `/api/products/${router.query.id}/favorite`
  );
  const onFavoriteClick = () => {
    toggleFavorite({});
    mutate((prev) => prev && { ...prev, isLiked: !prev.isLiked }, false);
  };

  return (
    <Layout title="아이템 1" isGoBack>
      <div className="px-4">
        <div className="flex flex-col">
          <div className="w-full h-96 bg-gray-400" />
          <div className="flex py-2 space-x-3 items-center border-b">
            <div className="w-12 h-12 bg-gray-400 rounded-full" />
            <div className="py-2">
              <p className="font-bold">{data?.product?.user.name}</p>
              <Link
                className="text-sm font-light"
                href={`/users/profiles/${data?.product?.user.id}`}
              >
                View profile &rarr;
              </Link>
            </div>
          </div>
          <div className="my-8">
            <h1 className="font-extrabold text-2xl">{data?.product?.name}</h1>
            <p className="font-light text-xl text-green-700">
              ${data?.product?.price}
            </p>
            <p className="my-2">{data?.product?.description}</p>
            <div className="flex space-x-2 items-center">
              <Button large text="Talk To Seller" />
              <button
                onClick={onFavoriteClick}
                className={cls(
                  "p-3 rounded-md flex items-center hover:bg-gray-100 justify-center group",
                  data?.isLiked
                    ? "text-pink-500 hover:text-pink-700"
                    : "text-gray-400 hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 group-hover:stroke-pink-500"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-6">Similar items</h2>
          <div className="grid grid-cols-2 gap-4">
            {data?.relatedProducts.map((relatedProduct, i) => (
              <div key={i}>
                <Link href={`/products/${relatedProduct.id}`}>
                  <div className="w-full h-48 bg-gray-400 rounded-lg" />
                  <h3 className="font-semibold text-gray-700 -mb-1">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-800">
                    ${relatedProduct.price}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
