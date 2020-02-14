<template>
	<div class="recieved-main-container">
		<p class="principal">¡Haz tu pedido ahora y págalo en efectivo al recibir tu producto!</p>
		<p>Recuerda que si no podrás estar presente para la entrega, debes dejar a un tercero con el monto exacto a pagar.</p>
		<p>Y si no estás satisfecho con tu producto, puedes devolverlo completamente gratis dentro de los 10 días naturales posteriores a la entrega (se aplican términos y condiciones).</p>
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
		margin-top: 66px;
		max-width: 656px;
	}

	.principal {
		font-family: font(medium);
		font-size: size(medium);
	}
</style>