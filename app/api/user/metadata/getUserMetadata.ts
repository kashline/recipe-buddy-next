import User from "@/app/data/models/User";
import { Session } from "@auth0/nextjs-auth0";

export async function getUserMetadata(session?: Session) {
  const userMetadata = await User.findAll({
    where: {
      auth0Id: session?.user.sub,
    },
  });
  return userMetadata;
}
