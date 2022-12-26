import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Kind } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    session: { user },
    query: { kind },
  } = req;

  // if (
  //   !(typeof kind === "string") ||
  //   !Object.values(Kind).includes(kind as Kind)
  // )
  //   return res.json({ ok: false });

  // const products = await client.record.findMany({
  //   where: {
  //     id: user!.id,
  //     kind: kind as Kind,
  //   },
  // });

  switch (kind) {
    case Kind.Favorite:
    case Kind.Purchase:
    case Kind.Sold:
      const products = await client.record.findMany({
        where: {
          id: user!.id,
          kind,
        },
      });
      res.json({ ok: true, products });
      break;
    default:
      res.json({ ok: false });
  }
}

export default withApiSession(withHandler({ methods: [Method.GET], handler }));
