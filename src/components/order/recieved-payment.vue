<template>
	<div class="recieved-main-container">
		<h2 class="principal">¡Haz tu pedido ahora y págalo en efectivo al recibir tu producto!</h2>
	</div>
</template>
<script>
export default {
	name: 'recieved-payment',
};
</script>
<style lang="scss" scoped>
	.recieved-main-container {
		font-family: font(regular);
		font-size: size(small);
		margin-top: 46px;
		max-width: 656px;
	}

	.principal {
		font-family: font(medium);
		font-size: size(large);
	}
</style>