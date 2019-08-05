<template>
	<div>
		<section class="grid-areas">
			<img :src="product.urlImage" alt="imagen del producto" class="product-img image">
			<div class="description">
				<p class="product-title">Producto</p>
				<p class="product-content">{{product.description}}</p>
				<p class="product-brand">{{product.warehouseProduct.brand.name}}</p>
			</div>
			<div class="price">
				<p class="product-title">Precio UND</p>
				<p class="product-price">{{product.priceDiscount}}</p>
			</div>
			<div class="quantity">
				<p class="product-title">Cantidad</p>
				<p class="product-quantity">{{product.quantity}}</p>
			</div>
			<div class="total">
				<p class="product-title">Total</p>
				<p class="product-price">{{product.total}}</p>
			</div>
			<div class="comments">
				<app-input/>
			</div>
		</section>
		<section></section>
	</div>
</template>
<script>
export default {
	name: 'product-in-car',
	components: {
		appInput: () => import('@/components/shared/inputs/app-input'),
	},
	props: {
		product: {
			default: () => {},
			type: Object,
		},
	},
};
</script>
<style lang="scss" scoped>
	.grid-areas {
		background-color: color(background);
		border-radius: 20px;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
		display: grid;
		grid-gap: 20px;
		grid-template-areas:
			"image description price quantity total"
			"image comments comments comments comments";
		grid-template-columns: repeat(4, minmax(125px, 1fr)) 60px;
		margin-bottom: 10px;
		padding: 22px 34px;

		@media (max-width: 600px) {
			grid-template-areas:
				"image description description"
				"price quantity total"
				"comments comments comments";
			grid-template-columns: repeat(3, minmax(60px, 1fr));
		}
	}

	.comments {
		grid-area: comments;
	}

	.image {
		grid-area: image;
	}

	.description {
		grid-area: description;
	}

	.price {
		grid-area: price;
	}

	.quantity {
		grid-area: quantity;
	}

	.total {
		grid-area: total;
	}

	.product-img {
		height: 136px;
		object-fit: contain;
		width: 120px;
	}

	.product-title {
		color: color(secondary);
		font-family: font(bold);
	}

	.product-content {
		color: color(dark);
		font-family: font(demi);
		font-size: size(msmall);
		font-weight: bold;
		height: 45px;
		margin-bottom: 5px;
		text-align: left;
		width: 130px;
	}

	.product-brand {
		color: color(base);
		font-size: size(msmall);
	}

	.product-price {
		color: color(dark);
		font-family: font(bold);
		font-size: size(medium);
	}

	.product-quantity {
		color: color(base);
		font-family: font(bold);
		font-size: size(large);
	}
</style>
