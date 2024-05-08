// import { clerkMiddleware } from "@clerk/nextjs/server"
import { authMiddleware } from "@clerk/nextjs/server"

// export default clerkMiddleware()

// export the public routes
export default authMiddleware({
  publicRoutes: ["/", "/api/webhooks/clerk", "/api/webhooks/stripe"],
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
