import { auth0 } from "../../../../lib/auth0";
import { getUserMetadata } from "./getUserMetadata";

export const GET = async (request: Request) => {
  try {
    const session = await auth0.getSession();
    if (!session) {
      return Response.json({
        success: false,
        message: "You must be logged in to access this endpoint",
        status: 401,
      });
    }
    const userMetadata = await getUserMetadata();
    return Response.json(
      { success: true, user: userMetadata[0].dataValues },
      { status: 200 }
    );
  } catch (error) {
    console.log(`There was an error gathering user metadata: ${error}`);
    return Response.json({ success: false }, { status: 500 });
  }
};
