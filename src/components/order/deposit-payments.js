
const Yape = () => import('@/components/order/yape-component');

export default {
	name: 'deposit-payments',
	props: {
		deposits: {
			required: true,
			type: Array,
		},
	},
	render(h) {
		const options = {
			Yape: h(Yape),
		};
		let selectedPaymentMethods = [];
		this.deposits.forEach((t) => {
			const { name } = t;
			selectedPaymentMethods = selectedPaymentMethods.concat(options[name]);
		});
		return h('div', {}, selectedPaymentMethods);
	},
};
