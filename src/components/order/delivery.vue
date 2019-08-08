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
		<address-component
			v-if="getFlagPickUp === 2"
			class="mt-4"
			placeholder="Seleccione una tienda"
			item-text="name"
			item-value="id"
			:options="getWarehouses"
			v-model="selectedWarehouse"
		/>
		<responsible-form/>
		<div v-if="getFlagPickUp === 1">
			<address-component
				placeholder="Seleccione una dirección"
				item-text="addressLine1"
				item-value="id"
				:options="getDirections"
				v-model="selectedDirection"
			/>
			<new-address/>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const addressComponent = () => import('@/components/order/address-component');
const appButtonOrder = () => import('@/components/shared/buttons/app-button-order');
const coffeeSvg = () => import('@/components/shared/icons/coffee-shop');
const locationSvg = () => import('@/components/shared/icons/location');
const newAddress = () => import('@/components/order/new-address');
const responsibleForm = () => import('@/components/order/responsible-form');

function created() {
	this.$store.dispatch('LOAD_DIRECTIONS', this);
	this.$store.dispatch('LOAD_WAREHOUSES', this);
	this.selectedDirection = 0;
	this.selectedWarehouse = 0;
}

function selected(val) {
	this.$store.commit('SET_FLAG_PICKUP', val);
}

function data() {
	return {
		selectedDirection: null,
		selectedWarehouse: null,
	};
}

export default {
	name: 'delivery',
	components: {
		addressComponent,
		appButtonOrder,
		coffeeSvg,
		locationSvg,
		newAddress,
		responsibleForm,
	},
	computed: {
		...mapGetters([
			'getFlagPickUp',
			'getDirections',
			'getWarehouses',
		]),
	},
	created,
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

