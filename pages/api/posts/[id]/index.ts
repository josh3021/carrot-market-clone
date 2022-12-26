import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    query: { id },
    session: { user },
  } = req;
  const post = id
    ? await client.post.findUnique({
        where: { id: +id },
        include: {
          user: {
            select: { id: true, name: true, avatar: true },
          },
          _count: {
            select: { answers: true, interests: true },
          },
          answers: {
            select: {
              id: true,
              answer: true,
              updatedAt: true,
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
      })
    : null;
  const isInteresting = Boolean(
    await client.interest.findFirst({
      where: { postId: post?.id, userId: user?.id },
      select: { id: true },
    })
  );
  res.json({ ok: true, post, isInteresting });
}

export default withApiSession(withHandler({ methods: [Method.GET], handler }));
