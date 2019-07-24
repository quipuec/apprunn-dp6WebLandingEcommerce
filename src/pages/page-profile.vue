<template>
	<layout-admin>
		<section class="profile-layout">
			<div class="profile-menu"></div>
			<div class="profile-info"></div>
		</section>
	</layout-admin>
</template>
<script>
export default {
	name: 'page-profile',
};
</script>
<style lang="scss" scoped>
	.profile-layout {
		align-items: center;
		display: flex;
		justify-content: flex-start;
		flex-wrap: wrap;
	}

	.profile-menu {
		background-color: color(primary);
		flex: 1 1 30%;
	}

	.profile-info {
		background-color: color(secondary);
		flex: 1 1 70%;
	}
</style>

