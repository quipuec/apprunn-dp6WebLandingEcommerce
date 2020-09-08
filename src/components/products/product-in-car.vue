<template>
	<div class="product-container">
		<section class="grid-areas">
			<img
				:src="product.imagePresentation"
				alt="imagen del producto"
				class="product-img image"
			>
			<div class="description">
				<p
					:style="`color: ${globalColors.primary};`"
					class="product-title"
				>Producto</p>
				<p
					:style="`color: ${globalColors.title};`"
					class="product-content">{{product.description}}</p>
				<p class="product-brand">{{product.brand}}</p>
			</div>
			<div class="price">
				<p
					:style="`color: ${globalColors.primary};`"
					class="product-title">P.U.</p>
				<p class="product-price">{{getCurrencySymbol}} {{ product.priceDiscount | currencyFormat }}</p>
			</div>
			<div class="quantity">
				<p
					:style="`color: ${globalColors.primary};`"
					class="product-title">Cantidad</p>
				<div v-if="stepOne" class="quantity-button-container">
					<quantityButton
						class="continer-quantity-button"
						:number="product.quantity"
						@click="clickQuantity"
					/>
				</div>
				<p class="product-quantity" v-else>{{product.quantity}}</p>
			</div>
			<div class="total text-xs-center">
				<p
					:style="`color: ${globalColors.primary};`"
					class="product-title">Total</p>
				<p class="product-price">{{getCurrencySymbol}} {{product.total | currencyFormat}}</p>
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
			<comments-component class="action" @click="showComments"/>
			<trash-component class="action" @click="deleteProduct"/>
		</section>
	</div>
</template>
<script>
import commentsComponent from '@/components/shared/icons/comments-component';
import textArea from '@/components/shared/inputs/text-area';
import trashComponent from '@/components/shared/icons/trash-component';
import quantityButton from '@/components/shared/buttons/quantity-button';
import { mapGetters } from 'vuex';

function showComments() {
	this.show = !this.show;
}

function clickQuantity(val) {
	let { quantity } = this.product;
	const opt = {
		more: 1,
		less: -1,
	};
	quantity += opt[val];
	quantity = quantity < 1 ? 1 : quantity;
	this.$set(this.product, 'quantity', quantity);
	this.$forceUpdate();
	this.$store.commit('UPDATE_PRODUCTS_TO_BUY', { product: this.product, context: this });
}

function stepOne() {
	return this.$route.meta.step === 1;
}

function deleteProduct() {
	const { id, unitSelected } = this.product;
	this.$store.commit('DELETE_PRODUCT_BUY_CAR', { id, unitSelected });
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
		quantityButton,
	},
	computed: {
		...mapGetters([
			'getCurrencySymbol',
		]),
		stepOne,
	},
	data,
	methods: {
		clickQuantity,
		deleteProduct,
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
		margin-bottom: 10px;
		padding: 20px 10px;
	}

	.grid-areas {
		border-bottom: 1px solid color(border);
		display: grid;
		grid-gap: 5px;
		grid-template-areas:
			"image image image image"
			"description description description description"
			"price quantity quantity total";
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: 1fr 0.2fr 0.2fr;
		margin-bottom: 10px;
		padding-bottom: 8px;

		@media (min-width: 768px) {
			grid-gap: 10px;
			grid-template-columns: 1fr 1fr 0.5fr 1fr 0.7fr;
			grid-template-areas:
				"image image description description description "
				"image image price quantity total"
				"comments comments comments comments comments";
			margin-bottom: 0px;
		}
	}

	.comments {
		display: none;
		grid-area: comments;
		margin-top: 20px;
		margin: 0;

		@media (min-width: 768px) {
			display: block;
		}
	}

	.image {
		grid-area: image;
	}

	.description {
		grid-area: description;
		place-self: flex-start;
		margin-top: 15px;
		padding-left: 15px;
		width: 100%;
		@media (min-width: 768px) {
			padding-left: 0;
		}
	}

	.price {
		grid-area: price;
		padding-left: 15px;
		@media (min-width: 768px) {
			padding-left: 0px;
		}
	}

	.quantity {
		align-items: center;
		display: flex;
		flex-direction: column;
		grid-area: quantity;
		place-self: stretch;

		@media (min-width: 768px) {
			justify-self: center;
		}
	}

	.total {
		grid-area: total;
		place-self: flex-end;
		padding-right: 10px;

		@media (min-width: 768px) {
			place-self: stretch;
		}
	}

	.product-img {
		height: 136px;
		object-fit: contain;
		width: 100%;

		@media (min-width: 768px) {
			height: 100%;
		}
	}

	.product-title {
		font-family: font(regular);
		margin-bottom: 0;
	}

	.product-content {
		color: color(dark);
		font-family: font(regular);
		font-size: size(large);
		font-weight: bold;
		margin-bottom: 5px;
		padding-right: 2rem;
		text-align: left;
		width: inherit;
	}

	.product-brand {
		color: color(base);
		font-size: size(msmall);
	}

	.product-price {
		color: color(dark);
		font-family: font(heavy);
		font-size: size(medium);
		white-space: nowrap;
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
		justify-content: space-between;
		margin: auto;
		flex-direction: row;
	}

	.action {
		margin: 5px 15px;
	}

	.continer-quantity-button {
		margin-top: -12px;
	}

	.quantity-button-container {
		display: flex;
		justify-content: center;
		margin-top: 16px;
	}
</style>
