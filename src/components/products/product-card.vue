<template>
	<div class="product-container">
		<section class="product-header">
			<div class="product-discount">-20%</div>
			<div class="product-favorite">
				<heart-component @click="productFavo" v-model="product.favorite"/>
			</div>
		</section>
		<section class="product-content">
			<div>
				<img class="product-img" src="/static/img/resorte.jpg" alt="imagen del product">
			</div>
			<div class="product-description-wrapper">
				<p class="product-description">Descripción del producto</p>
				<small class="product-brand">Marca</small>
				<h3 class="product-price-discount">S/. 47.99</h3>
				<small class="product-price">S/. 67.99</small>
				<small class="other-buy">+ 1000 compraron esto</small>
			</div>
		</section>
	</div>
</template>
<script>

function productFavo() {
	this.product.favorite = !this.product.favorite;
}

function data() {
	return {
		product: {
			favorite: false,
		},
	};
}

export default {
	name: 'product-card',
	components: {
		heartComponent: () => import('@/components/shared/icons/heart-component'),
	},
	data,
	methods: {
		productFavo,
	},
};
</script>
<style lang="scss" scoped>
	.product-container {
		background-color: color(standarBackground);
		border: 3px solid color(border);
		max-height: 330px;
		padding: 10px;

		@media (min-width: 500px) {
			margin: 3px;
		}
	}

	.product-header {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	.product-discount {
		background-color: color(primary);
		border-radius: 5px;
		color: color(standarBackground);
		font-family: font(medium);
		font-size: size(large);
		padding: 8px 15px;
	}

	.product-content {
		align-items: center;
		display: flex;
		justify-content: center;
		margin: 0 5px;
		padding: 0 25px;
		text-align: center;

		div {
			margin: 0 15px;
		}

		@media (min-width: 500px) {
			flex-direction: column;
		}
	}

	.product-description-wrapper {
		display: flex;
		flex-direction: column;
	}

	.product-img {
		height: 130px;
		object-fit: contain;
		width: 125px;
	}

	.product-description {
		color: color(dark);
		font-size: size(small);
		margin: 0;
	}

	.product-brand {
		color: color(dark);
	}

	.product-price-discount {
		color: color(secondary);
		font-family: font(bold);
		font-size: size(xlarge);
	}

	.product-price,
	.other-buy {
		color: color(base);
		font-size: size(xsmall);
	}
	.product-price {
		text-decoration: line-through;
	}
</style>

