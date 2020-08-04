<template>
	<div class="leadgods-styles-container">
		<button
			class="leadgods-styles"
			@click="linkGenerator"
		>
			<img :src="imgLink" alt="imagen de marketpago">
		</button>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

async function linkGenerator() {
	const url = 'payment-gateway/leadgods/checkout';
	const body = {
		categoryCode: this.categoryCode,
		commerceCode: process.env.COMMERCE_CODE,
		ipAddress: this.ipAddress,
		orderId: this.orderId,
		uri: this.uri,
	};
	try {
		const { data: res } = await this.$httpSales.post(url, body);
		this.$store.commit('SET_PAYMENT_LINK', res.data.url);
		this.$store.dispatch('MAKE_ORDER', { flagFinish: true, context: this });
	} catch (error) {
		this.showNotification(
			'Ocurrió un error en el checkout de MarketPago. Recargue e intente de nuevo',
			'error',
		);
		console.log(error);
	}
}

export default {
	name: 'leadgods',
	computed: {
		...mapGetters([
			'getOrderInfo',
		]),
	},
	methods: {
		linkGenerator,
	},
	props: {
		categoryCode: {
			type: String,
			required: true,
		},
		imgLink: {
			type: String,
			required: true,
		},
		ipAddress: {
			type: String,
			required: true,
		},
		orderId: {
			type: Number,
			required: true,
		},
		uri: {
			type: String,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.leadgods-styles-container {
	font-weight: bold;
	transition-duration: 250ms;
	max-width: fit-content;

	.leadgods-styles {
		align-items: center;
		background-color: white;
		display: flex;
		justify-content: center;
		text-decoration: none;
	}
	&:hover {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		transform: scale(1.05);
	}
}
</style>