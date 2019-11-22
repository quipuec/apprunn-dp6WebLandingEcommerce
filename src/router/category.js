const route = {
	name: 'category',
	path: '/categoria/:slug/:id',
	component: () => import('@/pages/page-category'),
	props: true,
};
export default route;
