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
			:address="selectedWarehouse.name"
			:center="warehouesesCenter"
			:disable-map="disableMapButtonByWarehouse"
			:markers="singleOrMultiMarkersOnWarehouses"
			:options="getWarehouses"
			:zoom="warehousesZoom"
			:value="selectedWarehouse.id"
			@input="warehouseSelected"
		/>
		<responsible-form/>
		<div v-if="getFlagPickUp === 1">
			<address-component
				hide-map-button
				placeholder="Seleccione una dirección"
				item-text="addressLine1"
				item-value="id"
				:options="getDirections"
				:value="selectedDirection.id"
				@input="directionSelected"
			/>
			<new-address v-if="selectedDirection.id === 0"/>
		</div>
		<section class="billing-section">
			<billing/>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const addressComponent = () => import('@/components/order/address-component');
const appButtonOrder = () => import('@/components/shared/buttons/app-button-order');
const billing = () => import('@/components/order/billing');
const coffeeSvg = () => import('@/components/shared/icons/coffee-shop');
const locationSvg = () => import('@/components/shared/icons/location');
const newAddress = () => import('@/components/order/new-address');
const responsibleForm = () => import('@/components/order/responsible-form');

function created() {
	this.$store.dispatch('LOAD_DIRECTIONS', this);
	this.$store.dispatch('LOAD_WAREHOUSES', this);
}

function selected(val) {
	const delivery = val === 1 ? this.favoriteDirection : null;
	this.$store.commit('SET_DELIVERY_PLACE', delivery);
	this.$store.commit('SET_FLAG_PICKUP', val);
}

function warehousesMarkers() {
	const warehousesLocation = this.getWarehouses.reduce((list, w) => {
		const { name, id, location } = w;
		if (location) {
			const { x, y } = location;
			const marker = {};
			marker.id = id;
			marker.name = name;
			marker.location = location ? { lat: x, lng: y } : {};
			return list.concat(marker);
		}
		return list;
	}, []);
	return warehousesLocation;
}


function handlerDeliveryAddress(newDelivery) {
	const { addressLine1, id, location, name } = newDelivery || {};
	if (this.getFlagPickUp === 1) {
		this.clearSelectedWarehouse();
		this.selectedDirection.id = id;
		this.selectedDirection.addressLine1 = addressLine1;
		this.selectedDirection.location = location;
	} else {
		this.clearSelectedDirection();
		this.selectedWarehouse.id = id;
		this.selectedWarehouse.name = name;
		this.selectedWarehouse.location = location;
	}
}

function singleOrMultiMarkersOnWarehouses() {
	return this.selectedWarehouse.id ? [this.selectedWarehouse] : this.warehousesMarkers;
}

function warehouesesCenter() {
	const len = this.singleOrMultiMarkersOnWarehouses.length;
	const avrg = this.singleOrMultiMarkersOnWarehouses.reduce((o, { location }) => {
		const newO = o;
		if (location) {
			const { lat, lng, x, y } = location;
			newO.lat = (newO.lat || 0) + (lat || x);
			newO.lng = (newO.lng || 0) + (lng || y);
			return newO;
		}
		newO.lat = 0;
		newO.lng = 0;
		return newO;
	}, {});
	return { lat: avrg.lat / len, lng: avrg.lng / len };
}

function warehousesZoom() {
	return this.selectedWarehouse.id ? 16 : 12;
}

function disableMapButtonByWarehouse() {
	if (this.selectedWarehouse.id) {
		const { location } = this.selectedWarehouse;
		return !location;
	}
	return false;
}

function warehouseSelected(id) {
	const index = this.getWarehouses.findIndex(war => war.id === id);
	const w = this.getWarehouses[index];
	if (w.location) {
		const { x, y } = w.location;
		w.location = { lat: x, lng: y };
	}
	this.$store.commit('SET_DELIVERY_PLACE', w);
}

function directionSelected(id) {
	const w = this.getDirections.find(war => war.id === id);
	this.$store.commit('SET_DELIVERY_PLACE', w);
}

function clearSelectedDirection() {
	this.selectedDirection = {
		id: 0,
		addressLine1: '',
		location: {},
	};
}

function clearSelectedWarehouse() {
	this.selectedWarehouse = {
		id: 0,
		name: '',
		location: {},
	};
}

function handlerDirectionsChange(newDirections) {
	if (this.getFlagPickUp === 1) {
		this.favoriteDirection = newDirections.find(f => f.isFavorite);
		const directionDelivery = this.getDeliveryAddress || this.favoriteDirection;
		this.$store.commit('SET_DELIVERY_PLACE', directionDelivery);
	} else {
		const warehouseDirection = this.getDeliveryAddress || this.selectedWarehouse;
		this.$store.commit('SET_DELIVERY_PLACE', warehouseDirection);
	}
}

function data() {
	return {
		favoriteDirection: {},
		selectedDirection: {
			id: 0,
			addressLine1: '',
			location: {},
		},
		selectedWarehouse: {
			id: 0,
			name: '',
			location: {},
		},
	};
}

export default {
	name: 'delivery',
	components: {
		addressComponent,
		appButtonOrder,
		billing,
		coffeeSvg,
		locationSvg,
		newAddress,
		responsibleForm,
	},
	computed: {
		...mapGetters([
			'getDeliveryAddress',
			'getFlagPickUp',
			'getDirections',
			'getWarehouses',
		]),
		disableMapButtonByWarehouse,
		singleOrMultiMarkersOnWarehouses,
		warehouesesCenter,
		warehousesMarkers,
		warehousesZoom,
	},
	created,
	data,
	methods: {
		clearSelectedDirection,
		clearSelectedWarehouse,
		directionSelected,
		handlerDeliveryAddress,
		handlerDirectionsChange,
		selected,
		warehouseSelected,
	},
	watch: {
		getDeliveryAddress: {
			deep: true,
			handler: handlerDeliveryAddress,
		},
		getDirections: handlerDirectionsChange,
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

		@media (max-width: 600px) {
			font-size: size(msmall);
		}
	}

	.responsible {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 30px;
	}

	.responsible-field {
		flex: 1 1 47%;
		height: 68px;
	}

	.billing-section {
		margin-top: 50px;
	}
</style>

