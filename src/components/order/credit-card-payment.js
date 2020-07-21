
const VisaPeru = () => import('@/components/order/paymentsMethods/visa-payment');
const Paymentez = () => import('@/components/order/paymentsMethods/paymentez');
const DataFast = () => import('@/components/order/paymentsMethods/data-fast');
const Xchange = () => import('@/components/order/paymentsMethods/xchange');
const Pagoplux = () => import('@/components/order/paymentsMethods/pago-plux');

export default {
	props: {
		paymentsTypes: {
			required: true,
			type: Array,
		},
	},
	render(h) {
		const options = {
			visa: h(VisaPeru),
			paymentez: h(Paymentez),
			dataweb: h(DataFast),
			xchange: h(Xchange),
			pagoplux: h(Pagoplux),
		};
		let selectedPaymentMethods = [];
		this.paymentsTypes.forEach((t) => {
			const { code } = t;
			selectedPaymentMethods = selectedPaymentMethods.concat(options[code]);
		});
		return h(
			'div',
			{
				style: {
					display: 'grid',
					gridGap: '10px',
					gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
				},
			},
			selectedPaymentMethods);
	},
};
