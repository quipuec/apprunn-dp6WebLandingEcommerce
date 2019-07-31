<template>
		<div class="box-filter"
		:style="`border-right: ${borderRight ? `1px solid ${borderRight}` : null}`">
			<img :src="image" alt="">
			<p class="title-filter">{{title}}</p>
		</div>
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
		font-family: font(bold);
	}
}

.box-filter {
	align-items: center;
	background-color: color(primary);
	display: flex;
	flex-direction: row;
	padding: 10px 45px;
}
</style>
