<template>
		<div class="box-filter"
		:style="`border-right: ${borderRight ? `1px solid ${borderRight}` : null}`">
			<img src="/static/img/icons/icon-filter-product.svg" alt="">
			<p class="title-filter">Novedades</p>
		</div>
</template>

<script>
export default {
	name: 'filter-product',
	props: {
		borderRight: String,
	},
};
</script>

<style lang="scss" scoped>
.title-filter {
	color: white;
	font-size: 14px;
	margin-bottom: 0;
	padding-left: 7px;

	&:hover {
		font-family: font(bold);
	}
}

// .filter-product {
// 	background-color: red;
// }

.box-filter {
	background-color: red;
	display: flex;
	align-items: center;
	flex-direction: row;
	padding: 10px 45px;
}
</style>
