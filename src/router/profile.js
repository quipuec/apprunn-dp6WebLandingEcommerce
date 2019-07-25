const route = {
	path: 'perfil',
	name: 'profile',
	redirect: '/perfil/mis-datos',
	component: () => import('@/pages/page-profile'),
	children: [
		{
			path: 'mis-datos',
			name: 'user-data',
			component: () => import('@/components/profile/user-data'),
		},
		{
			path: 'editar-mis-datos',
			name: 'edit-user-data',
			component: () => import('@/components/profile/edit-user-data'),
		},
	],
};

export default route;
