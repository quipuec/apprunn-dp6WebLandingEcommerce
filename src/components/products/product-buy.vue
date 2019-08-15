<template>
  <div class="product-buy">
		<div>
			<button class="btn-stores" @click="$emit('open-dialog')">Ver tiendas disponibles</button>
		</div>
		<div class="container-buttons">
			<quantityButton 
				class="continer-quantity-button"
				@click="clickQuantity"
				:number="number"/>
			<app-button-order
				button-title="¡LO QUIERO!"
				class="btn"
				@click="$emit('add-to-car')"
			>
				<div slot="after">
					<image-check class="image-btn"/>
				</div>
			</app-button-order>
		</div>
	</div>
</template>
<script>
const quantityButton = () => import('@/components/shared/buttons/quantity-button');
const appButtonOrder = () => import('@/components/shared/buttons/app-button-order');
const imageCheck = () => import('@/components/shared/icons/check-component');

function clickQuantity(value) {
	this.$emit('click', value);
}

export default {
	name: 'product-buy',
	components: {
		quantityButton,
		appButtonOrder,
		imageCheck,
	},
	methods: {
		clickQuantity,
	},
	props: {
		number: Number,
	},
};
</script>
<style lang="scss" scoped>
	.product-buy {
		.btn {
			width: 197px;
		}

		.image-btn {
			margin-left: 4px;
		}

		.btn-stores {
			border-bottom: 1px solid color(dark);
			font-size: size(small);
			margin-bottom: 18px;
		}

		.container-buttons {
			display: flex;
		}

		.continer-quantity-button {
			margin-right: 17px;
		}
	}
</style>