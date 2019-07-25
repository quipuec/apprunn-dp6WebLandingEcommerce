<template>
	<div>
		<input
			v-bind="$attrs"
			class="app-input"
			:style="`border-color: ${borderColor}`"
			:placeholder="placeholder"
		/>
	</div>
</template>

<script>
	export default {
		name: 'app-input',
		inheritAttrs: false,
		props: {
			borderColor: String,
			placeholder: String,
		},
	};
</script>

<style lang="scss" scoped>
	.app-input {
		background-color: color(background);
		border-radius: 7px;
		border-style: solid;
		border-width: 1px;
		color: color(border);
		font-family: font(demi);
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