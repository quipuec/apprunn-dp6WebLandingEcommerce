const route = {
	name: 'buy',
	path: '/carrito-de-compras',
	component: () => import('@/pages/page-buy'),
	children: [
		{
			name: 'buy-delivery',
			path: 'entrega-y-facturacion',
			meta: {
				step: 2,
			},
			component: () => import('@/components/order/delivery'),
		},
		{
			name: 'buy-payment',
			path: 'pago',
			meta: {
				step: 3,
			},
			component: () => import('@/components/order/payment'),
		},
	],
};
export default route;
