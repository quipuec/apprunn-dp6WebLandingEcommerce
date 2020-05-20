
import { Yape } from '@/shared/enums/depositPayment';

const YapeComponent = () => import('@/components/order/yape-component');

function yapeUrlImage() {
	const { urlImage } = this.deposits.find(d => d.name === Yape) || {};
	return urlImage;
}

export default {
	name: 'deposit-payments',
	computed: {
		yapeUrlImage,
	},
	props: {
		deposits: {
			required: true,
			type: Array,
		},
	},
	render(h) {
		const options = {
			[Yape]: h(YapeComponent, { props: { urlImage: this.yapeUrlImage } }),
		};
		let selectedPaymentMethods = [];
		this.deposits.forEach((t) => {
			const { name } = t;
			selectedPaymentMethods = selectedPaymentMethods.concat(options[name]);
		});
		return h('div', {}, selectedPaymentMethods);
	},
};
