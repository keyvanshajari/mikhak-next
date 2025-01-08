import { NextResponse, NextRequest } from "next/server";
import { cookies } from "next/headers";
import { USER_COOKIE_NAME } from "./common/utils/cookie-manager";
import Routes from "./common/constants/routes";

export default async function middleware(req: NextRequest) {
  const response = NextResponse.next();

  const { pathname } = req.nextUrl;
  const cleanPathName = pathname.split("?")[0];
  if (cleanPathName.startsWith("/_next")) {
    return response;
  }

  if (staticPages.some((ext) => cleanPathName.startsWith(ext))) {
    return response;
  }

  if (staticFileExtensions.some((ext) => cleanPathName.endsWith(ext))) {
    return response;
  }

  const cookie = await cookies();
  const user = await cookie.get(USER_COOKIE_NAME)?.value;
  const hasUser = user != null;

  if (authRoute.some((ext) => cleanPathName.startsWith(ext))) {
    if (hasUser) {
      return NextResponse.redirect(new URL(Routes.rootPage, req.url));
    } else {
      return response;
    }
  }

  if (user) {
    return response;
  }

  return NextResponse.redirect(new URL(Routes.loginPage, req.url));
}

const staticPages = ["/static"];
const authRoute = ["/login", "/register", "/verfication"];
const staticFileExtensions = [".css", ".ico", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".woff"];
