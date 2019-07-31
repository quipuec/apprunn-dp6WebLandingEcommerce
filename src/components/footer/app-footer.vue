<template>
	<div>
		<section-links></section-links>
	</div>
</template>

<script>
const sectionLinks = () => import('@/components/footer/section-links.vue');

export default {
	name: 'app-footer',
	components: {
		sectionLinks,
	},
};
</script>

<style lang="scss" scoped>

</style>
