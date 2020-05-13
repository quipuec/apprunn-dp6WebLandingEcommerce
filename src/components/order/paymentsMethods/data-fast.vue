<template>
	<div ref="data-fast">
		<button
			v-show="show"
			type="button"
			@click="createDataFastForm"
		>Data Fast</button>
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
	this.show = true;
}

function createDataFastForm() {
	const dataFastScript = document.createElement('script');
	const src = `${process.env.DATA_FAST_URL}${this.checkoutId}`;
	dataFastScript.setAttribute('src', src);
	const el = this.$refs['data-fast'];
	el.appendChild(dataFastScript);
	this.insertForm();
}

function insertForm() {
	const dataFastForm = document.createElement('form');
	dataFastForm.setAttribute('action', this.redirecUrl);
	dataFastForm.setAttribute('data-brands', 'VISA MASTER DINERS AMEX DISCOVER');
	dataFastForm.setAttribute('id', 'datafast-form');
	dataFastForm.setAttribute('class', 'paymentWidgets');
	const el = this.$refs['data-fast'];
	el.appendChild(dataFastForm);
}

function redirecUrl() {
	return process.env.REDIRECT_URI;
}

function data() {
	return {
		checkoutId: null,
		show: false,
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