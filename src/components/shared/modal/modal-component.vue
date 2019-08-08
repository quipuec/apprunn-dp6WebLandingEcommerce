<template>
	<v-dialog
		:value="value"
	>
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
