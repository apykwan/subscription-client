export const isAuth = () => {
    if (localStorage.getItem('auth_subscriptions')) {
        return JSON.parse(localStorage.getItem('auth_subscriptions'));
    }
    return "";
}