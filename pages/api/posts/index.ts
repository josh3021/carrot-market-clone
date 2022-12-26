import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(req: NextApiRequest, res: NextApiResponse<IResponse>) {
  switch (req.method) {
    case Method.GET:
      const {
        query: {
          latitude: strLatitude = 37.401832,
          longitude: strLongitude = 126.990783,
        },
      } = req;
      const currentLatitude = parseFloat(strLatitude.toString());
      const currentLongitude = parseFloat(strLongitude.toString());
      const posts = await client.post.findMany({
        where: {
          latitude: {
            gte: currentLatitude - 0.01,
            lte: currentLatitude + 0.01,
          },
          longitude: {
            gte: currentLongitude - 0.01,
            lte: currentLongitude + 0.01,
          },
        },
        select: {
          id: true,
          question: true,
          updatedAt: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          _count: {
            select: {
              answers: true,
              interests: true,
            },
          },
        },
      });
      res.json({ ok: true, posts });
      break;
    case Method.POST:
      const {
        body: { question, latitude, longitude },
        session: { user },
      } = req;
      const post = await client.post.create({
        data: {
          question,
          latitude,
          longitude,
          user: { connect: { id: user?.id } },
        },
      });
      res.json({ ok: true, post });
      break;
  }
}

export default withApiSession(
  withHandler({ methods: [Method.GET, Method.POST], handler })
);
