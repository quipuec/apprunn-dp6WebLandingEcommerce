<template>
	<div class="component-filter-product">
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
	display: grid;
	grid-template-columns: auto auto auto auto;
	height: 67px;
	padding: 9px 0;
	width: 100%;

	@media (max-width: 750px) {
		grid-template-columns: auto auto;
		width: 100%; 
	}
}
</style>

