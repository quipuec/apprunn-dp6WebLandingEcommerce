const route = {
	name: 'buy-summary',
	path: '/resumen-de-mi-pedido',
	component: () => import(/* webpackChunkName: "summaryOrder" */ '@/pages/page-summary-order'),
};
export default route;
