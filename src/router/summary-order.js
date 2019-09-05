const route = {
	name: 'buy-summary',
	path: '/resumen-de-mi-pedido',
	component: () => import(/* webpackChunkName: "summaryOrder" */ '@/pages/page-summary-order'),
	beforeEnter: (to, from, next) => {
		if (to.fullPath.includes('resumen-de-mi-pedido') && localStorage.getItem('ecommerce::token')) {
			next();
		} else {
			next({ name: 'page-home' });
		}
	},
	meta: {
		step: 4,
	},
};
export default route;
