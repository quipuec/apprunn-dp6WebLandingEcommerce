<template>
	<div class="menu-category">
		<div>
			<section-category></section-category>
		</div>
		<filters-category></filters-category>
	</div>
</template>

<script>
const sectionCategory = () => import('@/components/shared/category/section-category');
const filtersCategory = () => import('@/components/shared/category/filters-category');

export default {
	name: 'menu-category',
	components: {
		sectionCategory,
		filtersCategory,
	},
};
</script>

<style lang="scss" scoped>
.menu-category {
	background-color: color(disabled);
	padding: 0px 25px;
	width: 30%;	
}
</style>
