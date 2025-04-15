import User from "@/app/data/models/User";
import UserRecipe from "@/app/data/models/UserRecipe";
import { auth } from "@/auth";
import { Profile } from "next-auth";

/**
 *
 * @param profile Profile
 * @returns Promise<Response>
 */
export default async function createUser(profile: Profile) {
  try {
    await User.sync();
    await UserRecipe.sync();
    const session = await auth();
    const user = session?.user;
    const res = await User.findOrCreate({
      where: {
        auth0Id: user?.email,
      },
      defaults: {
        firstName: user?.name || "",
        lastName: user?.id || "",
        auth0Id: user?.email || `${crypto.randomUUID()}`,
      },
    });
    return Response.json(
      { success: true, user: res[0].dataValues },
      { status: 200 },
    );
  } catch (error) {
    console.log(
      `There was an error during profile-server callback user creation: ${error}`,
    );
    return Response.json({ success: false }, { status: 500 });
  }
}
