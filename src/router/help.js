const route = {
	name: 'help-center',
	path: '/ayuda',
	component: () => import('@/pages/page-help-center'),
	children: [
		{
			name: 'help-base',
			path: ':help',
			component: () => import('@/components/help/help-base'),
			children: [
				{
					name: 'informacion-content',
					path: ':slug',
					component: () => import('@/components/help/help-content'),
				},
			],
		},
	],
};

export default route;
