<template>
	<div>
		<h2
			:style="`text-align:center;margin-bottom:20px;color:${globalColors.primary}`"
		>{{title}}</h2>
		<h3
			:style="`text-align:center;margin-bottom:40px;color:${globalColors.primary}`"
		>{{subTitle}}</h3>
		<p>{{content}}</p>
		<img :src="image" alt="">
	</div>
</template>
<script>
export default {
	name: 'help-content',
	props: {
		content: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			default: '',
		},
		subTitle: {
			type: String,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>

</style>