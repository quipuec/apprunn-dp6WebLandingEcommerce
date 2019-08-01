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
	],
};

export default route;
