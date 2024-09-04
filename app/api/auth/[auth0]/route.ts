import User from "@/app/data/models/User";
import { handleAuth, handleLogin } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";

export const GET = handleAuth({
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      const headersList = headers();
      // console.log(headersList.get("referer"));
      return await handleLogin(req, res, {
        returnTo: `/api/profile-server?referer=${headersList.get("referer")}`!,
      });
    } catch (e: any) {
      console.log(`Error in auth login: ${e}`);
      res.status(e.status || 500).end();
    }
  },
  signup: handleLogin({
    authorizationParams: {
      screen_hint: "signup",
    },
    returnTo: "/profile",
  }),
});

async function createUpdateUser(user: User) {}
