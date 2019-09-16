<template>
	<div class="wrapper-big-category">
		<div class="wrapper-list-category">
			<list-category 
				v-for="category in categories"
				:data="category"
				:key="category.id"
				:breadcrumbs="breadcrumbs"
        @change-category="changeCategory"
				@open-category="openCategory"/>
			<filters-category></filters-category>
			<div class="wrapper-btns py-3">
				<app-button 
					action="Cerrar"
					class="btn-modal mr-2"
					:active="false"
					:border="globalColors.primary"
					@click="$emit('close')"
				/>
				<app-button 
					action="Filtrar"
					class="btn-modal"
					:background="globalColors.secondary"
					/>
			</div>
		</div>
		<button class="btn-menu-category" @click="$emit('toggle')">
			<img 
				src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-point-to-right-(1).svg" 
				alt="abrir" 
				width="15px" 
				height="15px"
				class="toggle">
		</button>
	</div>
</template>

<script>
const filtersCategory = () => import('@/components/shared/category/filters-category');
const listCategory = () => import('@/components/shared/category/list-category');
const appButton = () => import('@/components/shared/buttons/app-button');

function filterCategory() {
	this.$emit('filter', this.categories);
}

function changeCategory(dataCategory) {
	this.$emit('change-category', dataCategory);
}

function openCategory(id) {
	this.$emit('open-category', id);
}

function data() {
	return {
		close: true,
	};
}

export default {
	data,
	name: 'menu-category',
	components: {
		appButton,
		filtersCategory,
		listCategory,
	},
	methods: {
		changeCategory,
		filterCategory,
		openCategory,
	},
	props: {
		categories: {
			type: Array,
			default: () => [],
		},
		titleCategory: {
			type: String,
			default: '',
		},
		breadcrumbs: {
			data: {
				type: Array,
				default: () => [],
			},
		},
	},
};
</script>

<style lang="scss" scoped>
.wrapper-big-category {
	display: flex;
	height: 100%;
	position: relative;

	@media (max-width: 986px) {
		border-right: none;
	}
}

.btn-menu-category {
	position: relative;
	width: 30px;

	.toggle {
		position: absolute;
		left: 8px;
		top: 30%;
		transform: rotate(180deg);
	}

	@media (max-width: 986px) {
		display: none;
	}
}

.wrapper-list-category {
	border-right: 1px solid color(border);
	overflow-x: scroll;
	padding-right: 20px;
	width: 300px;

	@media (max-width: 986px) {
		border-right: none;
		max-width: none;
		padding-right: 0;
		width: 100%;
	}
}

.wrapper-btns {
	border-top: 1px solid color(border);
	display: none;
	justify-content: center;

	.btn-modal {
		width: 40%;
	}

	@media (max-width: 986px) {
		display: flex;
	}
}

</style>
