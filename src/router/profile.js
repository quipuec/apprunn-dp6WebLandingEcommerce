const route = {
	path: '/perfil',
	name: 'profile',
	component: () => import(/* webpackChunkName: "profile" */ '@/pages/page-profile'),
	beforeEnter: (to, from, next) => {
		if (to.fullPath.includes('perfil') && localStorage.getItem('ecommerce::token')) {
			next();
		} else {
			next({ name: 'page-home' });
		}
	},
	redirect: '/perfil/mis-datos',
	children: [
		{
			path: 'mis-datos',
			name: 'user-data',
			redirect: '/perfil/mis-datos/detalle',
			component: () => import('@/components/profile/user-data'),
			children: [
				{
					path: 'editar',
					name: 'edit-user-data',
					component: () => import(/* webpackChunkName: "editUserData" */ '@/components/profile/edit-user-data'),
				},
				{
					path: 'detalle',
					name: 'user-data-details',
					component: () => import('@/components/profile/user-data-details'),
				},
			],
		},
		{
			path: 'mis-ordenes',
			name: 'user-orders',
			component: () => import(/* webpackChunkName: "orders" */ '@/components/profile/user-orders'),
		},
		{
			path: 'detalle-orden/:id',
			name: 'order-detail',
			component: () => import(/* webpackChunkName: "user-order-details" */ '@/components/profile/user-order-details'),
		},
		{
			path: 'mis-favoritos',
			name: 'favorites',
			component: () => import(/* webpackChunkName: "favorites" */ '@/components/profile/favorites'),
		},
		{
			path: 'mis-direcciones',
			name: 'address',
			component: () => import(/* webpackChunkName: "address" */ '@/components/profile/address-data'),
		},
	],
};

export default route;
