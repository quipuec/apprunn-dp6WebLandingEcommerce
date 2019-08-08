const route = {
	path: '/:id/detalle-producto',
	name: 'detail-product',
	component: () => import('@/pages/page-detail-product'),
	props: true,
};

export default route;
