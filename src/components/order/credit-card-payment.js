
const VisaPeru = () => import('@/components/order/paymentsMethods/visa-payment');
const Paymentez = () => import('@/components/order/paymentsMethods/paymentez');
const DataFast = () => import('@/components/order/paymentsMethods/data-fast');
const Xchange = () => import('@/components/order/paymentsMethods/xchange');

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
		};
		let selectedPaymentMethods = [h(Xchange)];
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
