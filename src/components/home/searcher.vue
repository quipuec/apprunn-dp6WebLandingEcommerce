<template>
	<div class="searcher-container">
		<section class="tab">
			<div class="wrapper-btn">
				<button type="button" class="tab-button tab-button-active">Auto</button>
				<div class="active-btn" :style="`background-color: ${globalColors.primary}`"></div>
			</div>
			<div>
				<button type="button" class="tab-button">Puerta Levadiza</button>
			</div>
		</section>
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
	}

	.form {
		align-items: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 37px 20px 0;
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

	.tab {
		align-items: center;
		border-bottom: 1px solid white;
		display: flex;
		justify-content: space-between;
		padding: 0 40px;
	}

	.wrapper-btn {
		align-items: center;
		display: flex;
		flex-direction: column;
	}

	.active-btn {
		height: 5px;
		transform: translateY(3px);
		width: 100%;
	}

	.tab-button {
		background-color: transparent;
		color: white;
		font-family: font(demi);
		height: 50px;
		padding: 0 15px
	}

	.tab-button-active {
		font-family: font(bold);
	}
</style>