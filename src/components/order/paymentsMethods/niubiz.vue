<template>
	<div>
		<button type="button" @click="checkout" class="niubiz-btn" style="padding:1rem">
			<img :src="img" alt="logo_Niubiz">
		</button>
		<form
			id="visa-payment"
			:action="`${apiSales}/payment-transaction/gateway-response?purchaseNumber=${getOrderId}`"
			method='post'
		></form>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function created() {
	this.getClientIp();
}

function createScript() {
	if (process.browser && this.merchantId) {
		const visaForm = document.createElement('script');
		const dataSessionToken = this.sessionKey;
		const dataMerchantId = this.merchantId;
		const dataAmount = this.orderTotal;
		const dataCurrency = this.currentCurrency || 'PEN';
		const purchaseNumber = this.getOrderId;
		const logo = this.companyLogo;
		const name = process.env.COMPANY_LOGIN_TITLE;
		const btnColor = process.env.COLOR_PRIMARY;
		visaForm.setAttribute('src', 'https://static-content-qas.vnforapps.com/v2/js/checkout.js?qa=true');
		visaForm.setAttribute('data-sessiontoken', dataSessionToken);
		visaForm.setAttribute('data-channel', 'web');
		visaForm.setAttribute('data-merchantid', dataMerchantId);
		visaForm.setAttribute('data-merchantlogo', logo);
		visaForm.setAttribute('data-merchantname', name);
		visaForm.setAttribute('data-formbuttoncolor', btnColor);
		visaForm.setAttribute('data-purchasenumber', purchaseNumber);
		visaForm.setAttribute('data-amount', dataAmount);
		visaForm.setAttribute('data-currency', dataCurrency);
		visaForm.setAttribute('currency', dataCurrency);
		visaForm.setAttribute('data-expirationminutes', 20);
		visaForm.setAttribute('data-timeouturl', 'timeout.html');
		document.getElementById('visa-payment').appendChild(visaForm);
	}
}

async function createVisaSession() {
	this.loading = true;
	const body = {
		orderId: this.getOrderId,
		commerceCode: process.env.COMMERCE_CODE,
		channel: 'web',
		clientIp: this.clientIp,
	};
	try {
		const { data: response } = await this.$httpSales.post('payment-transaction/visa/token',
			body,
		);
		({ sessionKey: this.sessionKey, expirationTime: this.expirationTime } = response);
		this.createScript();
	} catch (err) {
		this.showGenericError();
	}
	this.loading = false;
}

async function getClientIp() {
	try {
		({ data: this.clientIp } = await this.$http.get('https://api.ipify.org'));
	} catch (err) {
		this.showGenericError();
	}
}

function orderTotal() {
	return this.getTotalToBuy + this.getShippingCost;
}

async function checkout() {
	const body = {
		orderId: this.getOrderId,
		commerceCode: process.env.COMMERCE_CODE,
		clientIp: this.clientIp,
	};
	const url = 'payment-gateway/niubiz/checkout';
	const { data: res } = await this.$httpSales.post(url, body);
	this.merchantId = res.merchantId;
	this.createVisaSession();
}

function data() {
	return {
		apiSales: process.env.SALES_URL,
		clientIp: null,
		companyLogo: process.env.COMPANY_LOGO,
		expirationTime: null,
		loading: false,
		merchantId: '',
		sessionKey: null,
		totalAmount: null,
	};
}

export default {
	name: 'visa-payment',
	computed: {
		...mapGetters([
			'getOrderId',
			'getShippingCost',
			'getTotalToBuy',
			'token',
		]),
		orderTotal,
	},
	created,
	data,
	methods: {
		checkout,
		createScript,
		createVisaSession,
		getClientIp,
	},
	props: {
		img: {
			type: String,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
	.start-js-btn.modal-opener.default {
		background: url('/static/img/icons/icon-visanet.png') !important;
	}

	#visa-payment {
		width: 656px;

		@media (max-width: 768px) {
			width: auto;
		}
	}

	.niubiz-btn {
		border: 1px solid black;
		display: flex;
		height: 50px;
		justify-content: center;
		margin: auto 1rem;
		padding: 0 2rem;
		transition-duration: 250ms;

		&:hover {
			box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
			transform: scale(1.05);
		}
		&[disabled] {
			opacity: 0.3;
			cursor: not-allowed;
		}
	}
</style>
