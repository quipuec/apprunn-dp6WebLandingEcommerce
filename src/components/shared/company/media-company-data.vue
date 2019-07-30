<template>
	<div class="container-media-company"
	:style="`border-right: ${borderRight ? `1px solid ${borderRight}` : null}; font-family: ${family ? `font(${family})` : null }`">
		<img :src="image" :height="imageHeight" alt="" class="image-company">
		<a href="#" v-if="categories">
			<p class="text-company-data">
				{{ description }}
			</p>
		</a>
		<p class="text-company-data" v-else>
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
		description: [String, Number],
		borderCompany: String,
		borderRight: String,
		family: String,
		categories: Boolean,
	},
};
</script>

<style lang="scss" scoped>
.container-media-company {
	align-items: center;
	display: flex;
	padding: 0 52px;

	@media (max-width: 700px) {
		padding: 0 9px;
	}
}

.text-company-data {
	color: color(white);
	font-size: 13px;
	margin: 0 0 0 9px;
	max-width: 100px;

	@media (max-width: 700px) {
		font-size: 8px;
		max-width: 46px;
	}
}
</style>
