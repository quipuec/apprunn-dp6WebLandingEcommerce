<template>
	<div class="page-components">
		<div class="title">Componentes</div>
		<v-layout wrap>
			<v-flex xs12>
				Inputs
			</v-flex>
			<v-flex xs12>
				<app-input
					border-color="#f5f3f3"
					placeholder="E-mail"
				></app-input>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	const appInput = () => import('@/components/shared/inputs/app-input');

	export default {
		name: 'components',
		components: {
			appInput,
		},
	};
</script>

<style lang="scss" scoped>
	.page-components {
		background-color: color(background);
		color: color(black);
		height: 100vh;
		padding: 45px;
	}

	.title {
		margin-bottom: 20px;
	}
</style>