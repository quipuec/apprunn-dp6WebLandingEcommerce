<template>
  <div class="product-buy">
		<div>
			<button>Ver tiendas disponibles</button>
		</div>
		<div>
			<quantityButton />
			<app-button-order
				button-title="¡LO QUIERO!"
				class="btn"
			>
				<div slot="after">
					<image-check />
				</div>
			</app-button-order>
		</div>
	</div>
</template>
<script>
const quantityButton = () => import('@/components/shared/buttons/quantity-button');
const appButtonOrder = () => import('@/components/shared/buttons/app-button-order');
const imageCheck = () => import('@/components/shared/icons/check-component');

export default {
	name: 'product-buy',
	components: {
		quantityButton,
		appButtonOrder,
		imageCheck,
	},
};
</script>
<style lang="scss" scoped>

</style>