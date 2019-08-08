<template>
	<div class="product-detail">
		<div>
			<heart-component v-model="data.favorite"/>
		</div>
		<div>
			<div>
				<p class="product-detail-name">{{data.name}}</p>
			</div>
			<div class="d-center">
				<span class="product-detail-code">{{data.code}}</span>
				<div class="container-rating d-center">
					<v-rating
						small
						class="product-rating"
						background-color="#ffcc03"
						color="#ffcc03"
						v-model="data.rating">
					</v-rating>
					<span class="text-rating">{{ data.rating }} / 5</span>
				</div>
			</div>
		</div>
		<div>
			<div>
				<p class="text-price-dis" :style="`color: ${globalColors.secondary}`">{{getCurrencySymbol}} {{data.priceDiscount || ''}}</p>
				<div>-20%</div>
			</div>
			<p>{{getCurrencySymbol}} {{data.price || ''}}</p>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const heartComponent = () => import('@/components/shared/icons/heart-component');

export default {
	name: 'product-detail',
	components: {
		heartComponent,
	},
	computed: {
		...mapGetters([
			'getCurrencySymbol',
		]),
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
	}

	.content-text-rating {
		// display: flex;
	}

	.d-center {
		align-items: center;
		display: flex;
	}

	.container-rating  {
		flex: 1 1 70%;
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
</style>


