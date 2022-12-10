import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from "jose";



export async function middleware(request: NextRequest ) {
  const jwt = request.cookies.get('token');


  // const cookie = request.cookies.get('token')?.value
  //console.log(jwt)


  if (!jwt) return NextResponse.redirect(new URL("/", request.url));
  //if (jwt) return NextResponse.redirect(new URL("/admin", request.url));
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
      new TextEncoder().encode(`${process.env.JWT_SECRET_SEED}`)
    );
    
   // request. =payload.id
   // console.log( payload.id );
    //return NextResponse.next();
    // const response = NextResponse.next()
    // response.cookies.set('token',payload)

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/", request.url));
  }


}

export const config = {
  matcher: ["/admin/:path*"],
};
