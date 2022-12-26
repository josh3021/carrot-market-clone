import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  switch (req.method) {
    case Method.GET:
      const products = await client.product.findMany({
        include: { _count: { select: { favorites: true } } },
      });
      res.json({ ok: true, products });
      break;
    case Method.POST:
      const {
        session: { user },
        body: { name, price, description },
      } = req;
      const product = await client.product.create({
        data: {
          name,
          price: +price,
          description,
          image: "xx",
          user: { connect: { id: user?.id } },
        },
      });
      res.json({ ok: true, product });
      break;
  }
}

export default withApiSession(
  withHandler({ methods: [Method.GET, Method.POST], handler })
);
