import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  });
  res.json({ ok: true, profile });
}

export default withApiSession(withHandler({ methods: [Method.GET], handler }));
