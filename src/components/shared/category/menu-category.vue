<template>
	<div class="menu-category">
		<div>
			<section-category
			:categories="categories"
			@filter="filterCategory"
			:title-category="titleCategory"
			></section-category>
		</div>
		<filters-category></filters-category>
		<button class="btn-menu-category">
			<img src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-point-to-right-(1).svg" alt="" width="15px" height="15px">
		</button>
	</div>
</template>

<script>
const filtersCategory = () => import('@/components/shared/category/filters-category');
const sectionCategory = () => import('@/components/shared/category/section-category');

function filterCategory() {
	this.$emit('filter', this.categories);
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
		filtersCategory,
		sectionCategory,
	},
	methods: {
		filterCategory,
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
	},
};
</script>

<style lang="scss" scoped>
.menu-category {
	background-color: color(background);
	border-right: 1px solid color(border);
	height: 100vh;
	position: relative;
	width: 95%;	
}

.btn-menu-category {
	left: 104%;
	position: absolute;
	top: 370px;
}
</style>
