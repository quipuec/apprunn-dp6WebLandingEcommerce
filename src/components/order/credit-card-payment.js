import VisaPeru from '@/components/order/visa-payment';
import VisaEcu from '@/components/order/paymentsMethods/paymentez';
import { mapGetters } from 'vuex';
import { getDeeper } from '@/shared/lib';

export default {
	computed: {
		...mapGetters(['user']),
	},
	render(h) {
		const isPeru = getDeeper('company.country.countryCode')(this.user) === 'PER';
		return isPeru ? h(VisaPeru) : h(VisaEcu);
	},
};
