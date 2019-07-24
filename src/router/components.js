const route = {
	path: '/components',
	name: 'components',
	meta: {
		title: 'Componentes',
	},
	component: () => import('@/pages/page-components'),
};

export default route;
