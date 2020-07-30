<template>
	<div class="leadgods-styles-container">
		<a
			target="_blank"
			class="leadgods-styles"
			:href="link"
			:style="`color:${globalColors.primary};border:1px solid ${globalColors.primary}`"
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
	const url = 'payment-gateway/leadgods/checkout';
	const body = {
		orderId: this.getOrderInfo.id,
		commerceCode: process.env.COMMERCE_CODE,
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
	name: 'leadgods',
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
.leadgods-styles-container {
	font-weight: bold;
	transition-duration: 250ms;
	width: fit-content;

	.leadgods-styles {
		background-color: white;
		padding: 1rem 2rem;
		text-decoration: none;
	}
	&:hover {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		transform: scale(1.05);
	}
}
</style>