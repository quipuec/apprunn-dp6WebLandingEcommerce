<template>
	<div>
		<v-select
          outline
		  hide-details
		  menu-props="auto"
		  append-icon="expand_more"
		  class="ecommerce-select"
          :items="items"
		  :value="value"
          v-bind="$attrs"
		  @input="sendValue"
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

export default {
	name: 'app-select',
	inheritAttrs: false,
	methods: {
		sendValue,
	},
	props: {
		items: {
			default: () => [],
			type: Array,
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
