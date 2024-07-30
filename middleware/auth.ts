export default defineNuxtRouteMiddleware(async(to, from) => {
  if (process.client) {
    const user = localStorage.getItem('user');

    if (!user && to.path !== '/login') {
      return navigateTo('/login');
    }
  }
})
