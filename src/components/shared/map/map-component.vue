<template>
	<GmapMap
		:center="center"
		:zoom="zoom"
		style="width:100%;height:400px;"
		@click="setCoords"
	>
	<GmapMarker
		:key="index"
		v-for="(m, index) in markers"
		:position="m.position"
		:clickable="true"
		:draggable="true"
		@click="selectedMarker(m)"
	/>
	</GmapMap>	
</template>
<script>

function selectedMarker(args) {
	this.$store.commit('SET_DELIVERY_PLACE', args);
}

function setCoords(args) {
	console.log(args.latLng.lat());
}

export default {
	name: 'map-component',
	methods: {
		setCoords,
		selectedMarker,
	},
	props: {
		center: {
			default() {
				return {
					lat: -12.1192694,
					lng: -77.0290169,
				};
			},
			type: Object,
		},
		markers: {
			default: () => [],
			type: Array,
		},
		zoom: {
			default: 12,
			type: Number,
		},
	},
};
</script>
