const route = {
	path: '/:id/detalle-producto',
	name: 'detail-product',
	component: () => import(/* webpackChunkName: "page-detail-product" */'@/pages/page-detail-product'),
	props: true,
};

export default route;
