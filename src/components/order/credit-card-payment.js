
const VisaPeru = () => import('@/components/order/paymentsMethods/visa-payment');
const Paymentez = () => import('@/components/order/paymentsMethods/paymentez');
const DataFast = () => import('@/components/order/paymentsMethods/data-fast');

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
			datafast: h(DataFast),
		};
		let selectedPaymentMethods = [h(DataFast)];
		this.paymentsTypes.forEach((t) => {
			const { code } = t;
			selectedPaymentMethods = selectedPaymentMethods.concat(options[code]);
		});
		// if (this.isPeru) {
		// 	selectedPaymentMethods = [h(VisaPeru), h(DataFast)];
		// } else {
		// 	selectedPaymentMethods = [h(Paymentez), h(DataFast)];
		// }
		return h('div', {}, selectedPaymentMethods);
	},
};
