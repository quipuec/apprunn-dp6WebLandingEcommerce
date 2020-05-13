<template>
	<div>
		<h1>Data fast</h1>
		<form
			ref="data-fast"
			data-brand="VISA MASTER DINERS AMEX DISCOVER"
			:action="redirecUrl"
		></form>
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
	const dataFastForm = document.createElement('script');
	const src = `https://test.oppwa.com/v1/paymentWidgets.js?checkoutId=${this.checkoutId}`;
	dataFastForm.setAttribute('src', src);
	const form = this.$refs['data-fast'];
	form.appendChild(dataFastForm);
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
	},
	mounted,
};
</script>
<style lang="scss" scoped>

</style>