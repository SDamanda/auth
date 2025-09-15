import { NextResponse, NextRequest } from "next/server";

const publicrouter = [
        { path: "/cadastro", whenAuthenticated: "redirect" },
        { path: "/login", whenAuthenticated: "redirect" },
    ];

const redirectIfNotAuthenticated = "/cadastro";

export function middleware(NextRequest) {
    const { pathname } = request.nextUrl;

    const foundRoute = publicrouter
        .find(route => route.path === pathname);server

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
        url.pathname = "/cadastro"; // redireciona ao dashboard
        return NextResponse.redirect(url);
    }

    // Usuário autenticado e rota privada - deixa acessar
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico, sitemap.xml, robots.txt (metadata files)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
}
