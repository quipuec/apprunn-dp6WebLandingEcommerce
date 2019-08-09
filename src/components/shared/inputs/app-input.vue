<template>
	<div class="input-container">
		<input
			class="app-input"
			v-bind="$attrs"
			:style="`border-color: ${borderColor}`"
			:value="value"
			@input="sendValue"
		/>
		<span class="err-message">
			<slot></slot>
		</span>
	</div>
</template>

<script>

	function sendValue({ target }) {
		this.$emit('input', target.value);
	}

	export default {
		name: 'app-input',
		inheritAttrs: false,
		methods: {
			sendValue,
		},
		props: {
			borderColor: {
				default: '#f5f3f3',
				type: String,
			},
			value: null,
		},
	};
</script>

<style lang="scss" scoped>
	.input-container {
		display: flex;
		flex-direction: column;
	}

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