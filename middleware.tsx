import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: {
  cookies: { get: (arg0: string) => any };
  url: string | URL | undefined;
}) {
  const jwt = request.cookies.get("token");

  if (!jwt) return NextResponse.redirect(new URL("/", request.url));

  // this condition avoid to show the login page if the user is logged in
  // if (jwt) {
  //   if (request.nextUrl.pathname.includes("/login")) {
  //     try {
  //       await jwtVerify(jwt, new TextEncoder().encode("secret"));
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     } catch (error) {
  //       return NextResponse.next();
  //     }
  //   }
  // }

  try {
    const { payload } = await jwtVerify(
      jwt,
      new TextEncoder().encode("Est3EsMISE3Dsecreto32s")
    );
    console.log({ payload });
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
