<template>
	<div class="item-menu" @click="$emit('click-item', data)">
		<simple-svg
			:filepath="data.urlImage"
			:fill="data.select ? colorSelect : null"
			:width="'31'" />
		<span class="item-text" :style="data.select ? `color: ${colorSelect}` : '#4a4a4a'">{{data.name}}</span>
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
		colorSelect: String,
	},
};
</script>
<style lang="scss" scoped>
	.item-menu {
		align-items: center;
		display: flex;
	}

	.item-text {
		color: color(dark);
		font-family: font(bold);
		font-size: size(medium);
		margin-left: 12px;
	}
</style>


