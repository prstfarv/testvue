import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = "auth" | "redirect-root"
declare module 'nuxt/app' {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}