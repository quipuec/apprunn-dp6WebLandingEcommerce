
const VisaPeru = () => import('@/components/order/paymentsMethods/visa-payment');
const Paymentez = () => import('@/components/order/paymentsMethods/paymentez');
const DataFast = () => import('@/components/order/paymentsMethods/data-fast');

export default {
	render(h) {
		let selectedPaymentMethods = null;
		if (this.isPeru) {
			selectedPaymentMethods = [h(VisaPeru), h(DataFast)];
		} else {
			selectedPaymentMethods = [h(Paymentez), h(DataFast)];
		}
		return h('div', {}, selectedPaymentMethods);
	},
};
