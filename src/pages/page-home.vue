<template>
	<layout-admin>
		<router-view></router-view>
		<component-filter-product></component-filter-product>
	</layout-admin>
</template>

<script>
const componentFilterProduct = () => import('@/components/shared/products/component-filter-product');

export default {
	name: 'page-home',
	components: {
		componentFilterProduct,
	},
};
</script>
