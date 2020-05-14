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
	const commerceCode = `?commerceCode=${this.getCommerceData.code}`;
	const purchaseNumber = `&purchaseNumber=${this.getOrderId}`;
	const url = `${this.baseUrl}${commerceCode}${purchaseNumber}`;
	dataFastForm.setAttribute('action', url);
	dataFastForm.setAttribute('data-brands', 'VISA MASTER DINERS AMEX DISCOVER');
	dataFastForm.setAttribute('id', 'datafast-form');
	dataFastForm.setAttribute('class', 'paymentWidgets');
	const el = this.$refs['data-fast'];
	el.appendChild(dataFastForm);
}

function baseUrl() {
	return `${process.env.SALES_URL}/payment-transaction/checkouts`;
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
		baseUrl,
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