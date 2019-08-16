<template>
	<div class="product-detail">
		<div>
			<heart-component 
				v-model="data.flagFavorite"
				class="container-like"
				@click="addToFavorites"
				:value="data.flagFavorite"/>
		</div>
		<div class="container-detail-information">
			<div class="container-detail-name">
				<p class="product-detail-name">{{data.name}}</p>
				<p class="product-detail-brand">{{getBrandName(data) || '--'}}</p>
			</div>
			<div class="d-center container-code-rating">
				<span class="product-detail-code">#{{data.code}}</span>
				<div class="container-rating d-center">
					<v-rating
						small
						class="product-rating"
						background-color="#ffcc03"
						:color="globalColors.highLight"
						v-model="data.rating"
						readonly>
					</v-rating>
					<span class="text-rating">{{ data.rating }} / 5</span>
				</div>
			</div>
		</div>
		<div class="container-detail-bottom">
			<div class="d-center mt-25">
				<span class="text-price-dis" :style="`color: ${globalColors.secondary}`">{{getCurrencySymbol}} {{data.priceDiscount || ''}}</span>
				<div class="content-discount">{{getDiscont}}%</div>
			</div>
			<span class="text-price">{{getCurrencySymbol}} {{data.price || ''}}</span>
		</div>
		<product-childrens 
			:features="features"
			@select="selecFeature"
			@clear="$emit('clear')"/>
		<product-buy 
			@click="clickQuantity"
			@add-to-car="addToCar"
			@open-dialog="$emit('open-dialog')"
			:number="data.quantity"/>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import lib from '@/shared/lib';

const heartComponent = () => import('@/components/shared/icons/heart-component');
const productChildrens = () => import('@/components/products/product-childrens');
const productBuy = () => import('@/components/products/product-buy');

function stopClick() {
	return false;
}

async function addToFavorites() {
	this.$store.dispatch('SET_FAVORITE_FLAG', { context: this, product: this.data });
	this.$set(this.data, 'flagFavorite', !this.data.flagFavorite);
}

function getDiscont() {
	return this.data.percentageDiscount * 100;
}

function selecFeature(index, value) {
	this.$emit('select', index, value);
}

function clickQuantity(value) {
	this.$emit('click-quantity', value);
}

function noStock() {
	const stock = !!this.data.stock;
	const positiveStock = this.data.stock > 0;
	return !(stock && positiveStock);
}

function addToCar() {
	if (!this.noStock) {
		this.$store.dispatch('addProductToBuyCar', this.data);
		this.goTo('buy');
	} else {
		this.showGenericError('Producto sin stock');
	}
}

function getBrandName(data) {
	return lib.getDeeper('warehouseProduct.brand.name')(data);
}

export default {
	name: 'product-detail',
	components: {
		heartComponent,
		productChildrens,
		productBuy,
	},
	computed: {
		...mapGetters([
			'getCurrencySymbol',
			'token',
		]),
		getDiscont,
		noStock,
	},
	methods: {
		addToCar,
		addToFavorites,
		clickQuantity,
		getBrandName,
		stopClick,
		selecFeature,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		features: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-detail-name {
		color: color(dark);
		font-family: font(bold);
		font-size: size(xlarge);
		margin: 20px 0 5px 0;
	}

	.product-detail-code {
		color: color(base);
		flex: 1 1 30%;
		font-size: size(medium);

		@media screen and (max-width: 996px) {
			display: none;
		}
	}

	.d-center {
		align-items: center;
		display: flex;
	}

	.container-rating  {
		flex: 1 1 70%;

		@media screen and (max-width: 996px) {
			align-items: flex-end;
			flex-direction: column;
		}
	}

	.text-rating {
		color: color(base);
		font-size: size(small);
		margin-left: 8px;
	}

	.text-price-dis {
		font-family: font(bold);
		font-size: 23px;
	}

	.content-discount {
		align-items: center;
		background: color(primary);
		border-radius: 5px;
		color: color(white);
		display: flex;
		height: 18px;
		justify-content: center;
		font-size: size(msmall);
		margin-left: 10px;
		width: 45px;
	}

	.text-price {
		color: color(border);
		font-family: font(bold);
		font-size: size(large);
		position: relative;

		&::before {
			border-color: color(border);
			border-top: 2px solid;
			content: "";
			left: 0;
			position: absolute;
			right: 0;
			top: 50%;
			transform:rotate(-10deg);
		}
	}

	.mt-25 {
		margin: 25px 0 15px 0;

		@media screen and (max-width: 996px) {
			margin: 0;
		}
	}

	.product-detail {
		@media screen and (max-width: 996px) {
			margin-top: 39px;
		}
	}

	.container-like {
		@media screen and (max-width: 996px) {
			margin: auto;
		}
	}

	.container-detail-information {
		@media screen and (max-width: 996px) {
			display: flex;
			padding: 0 5%;
		}
	}

	.container-detail-name {
		@media screen and (max-width: 996px) {
			flex: 1 1 60%;
		}
	}

	.container-code-rating {
		@media screen and (max-width: 996px) {
			flex: 1 1 40%;
		}
	}

	.product-detail-brand {
		font-size: size(small);
		text-transform: uppercase;

		@media screen and (max-width: 996px) {
			font-size: size(xsmall);
		}
	}

	.container-detail-bottom {
		@media screen and (max-width: 996px) {
			padding: 0 5%;
			margin-bottom: 50px;
		}
	}
</style>


