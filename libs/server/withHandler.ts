import { NextApiRequest, NextApiResponse } from "next";

export interface IResponse {
  ok: boolean;
  [key: string]: any;
}

export enum Method {
  GET = "GET",
  HEAD = "HEAD",
  POST = "POST",
  PUT = "PUT",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface IWithHandlerConfig {
  methods: Method[];
  handler: (req: NextApiRequest, res: NextApiResponse) => void;
  isPrivate?: boolean;
}

export default function withHandler({
  handler,
  isPrivate = true,
  methods,
}: IWithHandlerConfig) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as Method))
      return res.status(405).end();
    if (isPrivate && !req.session.user)
      return res.status(401).json({ ok: false });

    try {
      handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}
