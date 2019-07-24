<template>
	<div class="page-components">
		<div class="title">Componentes</div>
		<v-layout wrap mb-5>
			<v-flex xs12>
				Inputs
			</v-flex>
			<v-flex xs12>
				<app-input
					placeholder="E-mail"
				></app-input>
			</v-flex>
		</v-layout>
		<v-layout wrap>
			<v-flex xs12>
				Botones
			</v-flex>
			<v-flex xs12>
				<app-button
					action="Iniciar Sesión"
					background="red"
					img="http://www.sclance.com/pngs/facebook-logo-white-png/facebook_logo_white_png_466292.png"
					img-border-color="#324988"
					img-height="25"
				></app-button>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	const appButton = () => import('@/components/shared/buttons/app-button');
	const appInput = () => import('@/components/shared/inputs/app-input');

	export default {
		name: 'components',
		components: {
			appButton,
			appInput,
		},
	};
</script>

<style lang="scss" scoped>
	.page-components {
		background-color: color(primary);
		color: color(black);
		height: 100vh;
		padding: 45px;
	}

	.title {
		margin-bottom: 20px;
	}
</style>