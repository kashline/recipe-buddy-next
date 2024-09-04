import User from "@/app/data/models/User";
import { getSession } from "@auth0/nextjs-auth0";

export async function getUserMetadata() {
    const user = await getSession();
    const userMetadata = await User.findAll({
      where: {
        auth0Id: user?.user.sub,
      },
    });
    return userMetadata;
  }
