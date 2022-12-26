import client from "@libs/server/prisma/client";
import withHandler, { IResponse, Method } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import mail from "@sendgrid/mail";
import { NextApiRequest, NextApiResponse } from "next";
import twilio from "twilio";

mail.setApiKey(process.env.SENDGRID_API_KEY!);

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000) + "";
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: user,
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });
  if (phone) {
    // const message = await twilioClient.messages.create({
    //   messagingServiceSid: process.env.TWILIO_MESSAGING_SID,
    //   to: process.env.PHONE_NUMBER!,
    //   body: `Your login token is ${payload}`,
    // });
    // console.log(message);
  } else if (email) {
    // const email = await mail.send({
    //   from: "joseonghwan3021@gmail.com",
    //   to: "joseonghwan3021@gmail.com",
    //   subject: "Your Carrot Market Verification Email",
    //   text: `Your token is ${payload}`,
    //   html: `<strong>Your token is ${payload}</strong>`,
    // });
    // console.log(email);
  }
  return res.json({ ok: true });
};

export default withApiSession(
  withHandler({ methods: [Method.POST], handler, isPrivate: false })
);
