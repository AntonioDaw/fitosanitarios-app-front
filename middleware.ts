import { auth } from "./auth";


export default auth((req) => {
  const { pathname, origin } = req.nextUrl;
  const session = req.auth;

  if (!session && pathname !== "/login" && pathname !== "/") {
    const newUrl = new URL("/login", origin);
    return Response.redirect(newUrl);
  }

  if (session && (pathname === "/" || pathname === "/login")) {
    const newUrl = new URL("/dashboard", origin);
    return Response.redirect(newUrl);
  }

  if (pathname.startsWith("/dashboard/tratamientos") && session?.user.role !== "admin") {
    const newUrl = new URL("/nopermitido", origin);
    return Response.redirect(newUrl);
  }
   if (pathname.startsWith("/dashboard/parcelas") && session?.user.role !== "admin") {
    const newUrl = new URL("/nopermitido", origin);
    return Response.redirect(newUrl);
  }
  if (pathname.startsWith("/dashboard/cultivos") && session?.user.role !== "admin") {
    const newUrl = new URL("/nopermitido", origin);
    return Response.redirect(newUrl);
  }

  if (pathname.startsWith("/dashboard/inventario") && session?.user.role !== "admin") {
    const newUrl = new URL("/nopermitido", origin);
    return Response.redirect(newUrl);
  }
  if (pathname.startsWith("/dashboard/productos") && session?.user.role !== "admin") {
    const newUrl = new URL("/nopermitido", origin);
    return Response.redirect(newUrl);
  }
  
});



export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|.*\\..*).*)",
    ],
};