<template>
	<div>
		<v-select
      		outline
			hide-details
			menu-props="auto"
			append-icon="expand_more"
			:class="[
				transparent ? 'transparent-select' : 'ecommerce-select',
			]"
			:items="items"
			v-bind="$attrs"
			:value="value"
			@input="sendValue"
			@click:append-outer="clear"
		></v-select>
		<span class="err-message">
			<slot></slot>
		</span>
	</div>
</template>
<script>

function sendValue(val) {
	this.$emit('input', val);
}

function clear() {
	this.$emit('clear');
}

export default {
	name: 'app-select',
	inheritAttrs: false,
	methods: {
		sendValue,
		clear,
	},
	props: {
		items: {
			default: () => [],
			type: Array,
		},
		transparent: {
			default: false,
			type: Boolean,
		},
		value: null,
	},
};
</script>
<style lang="scss" scoped>
	.ecommerce-select {
		
		.v-input__control {

			.v-input__slot {
				border: none;
			}
		}
	}
</style>
