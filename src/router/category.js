const route = {
	name: 'category',
	path: '/categoria/:id',
	component: () => import('@/pages/page-category'),
	props: true,
};
export default route;
