<template>
	<div class="customer-discount-main-container">
		<p>Usted es un cliente especial. Tiene un descuento general del {{discount}}%</p>
		<button type="button" class="close" @click="closeMessage">&times;</button>
	</div>
</template>
<script>

function closeMessage() {
	const customer = this.getLocalStorage('ecommerce::ecommerce-user');
	customer.showCustomerDiscountMessage = false;
	this.$store.dispatch('setUser', customer);
}

export default {
	name: 'app-customer-discount',
	methods: {
		closeMessage,
	},
	props: {
		discount: {
			type: Number,
			default: 0,
		},
	},
};
</script>
<style lang="scss" scoped>
.customer-discount-main-container {
	align-items: center;
	background-color: color(success);
	color: white;
	display: flex;
	font-family: font(heavy);
	font-size: size(large);
	height: 4rem;
	justify-content: center;
	padding: 0.5rem 3rem;
	position: relative;

	p {
		margin: 0;
		text-align: center;
	}

	.close {
		margin-right: 2rem;
		position: absolute;
		right: 0;
	}
}
</style>