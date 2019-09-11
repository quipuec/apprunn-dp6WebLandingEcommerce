<template>
	<div class="searcher-container">
		<section class="tab">
			<div
				class="wrapper-btn"
				v-for="(cat, indexCat) in categories"
				:key="indexCat"
			>
				<button
					type="button"
					class="tab-button tab-button-active"
					@click="active(cat)"
				>{{cat.title}}</button>
				<div
					v-show="selectedCategory.id === cat.id"
					class="active-btn"
					:style="`background-color: ${globalColors.primary}`"
				></div>
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
	function created() {
		this.selectedCategory = this.categories[0];
	}

	function active(cat) {
		this.selectedCategory = cat;
	}

	function data() {
		return {
			categories: [
				{ id: 0, title: 'Auto' },
				{ id: 1, title: 'Puerta Levadiza' },
			],
			selectedCategory: {},
		};
	}

	export default {
		name: 'searcher',
		data,
		components: {
			AppButton: () => import('@/components/shared/buttons/app-button'),
			SelectInput: () => import('@/components/shared/inputs/app-select'),
		},
		created,
		methods: {
			active,
		},
	};
</script>

<style lang="scss" scoped>
	.searcher-container {
		background-color: rgba(0, 0, 0, 0.5);
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