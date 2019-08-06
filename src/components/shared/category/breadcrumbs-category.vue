<template>
<div>
	<v-breadcrumbs :items="items">
      <template v-slot:divider>
        <v-icon>chevron_right</v-icon>
      </template>
  </v-breadcrumbs>
</div>
</template>

<script>
function data() {
	return {
		items: [
			{
				text: 'Dashboard',
				disabled: false,
				href: 'breadcrumbs_dashboard',
			},
			{
				text: 'Link 1',
				disabled: false,
				href: 'breadcrumbs_link_1',
			},
			{
				text: 'Link 2',
				disabled: true,
				href: 'breadcrumbs_link_2',
			},
		],
	};
}

export default {
	data,
	name: 'breadcrumbs-category',
};
</script>

<style lang="scss" scoped>

</style>
