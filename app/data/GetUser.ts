import User from "@/app/data/models/User";
import sequelize from "@/app/data/connection";
import { redirect } from "next/navigation";
import { auth0 } from "@/lib/auth0";

export default async function GetUser() {
  const session = await auth0.getSession();
  const user = session?.user;
  if (user !== undefined) {
    await sequelize.sync();
    const res = await User.findOrCreate({
      where: {
        auth0Id: user.sub,
      },
      defaults: {
        firstName: user.given_name,
        lastName: user.family_name,
        auth0Id: user.sub,
      },
    });
  }
  redirect("/");
}
