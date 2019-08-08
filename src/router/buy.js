const route = {
	name: 'buy',
	path: '/carrito-de-compras',
	component: () => import(/* webpackChunkName: "page-buy" */ '@/pages/page-buy'),
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
