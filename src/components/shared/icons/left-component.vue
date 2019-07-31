<template>
	<button class="heart-btn" @click="clicked">
		<svg xmlns="http://www.w3.org/2000/svg" width="13" height="20" viewBox="0 0 13 20">
			<path fill="none" fill-rule="evenodd" stroke="#979797" stroke-width="3" d="M12 2l-9 8 9 8"/>
		</svg>
	</button>
</template>
<script>

function clicked() {
	this.$emit('click', this.value);
}

export default {
	name: 'heart-component',
	inheritAttrs: false,
	methods: {
		clicked,
	},
	props: {
		value: false,
	},
};
</script>
<style lang="scss" scoped>
	.heart-btn {
		align-items: center;
		display: flex;
	}

	.fill-heart {
		fill: transparent;
		stroke: color(primary);
		stroke-width: 1px;
	}

	.fill-heart-active {
		fill: color(primary);
	}
</style>

