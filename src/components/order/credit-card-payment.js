import { mapGetters } from 'vuex';
import { LINK, BUTTON } from '@/shared/enums/paymentStrategy';

const VisaPeru = () => import('@/components/order/paymentsMethods/visa-payment');
const Paymentez = () => import('@/components/order/paymentsMethods/paymentez');
const DataFast = () => import('@/components/order/paymentsMethods/data-fast');
const PagoPlux = () => import('@/components/order/paymentsMethods/pago-plux');
const PagoPluxLink = () => import('@/components/order/paymentsMethods/pago-plux-link');
const Xchange = () => import('@/components/order/paymentsMethods/xchange');
const LeadGods = () => import('@/components/order/paymentsMethods/leadgods');
const PlaceToPay = () => import('@/components/order/paymentsMethods/place-to-pay');

function created() {
	this.getClientIp();
}

async function getClientIp() {
	try {
		({ data: this.clientIp } = await this.$http.get('https://api.ipify.org'));
	} catch (err) {
		this.showNotification(
			'Ocurrio un error con la ip de origen',
			'error',
		);
	}
}

function paymentLinkCreator(h, gateway) {
	if (this.getOrderInfo && this.clientIp) {
		const orderId = this.getOrderInfo.id;
		const redirectUri = 'perfil/detalle-orden';
		const linkOptions = {
			leadgods: LeadGods,
			placetopay: PlaceToPay,
			pagoplux_link: PagoPluxLink,
		};
		let selectedLinks = [];
		gateway.forEach((t) => {
			const { categoryCode, code, urlImage } = t;
			const paymentLinkComponent = h(
				linkOptions[code],
				{
					props: {
						categoryCode,
						code,
						imgLink: urlImage,
						ipAddress: this.clientIp,
						orderId,
						uri: redirectUri,
					},
				},
			);
			selectedLinks = selectedLinks.concat(paymentLinkComponent);
		});
		const links = h(
			'div',
			{
				style: {
					margin: '1rem',
					padding: '1rem 0',
				},
			},
			selectedLinks,
		);
		const linkTitle = h('h3', { style: { marginBottom: '0rem' } }, 'Paga más tarde');
		return h('div', [linkTitle, links]);
	}
	return null;
}
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
	const btns = h(
		'div',
		{
			style: {
				display: 'flex',
			},
		},
		selectedButtons,
	);
	const btnTitle = h('h3', { style: { marginBottom: '1rem' } }, 'Paga ahora');
	return h(
		'div',
		{
			style: {
				borderTop: '1px solid #e6e6e6',
				paddingTop: '1rem',
			},
		},
		[btnTitle, btns],
	);
};

function data() {
	return {
		clientIp: null,
	};
}

export default {
	computed: {
		...mapGetters([
			'getOrderInfo',
		]),
	},
	created,
	data,
	methods: {
		getClientIp,
		paymentButtonCreator,
		paymentLinkCreator,
	},
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
			paymentsMethos.push(this.paymentLinkCreator(h, link.gateway));
		}
		const button = this.paymentsTypes.find(p => p.code === BUTTON);
		if (button) {
			paymentsMethos.push(this.paymentButtonCreator(h, button.gateway));
		}
		return h('div', paymentsMethos);
	},
};
