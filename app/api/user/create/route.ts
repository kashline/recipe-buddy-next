import User from "@/app/data/models/User";
import UserRecipe from "@/app/data/models/UserRecipe";

export const POST = async (request: Request) => {
  try {
    await User.sync();
    await UserRecipe.sync();
    const user = await request.json();
    const res = await User.findOrCreate({
      where: {
        sub: user.sub,
      },
      defaults: {
        name: user.name || "",
        email: user.email || "",
        image: user.picture || `${crypto.randomUUID()}`,
        emailVerified: user.email_verified,
        sub: user.sub,
      },
    });
    return Response.json(
      { success: true, user: res[0].dataValues },
      { status: 200 },
    );
  } catch (error) {
    console.log(
      `There was an error during callback user creation: ${error}`,
    );
    return Response.json({ success: false }, { status: 500 });
  }
};
