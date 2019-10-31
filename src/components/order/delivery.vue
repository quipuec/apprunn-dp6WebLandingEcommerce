<template>
	<div class="main-container-delivery">
		<div class="section-title">
			<img :src="logo.section" alt="logo del método de pago">
			<h2 class="payment-section-title">¿COMÓ QUIERES RECIBIR TU PRODUCTO?</h2>
		</div>
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
				item-text="name"
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
import lib from '@/shared/lib';

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
	this.$store.commit('SET_DELIVERY_PLACE', null);
	if (!lib.isEmpty(this.getOrderInfo)) {
		this.$store.commit('SET_DELIVERY_PLACE', this.getOrderInfo.deliveryAddress);
		this.selectedDirection = this.getOrderInfo.deliveryAddress || this.selectedDirection;
	}
}

function selected(val) {
	let delivery = null;
	if (val === 1) {
		delivery = this.favoriteDirection;
		this.calculateShippingCost(delivery);
	} else {
		this.$store.commit('SET_SHIPPING_COST', 0);
	}
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
		this.selectedDirection.name = name;
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
	if (id === 0) {
		this.$store.commit('SET_SHIPPING_COST', 0);
	} else {
		this.calculateShippingCost(w);
		if (!lib.isEmpty(this.getCustomerAddress)) {
			this.$store.commit('SET_CUSTOMER_ADDRESS', null);
		}
	}
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

function handlerDirectionsChange() {
	if (this.getFlagPickUp === 1) {
		const directionDelivery = this.getDeliveryAddress || this.favoriteDirection;
		this.$store.commit('SET_DELIVERY_PLACE', directionDelivery);
		this.calculateShippingCost(directionDelivery);
	} else {
		const warehouseDirection = this.getDeliveryAddress || this.selectedWarehouse;
		this.$store.commit('SET_DELIVERY_PLACE', warehouseDirection);
	}
}

function favoriteDirection() {
	return this.getDirections.find(f => f.isFavorite);
}

async function calculateShippingCost(location) {
	const { provinceId } = location;
	const url = '/weight/price';
	const body = this.buildBody(provinceId);
	try {
		const { data: amount } = await this.$httpProducts.post(url, body);
		this.$store.commit('SET_SHIPPING_COST', amount || 0);
	} catch (error) {
		if (error.data.message === 'PRICE_NOT_CONFIGURATION') {
			this.$store.commit('SET_SHIPPING_COST', 0);
			this.showNotification('No es posible hacer envios a ese destino.', 'error');
		}
	}
}

function buildBody(provinceId) {
	const details = this.getProductToBuy.map((p) => {
		const newP = {};
		newP.weight = p.weigth || 0;
		newP.quantity = p.quantity;
		return newP;
	});
	return {
		details,
		provinceId,
	};
}

function beforeDestroy() {
	this.$store.commit('SET_DELIVERY_PLACE', null);
	this.$store.commit('SET_SHIPPING_COST', 0);
}

function data() {
	return {
		logo: {
			section: '/static/icons/delivery-truck.svg',
		},
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
	beforeDestroy,
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
			'getCustomerAddress',
			'getDeliveryAddress',
			'getDirections',
			'getFlagPickUp',
			'getOrderInfo',
			'getProductToBuy',
			'getWarehouses',
		]),
		disableMapButtonByWarehouse,
		favoriteDirection,
		singleOrMultiMarkersOnWarehouses,
		warehouesesCenter,
		warehousesMarkers,
		warehousesZoom,
	},
	created,
	data,
	methods: {
		buildBody,
		calculateShippingCost,
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

	.payment-section-title {
		font-size: size(large);
		font-family: font(bold);
		margin-left: 12px;
		text-transform: uppercase;
	}

	.section-title {
		align-items: baseline;
		display: flex;
		justify-content: flex-start;
		margin-bottom: 40px;
	}

	.main-container-delivery {
		margin-top: 60px;
	}
</style>
