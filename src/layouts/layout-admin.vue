<template>
	<v-content>
		<v-container fluid pa-0>
			<section class="section-margin">
				<slot></slot>
			</section>
		</v-container>
	</v-content>
</template>

<script>
function data() {
	return {
		action: {
			active: false,
			code: 'NOT',
			open: false,
			title: 'Notificaciones',
			width: 468,
		},
		isVisible: true,
		loading: false,
		logoUrl: '',
		routes: [],
	};
}

export default {
	name: 'layout-admin',
	data,
};
</script>
<style lang="scss" scoped>
	.section-margin {
		background-color: white;
	}
</style>
