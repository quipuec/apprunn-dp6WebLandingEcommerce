<template>
	<div class="menu-category" v-if="close">
		<div>
			<section-category
			:categories="categories"
			></section-category>
		</div>
		<filters-category></filters-category>
		<button class="btn-menu-category">
			<img src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-point-to-right-(1).svg" alt="" width="15px" height="15px">
		</button>
	</div>
</template>

<script>
const sectionCategory = () => import('@/components/shared/category/section-category');
const filtersCategory = () => import('@/components/shared/category/filters-category');

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
	background-color: #f9f9f9;
	border-right: 1px solid #eaeaea;
	padding: 0px 25px;
	position: relative;
	width: 90%;	
}

.btn-menu-category {
  left: 330px;
	position: absolute;
  top: 150px;
}
</style>
