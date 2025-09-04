import { NextResponse, NextRequest } from "next/server";

const rotaspublicas = [
    { path: "/cadastro", whenAuthenticated: "redirect" },
    { path: "/register", whenAuthenticated: "redirect" },
    { path: "/pricing", whenAuthenticated: "next" } // pública para todos
];

const redirectIfNotAuthenticated = "/sign-in";

export function middleware(NextRequest) {
    const { pathname } = request.nextUrl;

    // Verifica se a rota é pública
    const foundRoute = rotaspublicas.find(route => route.path === pathname);

    // Pega o token do cookie (aqui só checa existência, não valida)
    const token = request.cookies.get("token")?.value;

    // Se rota pública e usuário não autenticado, deixa acessar
    if (foundRoute && !token) {
        return NextResponse.next();
    }

    // Se rota privada (não está em rotaspublicas) e usuário não autenticado, redireciona para login
    if (!foundRoute && !token) {
        const url = request.nextUrl.clone();
        url.pathname = redirectIfNotAuthenticated;
        return NextResponse.redirect(url);
    }

    // Se rota pública e o usuário está autenticado e a rota pede redirecionar
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
