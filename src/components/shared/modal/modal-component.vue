<template>
	<v-dialog
		max-width="80%"
		:value="value"
		@input="showModal"
	>
		<slot></slot>
	</v-dialog>	
</template>
<script>

function showModal(val) {
	this.$emit('input', val);
}

export default {
	name: 'modal-component',
	methods: {
		showModal,
	},
	props: {
		value: null,
	},
};
</script>
