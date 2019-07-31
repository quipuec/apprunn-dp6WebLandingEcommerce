<template>
	<div class="filter-product">
		<div class="box-filter">
			<img src="/static/img/icons/icon-filter-product.svg" alt="">
			<p class="title-filter">Novedades</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'filter-product',
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

.filter-product {
	background-color: red;
}

.box-filter {
	display: flex;
	align-items: center;
	flex-direction: row;
	padding: 10px 45px;
}
</style>
