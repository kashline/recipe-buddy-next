import { NextResponse, type NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
//   const authRes = await auth0.middleware(request)
//   // if (request.nextUrl.pathname.startsWith("/auth")) {
//   //   return authRes
//   // }

//   // // const { origin } = new URL(request.url)
//   // // const session = await auth0.getSession()

//   // // // user does not have a session — redirect to login
//   // // if (!session) {
//   // //   return NextResponse.redirect(`${origin}/auth/login`)
//   // // }
//   return authRes
// }
export { auth as middleware } from "@/auth"
export const config = {
  matcher: [
    "/recipes/:path/edit",
    "/create",
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
