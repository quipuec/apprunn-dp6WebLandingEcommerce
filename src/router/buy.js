const route = {
	name: 'buy',
	path: '/carrito-de-compras',
	component: () => import(/* webpackChunkName: "page-buy" */ '@/pages/page-buy'),
	meta: {
		step: 1,
	},
	beforeEnter: (to, from, next) => {
		if (to.name === 'buy' && localStorage.getItem('ecommerce::token')) {
			next();
		}
		next({ name: 'page-home' });
	},
	children: [
		{
			name: 'buy-delivery',
			path: 'entrega-y-facturacion',
			meta: {
				step: 2,
			},
			component: () => import(/* webpackChunkName: "delivery" */ '@/components/order/delivery'),
		},
		{
			name: 'buy-payment',
			path: 'pago',
			meta: {
				step: 3,
			},
			component: () => import(/* webpackChunkName: "payment" */ '@/components/order/payment'),
		},
	],
};
export default route;
