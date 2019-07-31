<template>
	<div class="component-filter-product">
		<media-filter-product
		image="/static/img/icons/icon-filter-product.svg"
		title="Novedades"
		color="white"
		></media-filter-product>
		<media-filter-product
		image="/static/img/icons/icon-filter-product.svg"
		title="Populares"
		color="white"
		></media-filter-product>
		<media-filter-product
		image="/static/img/icons/icon-filter-product.svg"
		title="Recomendados"
		color="white"
		></media-filter-product>
		<media-filter-product
		image="/static/img/icons/icon-filter-product.svg"
		title="Ofertas"
		color="white"
		></media-filter-product>
	</div>
</template>

<script>
const mediaFilterProduct = () => import('@/components/shared/products/media-filter-product');

export default {
	name: 'component-filter-product',
	components: {
		mediaFilterProduct,
	},
};
</script>

<style lang="scss" scoped>
.component-filter-product {
	display: flex;
}
</style>

