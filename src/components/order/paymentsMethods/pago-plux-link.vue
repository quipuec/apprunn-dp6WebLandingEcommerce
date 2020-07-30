<template>
	<div class="pago-plux-styles-container">
		<a
			:href="link"
			target="_blank"
			class="pago-plux-styles"
		>Pague aquí
		</a>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function created() {
	this.linkGenerator();
}

async function linkGenerator() {
	const url = 'payment-gateway/pagoplux/checkout';
	const body = {
		orderId: this.getOrderInfo.id,
		commerceCode: process.env.COMMERCE_CODE,
		categoryCode: 'PAYMENT_LINK',
	};
	const { data: res } = await this.$httpSales.post(url, body);
	this.link = res.data.url;
}

function data() {
	return {
		link: null,
	};
}

export default {
	name: 'pago-plux-link',
	computed: {
		...mapGetters([
			'getOrderInfo',
		]),
	},
	created,
	data,
	methods: {
		linkGenerator,
	},
};
</script>
<style lang="scss" scoped>
.pago-plux-styles-container {
	padding: 1rem 2rem;

	.pago-plux-styles {
		background-color: white;
	}
}
</style>