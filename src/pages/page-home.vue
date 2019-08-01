<template>
	<layout-admin>
		<router-view></router-view>
		<section-visa></section-visa>
	</layout-admin>
</template>

<script>
const sectionVisa = () => import('@/components/footer/section-visa');

export default {
	name: 'page-home',
	components: {
		sectionVisa,
	},
};
</script>
