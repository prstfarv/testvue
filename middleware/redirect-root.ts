export default defineNuxtRouteMiddleware((to) => {
    const user = useSupabaseUser()

    if(to.path==='/'){
        if(user){
            return navigateTo('/dashboard')
        } else {
            return navigateTo('/login')
        }
    }
})