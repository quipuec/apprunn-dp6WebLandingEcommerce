<template>
	<div class="component-filter-product">
		<media-filter-product
		border-right="#ffffff"
		image="/static/img/icons/icon-filter-product.svg"
		title="Novedades"
		color="white"
		></media-filter-product>
		<media-filter-product
		image="/static/img/icons/icon-filter-product.svg"
		title="Populares"
		color="white"
		border-right="#ffffff"
		></media-filter-product>
		<media-filter-product
		image="/static/img/icons/icon-filter-product.svg"
		title="Recomendados"
		color="white"
		border-right="#ffffff"
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
	background-color: color(primary);
	display: grid;
	grid-template-columns: auto auto auto auto;
	height: 67px;
	padding: 8px 190px;
	width: 100%;

	@media (max-width: 950px) {
		height: 102px;
		grid-template-columns: auto auto;
		// padding: 8px 46px;
		width: 100%;
		padding: 8px 80px;
	}
}
</style>

