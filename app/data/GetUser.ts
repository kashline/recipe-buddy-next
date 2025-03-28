// import User from "@/app/data/models/User";
// import sequelize from "@/app/data/connection";
// import { redirect } from "next/navigation";
// import { auth } from "@/auth";

// export default async function GetUser() {
//   const session = await auth()
//   const user = session?.user;
//   if (user !== undefined) {
//     await sequelize.sync();
//     const res = await User.findOrCreate({
//       where: {
//         email: user.email,
//       },
//       defaults: {
//         name: user.given_name,
//         lastName: user.family_name,
//         auth0Id: user.sub,
//       },
//     });
//   }
//   redirect("/");
// }
