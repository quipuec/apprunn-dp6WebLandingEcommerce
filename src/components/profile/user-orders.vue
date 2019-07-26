<template>
	<div>
		<profile-tab class="web-tab"/>
	</div>
</template>
<script>
export default {
	name: 'user-orders',
	components: {
		profileTab: () => import('@/components/shared/tabs/profile-tab'),
	},
};
</script>
<style lang="scss" scoped>
	.web-tab {
		bottom: 100%;
		position: absolute;
		width: 100%;
	}
</style>
