<template>
	<div>
		<opinion 
			v-for="(item, index) in opinions" 
			:key="index"
			:opinion="item"/>
	</div>
</template>
<script>
import opinion from '@/components/products/opinion';

export default {
	name: 'wrapper-opinions',
	components: {
		opinion,
	},
	props: {
		opinions: {
			type: Array,
			default: () => [],
		},
	},
};
</script>