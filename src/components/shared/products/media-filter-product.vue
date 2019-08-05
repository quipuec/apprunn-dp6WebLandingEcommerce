<template>
	<button class="box-filter"
	:style="`border-right: ${borderRight ? `1px solid ${borderRight}` : null}`">
			<div>
				<img :src="image" alt="">
			</div>
			<div class="filter-title">
				<p class="title-filter">{{title}}</p>
				<div class="content-border">
					<div class="border-bottom-product"></div>
					<div class="circle-filter-product"></div>
				</div>
			</div>
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
		font-family: font(bold);
	}
}

.box-filter {
	display: flex;
	justify-content: center;
	height: 51px;
	width: 100%;
}

.circle-filter-product {
	background-color: color(white);
	border-radius: 50%;
	height: 4px;
	margin-left: 4px;
	width: 4px;
}

.border-bottom-product {
	background-color: color(white);
	border-radius: 3px;
	height: 4px;
	width: 71px;
}

.content-border {
	display: flex;
	margin-left: 7px;
	position: relative;
}

.content-border:nth-child(4) {
	left: 50px;
	position: relative;
}

.filter-title {
	align-items: flex-start;
	display: flex;
	flex-direction: column;
}
</style>
