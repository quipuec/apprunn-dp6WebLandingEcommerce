<template>
	<div class="product-rating-container">
		<div class="image-container">
			<img :src="product.productImage" alt="imagen del producto">
		</div>
		<div class="description-container">
			<h2>{{product.productName}}</h2>
			<h3>{{product.description}}</h3>
			<h5>{{product.productCode}}</h5>
		</div>
	</div>
</template>
<script>
export default {
	name: 'product-rating',
	props: {
		product: {
			default: () => {},
			type: Object,
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-rating-container {
		align-items: center;
		display: flex;
		justify-content: flex-start;

		.image-container {
			flex: 1 1 30%;
			height: 120px;
			margin: 0 40px 20px 0;
			width: 120px;

			img {
				height: 100%;
				object-fit: content;
				width: 100%;
			}
		}

		.description-container {
			flex: 1 1 70%;
		}
	}
</style>