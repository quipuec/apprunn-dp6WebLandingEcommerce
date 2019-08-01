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

	input.app-input::-webkit-input-placeholder {
		color: color(border);
		font-family: font(demi);
		font-size: size(minmedium);
	}

	.app-input::placeholder {
		color: color(border);
		font-family: font(demi) !important;
		font-size: size(minmedium) !important;
		font-weight: normal !important;
	}
</style>