
const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/Index.vue') },
            { path: '/categories/:category', component: () => import('pages/Items.vue')},
            { path: '/categories/:category/:subcategory', component: () => import('pages/Items.vue')},
            { path: '/item/:code', name:'item', component: () => import('pages/Item.vue')}
        ]
    },

    // Always leave this as last one,
    // but you can also remove it
    {
        path: '*',
        component: () => import('pages/Error404.vue')
    }
];

export default routes;
