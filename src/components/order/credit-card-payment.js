import { mapGetters } from 'vuex';

const VisaPeru = () => import('@/components/order/paymentsMethods/visa-payment');
const Paymentez = () => import('@/components/order/paymentsMethods/paymentez');
const DataFast = () => import('@/components/order/paymentsMethods/data-fast');
const Xchange = () => import('@/components/order/paymentsMethods/xchange');
const Pagoplux = () => import('@/components/order/paymentsMethods/pago-plux');

export default {
	computed: {
		...mapGetters([
			'getOrderInfo',
		]),
	},
	data() {
		return {
			link: '',
		};
	},
	methods: {
		getPaymentLink() {
			const url = 'payment-gateway/leadgods/checkout';
			const body = {
				commerceCode: process.env.COMMERCE_CODE,
				orderId: this.getOrderInfo.id,
			};
			this.$httpSales.post(url, body).then((res) => {
				this.link = res;
			});
		},
		paymentsLink(h) {
			const btnStyles = {
				border: `1px solid ${this.globalColors.primary}`,
				color: this.globalColors.primary,
				marginRight: '1rem',
				padding: '0.5rem 1rem',
			};
			const on = {
				click: this.getPaymentLink,
			};
			const buttonsLinksArray = [];
			const links = this.paymentsTypes.filter(p => p.code === 'PAYMENT_LINK');
			links.forEach((l) => {
				const buttonLink = h(
					'button',
					{
						style: btnStyles,
						on,
					},
					l.name,
				);
				const link = h('span', this.link);
				buttonsLinksArray.push(h('div', [buttonLink, link]));
			});
			const btnContainerStyles = {
				borderBottom: '1px solid #e6e6e6',
				paddingBottom: '1rem',
			};
			return h('div', { style: btnContainerStyles }, buttonsLinksArray);
		},
		paymentsButtons(h) {
			const optionsButtons = {
				visa: h(VisaPeru),
				paymentez: h(Paymentez),
				dataweb: h(DataFast),
				xchange: h(Xchange),
				pagoplux: h(Pagoplux),
			};
			let selectedPaymentMethods = [];
			this.paymentsTypes.forEach((t) => {
				const { code } = t;
				const selectedOption = optionsButtons[code];
				if (selectedOption) {
					selectedPaymentMethods = selectedPaymentMethods.concat(selectedOption);
				}
			});
			if (selectedPaymentMethods.length === 0) {
				return null;
			}
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
	},
	props: {
		paymentsTypes: {
			required: true,
			type: Array,
		},
	},
	render(h) {
		const paymentsLinks = this.paymentsLink(h);
		const paymentsButtons = this.paymentsButtons(h);
		return h('div', [].concat(paymentsLinks, paymentsButtons));
	},
};
