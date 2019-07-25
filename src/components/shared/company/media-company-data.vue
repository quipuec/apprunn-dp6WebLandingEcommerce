<template>
	<div class="container-media-company">
		<img :src="image" :width="imageWidth" :height="imageHeight" alt="">
		<p class="text-company-data">
			{{ description }}
		</p>
	</div>
</template>

<script>
export default {
	name: 'media-company-data',
	props: {
		image: String,
		imageHeight: [String, Number],
		imageWidth: [String, Number],
		description: [String, Number],
		borderCompany: String,
	},
};
</script>

<style lang="scss" scoped>
.container-media-company {
	align-items: center;
	display: flex;
	padding: 19px;
}

.text-company-data {
	color: map-get($colors, white);
	font-family: map-get($fonts, medium);
	font-size: 13px;
	margin: 0 0 0 15px;
	max-width: 100px;
}
</style>
