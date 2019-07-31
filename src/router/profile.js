const route = {
	path: 'perfil',
	name: 'profile',
	redirect: '/perfil/mis-datos',
	component: () => import('@/pages/page-profile'),
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
					component: () => import('@/components/profile/edit-user-data'),
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
			component: () => import('@/components/profile/user-orders'),
		},
		{
			path: 'detalle-orden/:n',
			name: 'order-detail',
			component: () => import('@/components/profile/user-order-details'),
		},
		{
			path: 'mis-favoritos',
			name: 'favorites',
			component: () => import('@/components/profile/favorites'),
		},
	],
};

export default route;
