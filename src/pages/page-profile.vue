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
		margin: auto;
		max-width: 1142px;

		@media (max-width: 500px) {
			padding: 0 15px;
		}
	}

	.profile-menu {
		background-color: color(dark);
		border-radius: 7px;
		flex: 1 1 30%;
		padding: 122px 90px 0;

		@media (max-width: 500px) {
			padding: 64px 76px 14px;
		}
	}

	.profile-info {
		background-color: color(disabled);
		box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.08);
		flex: 1 1 70%;
		height: 100%;
		padding: 17px 44px;
	}
</style>

