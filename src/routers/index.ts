import AuthService from '@/services/authService';
import { useStore } from '@/store';
import { defineAsyncComponent } from 'vue';
import { createRouter, createWebHistory, useRouter } from 'vue-router'


const router = createRouter({
    history: createWebHistory(),
    routes: [

        {
            path: '/',
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: '',
                    name: "index",
                    component: defineAsyncComponent(() => import('@/pages/Index.vue'))
                },
                {
                    path: 'boosts',
                    name: "boosts",
                    component: defineAsyncComponent(() => import('@/pages/Boosts.vue'))
                },
                {
                    path: 'leaderboard',
                    name: "leaderboard",
                    component: defineAsyncComponent(() => import('@/pages/Leaderboard.vue'))
                },
                {
                    path: 'wallet',
                    name: "wallet",
                    component: defineAsyncComponent(() => import('@/pages/Wallet.vue'))
                },
                {
                    path: 'profile',
                    name: "profile",
                    component: defineAsyncComponent(() => import('@/pages/Profile.vue'))
                },
                {
                    path: 'earn',
                    name: "earn",
                    component: defineAsyncComponent(() => import('@/pages/Earn.vue'))
                },
                {
                    path: 'mission',
                    name: "mission",
                    component: defineAsyncComponent(() => import('@/pages/Mission.vue'))
                },

                {
                    path: 'mission-history',
                    name: "mission_history",
                    component: defineAsyncComponent(() => import('@/pages/MissionHistory.vue'))
                },
            ]

        },
        {
            path: '/exception',
            meta: {
                hideFooter: true,
                requiresAuth: false,
            },
            children: [
                {
                    path: ':status',
                    name: "exception",
                    component: defineAsyncComponent(() => import('@/pages/Exception.vue'))
                },

            ]
        },

        { path: '/:pathMatch(.*)*', name: 'NotFound', component: defineAsyncComponent(() => import('@/pages/Exception.vue')) },

    ]
})


router.beforeEach((to: any, from: any, next: any) => {
    const store = useStore();
    const route = useRouter();
    const auth = new AuthService();

    const platform = (window as any).Telegram.WebApp.platform;
    const initData = (window as any).Telegram.WebApp.initData;

    const { path, name, meta, component } = to;
    if (path === from.path && name === "index")
        store.commit("updateSiteLoading", true);
    else store.commit("updatePageLoading", true);

    if (name === "index")
        (window as any).Telegram.WebApp.BackButton.isVisible = false;
    else {
        (window as any).Telegram.WebApp.BackButton.isVisible = true;
        (window as any).Telegram.WebApp.BackButton.onClick(() => route.back())
    }

    if (meta.requiresAuth && ["android", "ios"].includes(platform.toLowerCase()) == false) {
        return router.push({ name: 'exception', params: { status: 0 } });
    }
    if (path === from.path && name === "index" || meta.requiresAuth && !auth.IsAuthentication()) {
        localStorage.setItem('token', "");

        return auth.SignIn(initData)
            .then(result => {
                store.commit("updateUser", result?.user);
                store.commit("updatePuzzle", result?.puzzle);
                store.commit("updateLevels", result?.levels);
                store.commit("updateLeagues", result?.leagues);
                store.commit("updateMissions", result?.missions);
                store.commit("updateCurrentDate", result?.currentDate);
                store.commit("updateReferralLink", result?.referralLink);

                localStorage.setItem('token', result?.accessToken ?? "");

                return next()
            })
            .catch(except => next({ name: 'exception', params: { status: 401 } }));
    }

    return next()

});
router.afterEach(() => {
    const store = useStore();

    setTimeout(() => store.commit("updateSiteLoading", false), 1000);
    setTimeout(() => store.commit("updatePageLoading", false), 1000);

    (window as any).Telegram.WebApp.expand();
});

export default router