<template>
	<div>
		<section class="user-header">
			<edit-component @click="editing" class="mr-3" :active="editActive"/>
			<camera-component @click="loadAvatar"/>
		</section>
		<section>
			<h3 class="section-title">Mis datos personales</h3>
		</section>
		<router-view></router-view>
	</div>
</template>
<script>
import cameraComponent from '@/components/shared/icons/camera-component';
import editComponent from '@/components/shared/icons/edit-component';

function editing() {
	this.$router.push({ name: 'edit-user-data' });
}

function loadAvatar() {}

function routeHandler(newRoute) {
	this.editActive = newRoute === 'edit-user-data';
}

function data() {
	return {
		editActive: false,
	};
}

export default {
	name: 'user-data',
	components: {
		cameraComponent,
		editComponent,
	},
	data,
	methods: {
		editing,
		loadAvatar,
		routeHandler,
	},
	watch: {
		'$route.name': routeHandler,
	},
};
</script>
<style lang="scss" scoped>
	.user-header {
		margin-bottom: 20px;
		margin-left: 40px;
	}

	.section-title {
		color: color(primary);
		font-family: font(bold);
		font-size: size(large);
		margin-bottom: 50px;
		margin-left: 40px;
		text-transform: uppercase;

		@media (max-width: 500px) {
			margin-bottom: 20px;
		}
	}

	.info-container {
		align-items: flex-start;
		font-family: font(medium);
		display: grid;
		grid-column-gap: 50px;
		grid-template-columns: 1fr 1fr;
		margin: 0 auto;
		width: 280px;
	}

	.label {
		color: color(base);
		display: block;
		font-size: size(small);
	}

	.user-content {
		color: color(dark);
		font-size: size(medium);
	}
</style>

