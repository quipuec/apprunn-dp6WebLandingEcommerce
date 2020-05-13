<template>
	<div ref="data-fast">
		<h1>Data fast</h1>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function mounted() {
	this.getTokenId();
}

async function getTokenId() {
	const body = {
		orderId: this.getOrderId,
		commerceCode: this.getCommerceData.code,
	};
	const url = 'payment-transaction/dataweb/checkouts';
	const { data: response } = await this.$httpSales.post(url, body);
	this.checkoutId = response.id;
	this.createDataFastForm();
}

function createDataFastForm() {
	const dataFastScript = document.createElement('script');
	const src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${this.checkoutId}`;
	dataFastScript.setAttribute('src', src);
	const el = this.$refs['data-fast'];
	el.appendChild(dataFastScript);
	this.insertForm();
}

function insertForm() {
	const dataFastForm = document.createElement('form');
	dataFastForm.setAttribute('action', this.redirecUrl);
	dataFastForm.setAttribute('data-brand', 'VISA MASTER DINERS AMEX DISCOVER');
	const el = this.$refs['data-fast'];
	el.appendChild(dataFastForm);
}

function redirecUrl() {
	return process.env.REDIRECT_URI;
}

function data() {
	return {
		checkoutId: null,
	};
}

export default {
	name: 'data-fast',
	computed: {
		...mapGetters([
			'getCommerceData',
			'getOrderId',
		]),
		redirecUrl,
	},
	data,
	methods: {
		createDataFastForm,
		getTokenId,
		insertForm,
	},
	mounted,
};
</script>
<style lang="scss" scoped>

</style>