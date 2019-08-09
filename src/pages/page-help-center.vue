<template>
  <div class="page-help-center">
		<tabs-help></tabs-help>
	</div>  
</template>

<script>
const tabsHelp = () => import('@/components/help/tabs-help');

export default {
	name: 'page-help-center',
	components: {
		tabsHelp,
	},
};
</script>

<style lang="scss" scoped>
.page-help-center {
	background-color: white;
	display: flex;
	justify-content: space-between;
	padding: 59px 90px;
	width: 100%;
}

.content-tabs-help {
	width: 30%;
}
</style>
