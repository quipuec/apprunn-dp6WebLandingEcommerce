<template>
	<div>
		<form-opinion @update="$emit('update-opinion')"/>
		<opinion 
			v-for="(item, index) in opinions" 
			:key="index"
			:opinion="item"/>
	</div>
</template>
<script>
import opinion from '@/components/products/opinion';
import formOpinion from '@/components/products/form-opinion';

export default {
	name: 'wrapper-opinions',
	components: {
		opinion,
		formOpinion,
	},
	props: {
		opinions: {
			type: Array,
			default: () => [],
		},
	},
};
</script>