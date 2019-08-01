<template>
		<button class="box-filter"
		:style="`border-right: ${borderRight ? `1px solid ${borderRight}` : null}`">
			<img :src="image" alt="">
			<p class="title-filter">{{title}}</p>
			<p class="circle-filter"></p>
		</button>
</template>

<script>
export default {
	name: 'filter-product',
	props: {
		image: String,
		borderRight: String,
		title: String,
	},
};
</script>

<style lang="scss" scoped>
.title-filter {
	color: color(white);
	font-family: font(demi);
	font-size: size(medium);
	margin-bottom: 0;
	padding-left: 7px;
	&:hover {
		border-radius: 3px;
		border-bottom: 3px solid white;
		font-family: font(bold);
	}
}

.circle-filter {
	border-radius: 50%;
	height: 4px;
	width: 4px;
	background-color: white;
	position: relative;
}

.box-filter {
	align-items: center;
	display: flex;
	flex-direction: row;
	justify-content: center;
	padding: 0 46px;

	@media (max-width: 750px) {
		border-bottom: 1px solid white;
	}
}
</style>
