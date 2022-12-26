import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    query: { id: strId },
    session: { user },
    body: { answer: inputAnswer },
  } = req;

  if (!strId) return res.json({ ok: false });
  if (!user?.id) return res.json({ ok: false });
  const postId = +strId.toString();

  const answer = await client?.answer.create({
    data: {
      answer: inputAnswer,
      post: { connect: { id: postId } },
      user: { connect: { id: user.id } },
    },
    select: {
      answer: true,
      id: true,
      updatedAt: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  res.json({ ok: true, answer });
}

export default withApiSession(withHandler({ methods: [Method.POST], handler }));
