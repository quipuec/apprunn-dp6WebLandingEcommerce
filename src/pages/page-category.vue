<template>
<div class="page-category">
	<div class="menu-category">
		<menu-category
		:categories="categories"
		></menu-category>
	</div>
	<div class="content-category">
		<div class="space-between">
			<section>
		    	<v-breadcrumbs divider=">" :items="items">
					<v-breadcrumbs-item 
					v-for="(item, index) in categories" :key="index" 
					:to="item.href"
					:disabled="item.disabled"
					:active-class="'breadcrumbs__item--active'">
						<p class="title-category" >{{item.title}}</p>
					</v-breadcrumbs-item>
				</v-breadcrumbs>
			</section>
			<section>
				pagination
			</section>
		</div>
			<products-section/>
		<section></section>
	</div>
</div>
</template>

<script>
const menuCategory = () => import('@/components/shared/category/menu-category');
const productsSection = () => import('@/components/products/products-section');

function data() {
	return {
		categories: [
			{
				title: 'Automotriz',
				filters: [
					{
						id: 1,
						name: '4x4',
						href: '',
						disabled: false,
					},
					{
						id: 2,
						href: '',
						name: 'Sistema a Gas',
						disabled: false,
					},
					{
						href: '',
						id: 3,
						name: 'Tuning',
						disabled: false,
					},
					{
						id: 4,
						href: '',
						name: 'Competencia',
						disabled: false,
					},
				],
			},
			{
				title: 'Minería',
			},
			{
				title: 'Ferrocarriles y Vagones',
			},
			{
				title: 'Puerta de Garaje',
			},
			{
				title: 'Industria en General',
			},
		],
		items: [
			{
				text: 'Resortes',
				disabled: false,
				href: 'breadcrumbs_dashboard',
			},
			{
				text: 'Automotríz',
				disabled: false,
				href: 'breadcrumbs_link_1',
			},
			{
				text: '4x4',
				disabled: true,
				href: 'breadcrumbs_link_2',
			},
		],
	};
}

export default {
	data,
	name: 'page-category',
	components: {
		menuCategory,
		productsSection,
	},
};
</script>

<style lang="scss" scoped>
.menu-category {
	background-color: #f9f9f9;
	border-right: 1px solid color(disabled);
	height: 100vh;
	padding: 0px 25px;
	position: relative;
	width: 25%;	
}

.content-category {
	background-color: color(white);
	width: 75%;
}

.page-category {
	display: flex;
	height: 100vh;
	width: 100%;
}

.space-between {
	display: flex;
	justify-content: space-between;
	padding: 10px 25px 0 25px;
}

.title-category {
	margin-bottom: 0;
}
</style>
