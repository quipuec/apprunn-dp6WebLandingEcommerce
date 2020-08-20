<template>
	<div class="pago-plux-styles-container">
		<button
			type="button"
			class="pago-plux-styles"
			@click="linkGenerator"
		>
			<img :src="imgLink" alt="imagen de pagoplux">
		</button>
	</div>
</template>
<script>

async function linkGenerator() {
	const url = 'payment-gateway/pagoplux/checkout';
	const body = {
		categoryCode: this.categoryCode,
		commerceCode: process.env.COMMERCE_CODE,
		ipAddress: this.ipAddress,
		orderId: this.orderId,
		uri: this.uri,
	};
	try {
		await this.$httpSales.post(url, body);
		this.showNotification('Se generó un enlace de pagos de forma exitosa', 'success');
		this.$router.push({ name: 'buy-summary' });
		this.$store.dispatch('GET_ORDER_INFO', { context: this, id: this.orderId });
	} catch (error) {
		this.showNotification(
			'Ocurrió un error al generar el enlace de pago. Recargue y vuelva a intentarlo por favor',
			'error',
		);
		console.log(error);
	}
}

function data() {
	return {
		link: null,
	};
}

export default {
	name: 'pago-plux-link',
	data,
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
.pago-plux-styles-container {
	border: 1px solid #0679FB;
	font-weight: bold;
	padding: 0.5rem 1.5rem;
	transition-duration: 250ms;
	max-width: fit-content;

	.pago-plux-styles {
		align-items: center;
		background-color: white;
		display: flex;
		justify-content: center;
		text-decoration: none;

		&:hover {
			box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
			transform: scale(1.05);
		}
	}
}
</style>