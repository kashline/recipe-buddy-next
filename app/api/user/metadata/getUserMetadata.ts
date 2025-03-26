import User from "@/app/data/models/User";

export async function getUserMetadata(session?: any) {
  const userMetadata = await User.findAll({
    where: {
      auth0Id: session?.user.sub,
    },
  });
  return userMetadata;
}
