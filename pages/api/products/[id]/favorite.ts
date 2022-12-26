import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    query: { id: strId },
    session: { user },
  } = req;
  if (!strId || !user) return res.status(400).end();
  const id = +strId;
  const existingFavorite = await client.favorite.findFirst({
    where: {
      productId: id,
      userId: user.id,
    },
  });

  if (existingFavorite) {
    // 좋아요 삭제
    await client.favorite.delete({
      where: {
        id: existingFavorite.id,
      },
    });
  } else {
    // 좋아요
    await client.favorite.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        product: {
          connect: {
            id,
          },
        },
      },
    });
  }

  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: [Method.POST], handler }));
