const route = {
	path: '/login/:tokenValidate?',
	name: 'login',
	props: true,
	component: () => import('@/pages/page-login'),
};

export default route;
