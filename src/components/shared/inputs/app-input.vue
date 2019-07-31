<template>
	<div>
		<input
			v-bind="$attrs"
			class="app-input"
			:style="`border-color: ${borderColor}`"
		/>
	</div>
</template>

<script>
	export default {
		name: 'app-input',
		inheritAttrs: false,
		props: {
			borderColor: String,
		},
	};
</script>

<style lang="scss" scoped>
	.app-input {
		background-color: color(background);
		border: 1px solid color(border);
		border-radius: 7px;
		color: color(base);
		font-family: font(medium);
		font-size: size(medium);
		height: 46.8px;
		outline: none;
		padding: 0px 16.2px;
		width: 100%;
	}

	.app-input::placeholder {
		color: color(base);
	}
</style>