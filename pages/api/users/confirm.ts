import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const { token } = req.body;
  const foundToken = await client.token.findUnique({
    where: { payload: token },
    include: { user: true },
  });
  if (!foundToken) return res.status(404).end();
  req.session.user = {
    id: foundToken.userId,
  };
  await req.session.save();
  await client.token.deleteMany({ where: { userId: foundToken.userId } });
  // await client.user.findUnique
  res.json({ ok: true });
}

export default withApiSession(
  withHandler({ methods: [Method.POST], handler, isPrivate: false })
);
