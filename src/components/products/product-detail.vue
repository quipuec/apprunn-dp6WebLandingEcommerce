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
	}
</style>


