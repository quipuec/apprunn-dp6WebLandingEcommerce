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
	],
};

export default route;
