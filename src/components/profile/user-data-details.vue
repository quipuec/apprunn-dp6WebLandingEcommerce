<template>
	<section class="info-container">
		<div class="col">
			<p>
				<span class="label">Nombre:</span>
				<span class="user-content">Manuel</span>
			</p>
			<p>
				<span class="label">Apellidos:</span>
				<span class="user-content">Amado</span>
			</p>
			<p>
				<span class="label">Género:</span>
				<span class="user-content">M</span>
			</p>
			<p>
				<span class="label">Departamento:</span>
				<span class="user-content">Lima</span>
			</p>
			<p>
				<span class="label">Distrito:</span>
				<span class="user-content">Lima</span>
			</p>
		</div>
		<div class="col">
			<p>
				<span class="label">DNI:</span>
				<span class="user-content">45667890</span>
			</p>
			<p>
				<span class="label">RUC:</span>
				<span class="user-content">10145667890</span>
			</p>
			<p>
				<span class="label">Código postal:</span>
				<span class="user-content">Lima 34</span>
			</p>
			<p>
				<span class="label">Teléfono:</span>
				<span class="user-content">999-333-222</span>
			</p>
			<p>
				<span class="label">Correo:</span>
				<span class="user-content">x@mail.com</span>
			</p>
		</div>
	</section>
</template>
<script>
export default {
	name: 'user-data-details',
};
</script>
<style lang="scss" scoped>
	.info-container {
		align-items: center;
		display: grid;
		font-family: font(medium);
		grid-column-gap: 50px;
		grid-template-columns: 1fr 1fr;
		margin: 0 auto;
		width: 280px;
	}

	.label {
		color: color(base);
		display: block;
		font-size: size(small);
	}

	.user-content {
		color: color(dark);
		font-size: size(medium);
	}
</style>

