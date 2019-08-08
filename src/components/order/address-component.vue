<template>
	<div class="address-container mx-2">
		<app-select
			class="address-select"
			v-bind="$attrs"
			:items="options"
			:value="value"
			@input="sendValue"
		/>
		<app-button-img :data="objImg" class="map-button" @click-image="openModal"/>
		<modal-component v-model="showMap">
			<map-component/>
		</modal-component>
	</div>
</template>
<script>
const appButtonImg = () => import('@/components/shared/buttons/app-button-image');
const appSelect = () => import('@/components/shared/inputs/app-select');
const mapComponent = () => import(/* webpackChunkName: mapComponent */ '@/components/shared/map/map-component');
const modalComponent = () => import('@/components/shared/modal/modal-component');

function sendValue(val) {
	this.$emit('input', val);
}

function openModal() {
	this.showMap = true;
}

function data() {
	return {
		objImg: {
			image: '/static/icons/location.svg',
			name: 'imagen representativa del mapa',
		},
		showMap: false,
	};
}

export default {
	name: 'address-component',
	components: {
		appButtonImg,
		appSelect,
		mapComponent,
		modalComponent,
	},
	data,
	inheritAttrs: false,
	methods: {
		openModal,
		sendValue,
	},
	props: {
		options: {
			default: () => [],
			type: Array,
		},
		value: null,
	},
};
</script>
<style lang="scss" scoped>
	.address-container {
		align-items: center;
		display: flex;
		height: 46.8px;
	}

	.map-button {
		align-items: center;
		background-color: color(primary);
		border: 1px solid color(primary);
		display: flex;
		height: 100%;
		justify-content: center;
		transform: translateX(-10px);
		width: 45px;
	}

	.address-select {
		width: calc(100% - 45px);
	}
</style>

