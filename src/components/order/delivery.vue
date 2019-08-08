<template>
	<div>
		<section class="delivery">
			<app-button-order
				button-title="Envío a Domicilio"
				class="btn"
				:active="getFlagPickUp === 1"
				@click="selected(1)"
			>
				<location-svg :active="getFlagPickUp === 1"/>
			</app-button-order>
			<app-button-order
				button-title="Recoger en Tienda"
				class="btn"
				@click="selected(2)"
				:active="getFlagPickUp === 2"
			>
				<coffee-svg :active="getFlagPickUp === 2"/>
			</app-button-order>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const appButtonOrder = () => import('@/components/shared/buttons/app-button-order');
const locationSvg = () => import('@/components/shared/icons/location');
const coffeeSvg = () => import('@/components/shared/icons/coffee-shop');

function selected(val) {
	this.$store.commit('SET_FLAG_PICKUP', val);
}

function data() {
	return {
		selectedDelivery: 1,
	};
}

export default {
	name: 'delivery',
	components: {
		appButtonOrder,
		coffeeSvg,
		locationSvg,
	},
	computed: {
		...mapGetters([
			'getFlagPickUp',
		]),
	},
	data,
	methods: {
		selected,
	},
};
</script>
<style lang="scss" scoped>
	.delivery {
		align-items: center;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.btn {
		flex: 1 1 40%;
		margin: 0 10px;
	}
</style>

