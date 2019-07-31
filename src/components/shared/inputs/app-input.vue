<template>
	<div>
		<input
			v-bind="$attrs"
			v-on="$listeners"
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
			borderColor: {
				default: '#f5f3f3',
				type: String,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.app-input {
		background-color: color(background);
		border-radius: 7px;
		border-style: solid;
		border-width: 1px;
		color: color(base);
		font-family: font(demi);
		font-size: size(minmedium);
		height: 46.8px;
		outline: none;
		padding: 0px 16.2px;
		width: 100%;
	}
</style>