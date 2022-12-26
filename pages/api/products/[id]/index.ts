import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    query: { id },
    session: { user },
  } = req;
  if (!id) return res.status(400).end();
  const product = await client.product.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  const isLiked = Boolean(
    await client.favorite.findFirst({
      where: {
        productId: product?.id,
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );
  res.json({ ok: true, product, isLiked, relatedProducts });
}

export default withApiSession(withHandler({ methods: [Method.GET], handler }));
