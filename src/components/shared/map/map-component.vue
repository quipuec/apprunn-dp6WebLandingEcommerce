<template>
	<GmapMap
		:center="center"
		:zoom="15"
		map-type-id="terrain"
		style="width:100%;height: 400px;"
	>
	<GmapMarker
		:key="index"
		v-for="(m, index) in markers"
		:position="m.position"
		:clickable="true"
		:draggable="true"
		@click="center=m.position"
	/>
	</GmapMap>	
</template>
<script>

function data() {
	return {
		center: {
			lat: -77.0254634,
			lng: -12.1190273,
		},
		markers: [
			{
				position: {
					lat: 70,
					lng: 12,
				},
			},
		],
	};
}

export default {
	name: 'map-component',
	data,
};
</script>
