import { mapGetters } from 'vuex';

const VisaPeru = () => import('@/components/order/visa-payment');
const VisaEcu = () => import('@/components/order/paymentsMethods/paymentez');

export default {
	computed: {
		...mapGetters(['user']),
	},
	render(h) {
		return this.isPeru ? h(VisaPeru) : h(VisaEcu);
	},
};
