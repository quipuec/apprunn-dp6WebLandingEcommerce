<template>
<div class="page-category">
	<div class="menu-category">
		<menu-category></menu-category>
	</div>
	<div class="content-category">
		<div class="space-between">
			<section>
				breadcrumbs
			</section>
			<section>
				pagination
			</section>
		</div>
			<products-section/>
		<section></section>
	</div>
</div>
</template>

<script>
const menuCategory = () => import('@/components/shared/category/menu-category');
const productsSection = () => import('@/components/products/products-section');

export default {
	name: 'page-category',
	components: {
		menuCategory,
		productsSection,
	},
};
</script>

<style lang="scss" scoped>
.menu-category {
	background-color: #f9f9f9;
	border-right: 1px solid color(disabled);
	height: 100vh;
	padding: 0px 25px;
	width: 25%;	
}

.content-category {
	background-color: color(white);
	width: 75%;
}

.page-category {
	display: flex;
	height: 100vh;
	width: 100%;
}

.space-between {
	display: flex;
	justify-content: space-between;
	padding: 10px 25px 0 25px;
}
</style>
