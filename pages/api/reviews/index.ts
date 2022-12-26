import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    session: { user },
    method,
  } = req;
  switch (method) {
    case Method.GET:
      const reviews = await client.review.findMany({
        where: {
          createdForId: user!.id,
        },
        include: {
          createdBy: {
            select: {
              id: true,
              avatar: true,
              name: true,
            },
          },
        },
      });
      res.json({ ok: true, reviews });
      break;
  }
}

export default withApiSession(withHandler({ methods: [Method.GET], handler }));
