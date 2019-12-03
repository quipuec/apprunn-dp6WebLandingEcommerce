<template>
	<div class="product-detail">
		<div>
			<heart-component 
				v-model="data.flagFavorite"
				class="container-like"
				@click="addToFavorites"
				:value="data.flagFavorite"
			/>
		</div>
		<div class="container-detail-information">
			<div class="container-detail-name">
				<p
					:class="[isLoading ? 'loading' : 'product-detail-name']"
				>{{ data.name }}</p>
				<p
					:class="[isLoading ? 'loading' : 'product-detail-brand']"
				>{{ getBrandName(data) || '--' }}</p>
			</div>
			<div class="d-center container-code-rating">
				<span
					:class="[isLoading ? 'loading' : 'product-detail-code']"
				>#{{ data.code }}</span>
				<div
					:class="[
						isLoading ? 'loading rating-loading' : 'container-rating d-center',
					]"
				>
					<v-rating
						v-show="!isLoading"
						small
						class="product-rating"
						background-color="#ffcc03"
						:color="globalColors.highLight"
						v-model="data.rating"
						readonly
					></v-rating>
					<span
						v-show="!isLoading"
						class="text-rating"
					>{{ data.rating }} / 5</span>
				</div>
			</div>
		</div>
		<div class="container-detail-bottom">
			<div v-if="data.priceDiscount" class="d-center mt-25">
				<span
					:class="[isLoading ? 'loading' : 'text-price-dis']"
					:style="`color: ${globalColors.secondary}`"
				>
					{{ getCurrencySymbol }} {{ data.priceDiscount }}
				</span>
				<div
					:style="`background: ${globalColors.primary};`"
					:class="[isLoading ? 'loading' : 'content-discount']"
				>
					- {{ getDiscont }}%
				</div>
			</div>
			<span
				:class="[
					isLoading ? 'loading' : data.priceDiscount ? 'text-price' : 'text-price-dis',
				]"
				:style="`color: ${globalColors.secondary}`"
			>
				{{ getCurrencySymbol }} {{ data.price }}
			</span>
		</div>
		<ProductConversions
			:default-unit="data.unit"
			:conversions="data.conversions"
			@unit-selection="$emit('unit-selection', $event)"
		/>
		<product-childrens 
			:features="features"
			@selected="selecFeature"
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
	return Math.round(Number(this.data.percentageDiscount) * 100);
}

function selecFeature(value) {
	this.$emit('selected', value);
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
	if (this.token) {
		if (!this.noStock) {
			this.$store.dispatch('addProductToBuyCar', this.data);
			this.goTo('buy');
		} else {
			this.showGenericError('Producto sin stock');
		}
	} else {
		this.showGenericError('Debe iniciar sesión');
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
		ProductConversions: () => import('@/components/products/product-conversions'),
		productBuy,
	},
	computed: {
		...mapGetters([
			'getCurrencySymbol',
			'token',
		]),
		...mapGetters('loading', [
			'isLoading',
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
			default: () => {},
			type: Object,
		},
		features: {
			default: () => [],
			type: Array,
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
		color: color(border) !important;
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
		margin-bottom: 5px;
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

	.rating-loading {
		height: 21px;
		margin-left: 10px;
		width: 100%;
	}
</style>


