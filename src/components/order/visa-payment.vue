<template>
	<form
		id="visa-payment"
		:action="`${apiSales}/payment-transaction/gateway-response?purchaseNumber=${getOrderId}`"
		method='post'
	></form>
</template>
<script>
import { mapGetters } from 'vuex';

function created() {
	this.getClientIp();
}

function createScript() {
	if (process.browser && process.env.VISA_MERCHAN_ID) {
		const visaForm = document.createElement('script');
		const dataSessionToken = this.sessionKey;
		const dataMerchantId = process.env.VISA_MERCHAN_ID;
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
		this.createVisaSession();
	} catch (err) {
		this.showGenericError();
	}
}

function orderTotal() {
	return this.getTotalToBuy + this.getShippingCost;
}

function data() {
	return {
		apiSales: process.env.SALES_URL,
		clientIp: null,
		companyLogo: process.env.COMPANY_LOGO,
		expirationTime: null,
		loading: false,
		merchantId: process.env.VISA_MERCHAN_ID,
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
		createScript,
		createVisaSession,
		getClientIp,
	},
};
</script>
<style lang="scss" scoped>
	.start-js-btn.modal-opener.default {
		background: url('/static/img/icons/icon-visanet.png') !important;
	}
</style>
