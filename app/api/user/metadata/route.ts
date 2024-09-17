import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { getUserMetadata } from "./getUserMetadata";

export const GET = withApiAuthRequired(async (request: Request) => {
  try {
    const userMetadata = await getUserMetadata();
    return Response.json(
      { success: true, user: userMetadata[0].dataValues },
      { status: 200 },
    );
  } catch (error) {
    console.log(`There was an error gathering user metadata: ${error}`);
    return Response.json({ success: false }, { status: 500 });
  }
});
