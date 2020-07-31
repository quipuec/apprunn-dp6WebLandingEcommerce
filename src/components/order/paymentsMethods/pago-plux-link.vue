<template>
	<div class="pago-plux-styles-container">
		<a
			:href="link"
			target="_blank"
			class="pago-plux-styles"
		>
			<img :src="imgLink" alt="imagen de pagoplux">
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
	props: {
		imgLink: {
			type: String,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.pago-plux-styles-container {
	color: #0679FB;
	font-weight: bold;
	max-width: fit-content;

	.pago-plux-styles {
		align-items: center;
		background-color: white;
		border: 1px solid #0679FB;
		display: flex;
		justify-content: center;
		padding: 1rem 2rem;
		text-decoration: none;

		&:hover {
			background-color: #0679FB;
			color: white;
		}
	}
}
</style>