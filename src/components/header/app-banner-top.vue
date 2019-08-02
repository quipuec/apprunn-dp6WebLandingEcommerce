<template>
  <div class="app-banner-top">
		<div 
			:style="`background-image: url(${data.urlImage})`"
			class="image-banner"></div>
	</div>
</template>
<script>
export default {
	name: 'banner-top',
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
<style lang="scss" scoped>
	.app-banner-top {
		background: color(white);
		padding: 12px 7%;

		@media (max-width: 764px) {
			padding: 7px 5%;
		}
	}
	
	.image-banner {
		background-position-x: left;
		background-repeat: no-repeat;
		background-size: cover;
		height: 65px;
		width: 100%;
	}
</style>

