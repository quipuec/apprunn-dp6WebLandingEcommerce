<template>
	<v-dialog
		:value="value"
	>
		desde el modal
		<slot></slot>
	</v-dialog>	
</template>
<script>
export default {
	name: 'modal-component',
	props: {
		value: null,
	},
};
</script>
