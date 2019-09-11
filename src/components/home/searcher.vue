<template>
	<div class="searcher-container">
		<section class="tab"></section>
		<section class="form-wrapper">
			<form class="form">
				<SelectInput transparent placeholder="Seleccione un año" class="search-select"/>
				<SelectInput transparent placeholder="Seleccione un marca" class="search-select"/>
				<SelectInput transparent placeholder="Seleccione un modelo" class="search-select"/>
				<AppButton
					class="search-btn"
					action="Buscar"
					max-width="96px"
					:background="globalColors.primary"
				/>
			</form>
		</section>
		<section class="result"></section>
	</div>
</template>

<script>
	export default {
		name: 'searcher',
		components: {
			AppButton: () => import('@/components/shared/buttons/app-button'),
			SelectInput: () => import('@/components/shared/inputs/app-select'),
		},
	};
</script>

<style lang="scss" scoped>
	.searcher-container {
		background-color: color(black);
		border: 1px solid white;
		border-radius: 7px;
		padding: 10px 20px 25px;
	}

	.form {
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
	}

	.search-btn {
		width: 96px;
	}

	.search-select {
		border-radius: 8px;
		height: 30px;
		margin-bottom: 15px;
		width: 100%;
	}
</style>