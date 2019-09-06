const route = {
	name: 'category',
	path: '/categoria/:fisrt/:second?/:third?',
	component: () => import('@/pages/page-category'),
	props: true,
};
export default route;
