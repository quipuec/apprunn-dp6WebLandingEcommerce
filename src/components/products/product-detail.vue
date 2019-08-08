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
			</div>
			<div class="d-center container-code-rating">
				<span class="product-detail-code">{{data.code}}</span>
				<div class="container-rating d-center">
					<v-rating
						small
						class="product-rating"
						background-color="#ffcc03"
						color="#ffcc03"
						v-model="data.rating"
						readonly>
					</v-rating>
					<span class="text-rating">{{ data.rating }} / 5</span>
				</div>
			</div>
		</div>
		<div>
			<div class="d-center mt-25">
				<span class="text-price-dis" :style="`color: ${globalColors.secondary}`">{{getCurrencySymbol}} {{data.priceDiscount || ''}}</span>
				<div class="content-discount">{{data.percentageDiscount | round }}</div>
			</div>
			<span class="text-price">{{getCurrencySymbol}} {{data.price || ''}}</span>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const heartComponent = () => import('@/components/shared/icons/heart-component');

function stopClick() {
	return false;
}

async function addToFavorites() {
	if (this.token) {
		this.isLoading = true;
		const headers = {
			Authorization: `Bearer ${this.token}`,
		};
		const url = `products/favorite/${this.data.id}`;
		const body = {
			isFavorite: !this.data.flagFavorite,
		};
		await this.$httpProducts.post(url, body, { headers });
		this.$emit('update');
	} else {
		this.showNotification('Debe iniciar sesión para agregar a favoritos', 'info');
	}
}

export default {
	name: 'product-detail',
	components: {
		heartComponent,
	},
	computed: {
		...mapGetters([
			'getCurrencySymbol',
			'token',
		]),
	},
	methods: {
		stopClick,
		addToFavorites,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-detail-name {
		color: color(dark);
		font-family: font(bold);
		font-size: size(xlarge);
		margin: 20px 0 31px 0;
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
</style>


