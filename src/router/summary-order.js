const route = {
	name: 'buy-summary',
	path: '/resumen-de-mi-pedido',
	meta: {
		step: 4,
	},
	component: () => import(/* webpackChunkName: "summaryOrder" */ '@/pages/page-summary-order'),
};
export default route;
