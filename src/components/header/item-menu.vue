<template>
	<div>
		<img :src="data.urlImage" :alt="data.name">
		<span>{{data.name}}</span>
	</div>
</template>
<script>
export default {
	name: 'item-menu',
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>

