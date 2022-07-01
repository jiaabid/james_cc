export const routes = [
    { path: '/', name: "Splash", component: require('./splash/splash').default },
    {
        path: "/login",
        name: "Login",
        component: require("./login/login").default,
    },
    {
        path: "/dashboard",
        redirect: "/main-dashboard",
        component: require("./dashboard/dashboard").default,
        children: [
            {
                path: "/main-dashboard",
                name: "main-dashboard",
                component:
                    require("./dashboard/pages/home-page/HomePageComponent")
                        .default,
            },
        ],
    },
    // { path: '/sign-in', component: require('./dashboard/pages/signin-page/SignInPageComponent').default, beforeEnter: inverseAuthGuard },
    // { path: '/profile', component: require('./dashboard/pages/profile-page/ProfilePageComponent').default, beforeEnter: authGuard },
    // { path: '/sellers-page', component: require('./dashboard/pages/sellers-page/SellersPage').default },
    // { path: '/subscription-plan', component: require('./dashboard/pages/subscription-plan/SubscriptionPlanComponent').default },
    // { path: '/service-provider', component: require('./dashboard/pages/serviceprovider-page/ServiceProviderPageComponent').default }
];
