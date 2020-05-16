const route = {
	name: 'help-center',
	path: '/ayuda',
	redirect: { name: 'help-base' },
	component: () => import('@/pages/page-help-center'),
	children: [
		{
			name: 'help-base',
			path: ':help',
			redirect: { name: 'informacion-content' },
			component: () => import('@/components/help/help-base'),
			children: [
				{
					name: 'help-content',
					path: ':slug',
					component: () => import('@/components/help/help-content'),
				},
			],
		},
	],
};

export default route;
