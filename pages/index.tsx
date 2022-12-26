import Layout from "@components/layout";
import { Product as ProductComponent } from "@components/product";
import useUser from "@libs/client/hooks/useUser";
import { Product } from "@prisma/client";
// import { Product } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import useSWR from "swr";
import { FloatingButton } from "../components/button";

interface ProductWithCount extends Product {
  _count: {
    favorites: number;
  };
}

interface IProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const user = useUser();
  const { data } = useSWR<IProductsResponse>("/api/products");
  return (
    <Layout title="Home" isTabBar>
      <Head>
        <title>홈</title>
      </Head>
      <div className="flex flex-col space-y-5">
        {data?.products?.map((product) => (
          <ProductComponent
            id={product.id}
            title={product.name}
            category={"Matt Black"}
            price={product.price}
            comments={199}
            hearts={product._count.favorites}
            key={product.id}
          />
        ))}
        <FloatingButton href="/products/upload">
          <svg
            className="w-6 h-6"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
