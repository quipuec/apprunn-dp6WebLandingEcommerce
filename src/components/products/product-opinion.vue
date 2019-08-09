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
const opinion = () => import('@/components/products/opinion');
const formOpinion = () => import('@/components/products/form-opinion');

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