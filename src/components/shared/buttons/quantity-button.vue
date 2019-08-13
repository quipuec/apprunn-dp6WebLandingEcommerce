<template>
	<div>
		<button>-</button>
		<span>{{number}}</span>
		<button>+</button>
	</div>
</template>
<script>
export default {
	name: 'quantity-button',
	props: {
		number: {
			default: 1,
			type: Number,
		},
	},
};
</script>