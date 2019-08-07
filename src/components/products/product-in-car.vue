<template>
	<div class="product-container">
		<section class="grid-areas">
			<img :src="product.urlImage" alt="imagen del producto" class="product-img image">
			<div class="description">
				<p class="product-title">Producto</p>
				<p class="product-content">{{product.description}}</p>
				<p class="product-brand">{{product.warehouseProduct.brand.name}}</p>
			</div>
			<div class="price text-xs-center">
				<p class="product-title">Precio UND</p>
				<p class="product-price">{{product.priceDiscount}}</p>
			</div>
			<div class="quantity text-xs-center">
				<p class="product-title">Cantidad</p>
				<p class="product-quantity">{{product.quantity}}</p>
			</div>
			<div class="total text-xs-center">
				<p class="product-title">Total</p>
				<p class="product-price">{{product.total}}</p>
			</div>
			<div class="comments">
				<text-area
					v-if="show"
					label="Comentarios"
					v-model="comments"
				/>
			</div>
		</section>
		<section class="actions">
			<trash-component class="action"/>
			<comments-component class="action" @click="showComments"/>
		</section>
	</div>
</template>
<script>
const textArea = () => import('@/components/shared/inputs/text-area');
const commentsComponent = () => import('@/components/shared/icons/comments-component');
const trashComponent = () => import('@/components/shared/icons/trash-component');

function showComments() {
	this.show = !this.show;
}

function data() {
	return {
		comments: '',
		show: false,
	};
}

export default {
	name: 'product-in-car',
	components: {
		commentsComponent,
		textArea,
		trashComponent,
	},
	data,
	methods: {
		showComments,
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
	.product-container {
		background-color: color(background);
		border-radius: 20px;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
		display: flex;
		flex-wrap: wrap;
		margin-bottom: 10px;
		padding: 22px 34px 5px;
	}

	.grid-areas {
		border-right: 1px solid color(border);
		display: grid;
		grid-gap: 15px;
		grid-template-areas:
			"image description price quantity total"
			"image comments comments comments comments";
		grid-template-columns: repeat(4, minmax(125px, 1fr)) 60px;
		padding-right: 10px;

		@media (max-width: 600px) {
			border-right: none;
			border-bottom: 1px solid color(border);
			grid-template-areas:
				"image description description"
				"price quantity total"
				"comments comments comments";
			grid-template-columns: 1fr repeat(2, minmax(45px, 1fr));
			padding: 0 0 10px 0;
		}
	}

	.comments {
		grid-area: comments;
		margin-top: 20px;

		@media (max-width: 600px) {
			margin: 0;
		}
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
		height: 30px;
		margin-bottom: 5px;
		overflow: hidden;
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

	.actions {
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin: auto;
		padding-left: 34px;

		@media (max-width: 600px) {
			flex-direction: row;
		}
	}

	.action {
		margin: 5px;
	}
</style>
