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
	padding: 0 45px;

	@media (max-width: 715px) {
		padding: 0 9px;
	}
}

.text-company-data {
	color: color(white);
	font-family: font(medium);
	font-size: size(minmedium);
	margin: 0 0 0 9px;
	width: 110px;

	@media (max-width: 715px) {
		font-size: 8px;
		margin-left: 6px;
		width: 68px;
	}
}

.image-company {
	@media (max-width: 715px) {
		height: 19px;
	}
}
</style>
