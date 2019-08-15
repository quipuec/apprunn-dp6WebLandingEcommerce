<template>
	<div class="menu-category" v-if="close">
		<div>
			<section-category
			:categories="categories"
			@filter="filterCategory"
			></section-category>
		</div>
		<filters-category></filters-category>
		<button class="btn-menu-category" @click="openCategory">
			<img src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-point-to-right-(1).svg" alt="" width="15px" height="15px">
		</button>
	</div>
</template>

<script>
const sectionCategory = () => import('@/components/shared/category/section-category');
const filtersCategory = () => import('@/components/shared/category/filters-category');

function filterCategory() {
	this.$emit('filter');
}

function openCategory() {
	this.category = false;
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
		sectionCategory,
		filtersCategory,
	},
	methods: {
		filterCategory,
		openCategory,
	},
	props: {
		categories: {
			type: Array,
			default: () => [],
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
	width: 90%;	
}

.btn-menu-category {
	left: 108%;
	position: absolute;
	top: 150px;
}
</style>
