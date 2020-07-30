import { LINK, BUTTON } from '@/shared/enums/paymentStrategy';

const VisaPeru = () => import('@/components/order/paymentsMethods/visa-payment');
const Paymentez = () => import('@/components/order/paymentsMethods/paymentez');
const DataFast = () => import('@/components/order/paymentsMethods/data-fast');
const PagoPlux = () => import('@/components/order/paymentsMethods/pago-plux');
const PagoPluxLink = () => import('@/components/order/paymentsMethods/pago-plux-link');
const Xchange = () => import('@/components/order/paymentsMethods/xchange');
const LeadGods = () => import('@/components/order/paymentsMethods/leadgods');
const PlaceToPay = () => {};

const paymentLinkCreator = (h, gateway) => {
	const linkOptions = {
		leadgods: LeadGods,
		placetopay: PlaceToPay,
		pagoplux_link: PagoPluxLink,
	};
	let selectedLinks = [];
	gateway.forEach((t) => {
		const { code } = t;
		selectedLinks = selectedLinks.concat(h(linkOptions[code]));
	});
	return h(
		'div',
		{
			style: {
				margin: '1rem',
				padding: '1rem 0',
			},
		},
		selectedLinks,
	);
};
const paymentButtonCreator = (h, gateway) => {
	const buttonOptions = {
		visa: VisaPeru,
		paymentez: Paymentez,
		datafast: DataFast,
		pagoplux: PagoPlux,
		xchange: Xchange,
	};
	let selectedButtons = [];
	gateway.forEach((t) => {
		const { code } = t;
		selectedButtons = selectedButtons.concat(h(buttonOptions[code]));
	});
	return h(
		'div',
		{
			style: {
				borderTop: '1px solid #e6e6e6',
				display: 'flex',
				paddingTop: '1rem',
			},
		},
		selectedButtons,
	);
};

export default {
	props: {
		paymentsTypes: {
			required: true,
			type: Array,
		},
	},
	render(h) {
		if (this.paymentsTypes.length === 0) {
			return null;
		}
		const paymentsMethos = [];
		const link = this.paymentsTypes.find(p => p.code === LINK);
		if (link) {
			paymentsMethos.push(paymentLinkCreator(h, link.gateway));
		}
		const button = this.paymentsTypes.find(p => p.code === BUTTON);
		if (button) {
			paymentsMethos.push(paymentButtonCreator(h, button.gateway));
		}
		return h('div', paymentsMethos);
	},
};
