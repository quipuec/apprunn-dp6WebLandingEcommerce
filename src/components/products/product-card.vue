<template>
	<div class="product-container" :class="small ? 'small' : null">
		<section class="product-header">
			<div :style="`background-color: ${baseColor}`" class="product-discount">-20%</div>
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
				<v-rating
					small
					class="product-rating"
					background-color="#ffcc03"
					color="#ffcc03"
					v-model="product.rating"></v-rating>
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
			rating: 3,
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
	props: {
		baseColor: String,
		small: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-container {
		background-color: color(white);
		border-radius: 5px;
		box-shadow: 0 2px 2px 0 rgba(31, 26, 26, 0.07);
		font-family: font(medium);
		max-height: 330px;
		padding: 10px;

		@media (min-width: 500px) {
			border: 3px solid color(border);
			margin: 3px;
		}

		&.small {
			max-width: 179px;
		}
	}

	.product-header {
		align-items: center;
		display: flex;
		justify-content: space-between;

		@media (max-width: 500px) {
			justify-content: center;
		}
	}

	.product-discount {
		border-radius: 5px;
		color: color(white);
		font-family: font(medium);
		font-size: size(large);
		padding: 8px 15px;

		@media (max-width: 500px) {
			display: none;
		}
	}

	.product-content {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: 0 5px;
		padding: 0 25px;
		text-align: center;

		div {
			margin: 0 15px;
		}

		@media (max-width: 500px) {
			padding: 0 10px;
		}
	}

	.product-description-wrapper {
		display: flex;
		flex-direction: column;
		margin: 0 5px !important;
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

	.other-buy {
		font-family: font(regular);
		display: none;

		@media (min-width: 500px) {
			display: block;
			flex-direction: column;
		}
	}

	.product-price {
		text-decoration: line-through;
	}

	.product-rating {
		margin: 0 !important;

		.v-icon {
			padding: 0.3rem !important;
		}
	}
</style>

