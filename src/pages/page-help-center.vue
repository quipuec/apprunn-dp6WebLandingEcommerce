<template>
  <div class="page-help-center">
		<router-view></router-view>
	</div>  
</template>

<script>

export default {
	name: 'page-help-center',
};
</script>

<style lang="scss" scoped>
.page-help-center {
	background-color: color(white);
	display: flex;
	justify-content: space-between;
	padding: 59px 90px;
	position: relative;
	width: 100%;

	@media (max-width: 950px) {
		padding: 22px 19px;
	}
}

.content-tabs-help {
	width: 30%;
}
</style>
