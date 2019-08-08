<template>
  <div class="page-help-center">
		<div class="tabs-help-center">
			tabs
		</div>
		<div class="components-help-center">
			components
		</div>
	</div>  
</template>

<script>
export default {
	name: 'page-help-center',
};
</script>

<style lang="scss" scoped>
.page-help-center {
	display: flex;
	justify-content: space-between;
	padding: 59px 90px;
	width: 100%;
}

.tabs-help-center {
	width: 25%;
}

.components-help-center {
	width: 75%;
	@media (max-width: 850px) {
		display: none;
	}
}
</style>
