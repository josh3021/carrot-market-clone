import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  const {
    query: { id: strId },
    session: { user },
  } = req;

  if (!strId) return res.json({ ok: false });
  const id = +strId.toString();

  const isExist = await client?.interest.findFirst({
    where: {
      postId: id,
      userId: user?.id,
    },
    select: { id: true },
  });

  if (isExist) {
    // 궁금해요가 있을 땐, 삭제
    await client?.interest.delete({ where: { id: isExist.id } });
  } else {
    // 아닐 땐 궁금해요 추가
    await client?.interest.create({
      data: {
        user: { connect: { id: user?.id } },
        post: { connect: { id } },
      },
    });
  }

  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: [Method.POST], handler }));
