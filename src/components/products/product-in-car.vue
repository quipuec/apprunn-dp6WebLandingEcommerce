<template>
	<div>
		<section class="grid-areas">
			<img src="" alt="imagen del producto" class="product-img image">
			<div class="description">
				<p class="product-title">Producto</p>
				<p class="product-content">Contenido del producto como por ejemplo la descripción</p>
				<p class="product-brand">marca del producto</p>
			</div>
			<div class="price">
				<p class="product-title">Precio UND</p>
				<p class="product-price">$47.99</p>
			</div>
			<div class="quantity">
				<p class="product-title">Cantidad</p>
				<p class="product-quantity">1</p>
			</div>
			<div class="total">
				<p class="product-title">Total</p>
				<p class="product-price">$47.99</p>
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
};
</script>
<style lang="scss" scoped>
	.grid-areas {
		display: grid;
		grid-template-areas: '
			image description price quantity total
			image comments comments comments comments';
		grid-template-columns: 5fr;
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
