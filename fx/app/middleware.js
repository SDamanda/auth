import { NextResponse, NextRequest } from "next/server";

const publicrouter = [
    { path: "/cadastro", whenAuthenticated: "redirect" },
    { path: "/login", whenAuthenticated: "redirect" },
];

const redirectIfNotAuthenticated = "/site";

export function middleware(request) {
    const { pathname } = request.nextUrl;

    const foundRoute = publicrouter
        .find(route => route.path === pathname);

    const token = request.cookies.get("token")?.value;

    if (foundRoute && !token) {
        return NextResponse.next();
    }

    if (!foundRoute && !token) {
        const url = request.nextUrl.clone();
        url.pathname = redirectIfNotAuthenticated;
        return NextResponse.redirect(url);
    }

    if (foundRoute && token && foundRoute.whenAuthenticated === "redirect") {
        const url = request.nextUrl.clone();
        url.pathname = "/privadas/site";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/cadastro', '/login', '/privadas/:path*'],
}