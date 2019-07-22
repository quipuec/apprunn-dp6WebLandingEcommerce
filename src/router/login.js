const route = {
	path: '/login',
	name: 'login',
	meta: {
		title: 'Iniciar Sesión',
	},
	component: () => import('@/pages/page-login'),
};

export default route;
