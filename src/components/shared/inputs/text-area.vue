<template>
	<v-textarea
		outline
		hide-details
		class="text-area"
		v-bind="$attrs"
		:value="value"
		@input="sendValue"
	></v-textarea>
</template>
<script>

function sendValue(val) {
	this.$emit('input', val);
}

export default {
	name: 'text-area',
	inheritAttrs: false,
	methods: {
		sendValue,
	},
	props: {
		value: null,
	},
};
</script>
<style lang="scss" scoped>
	
</style>

