<template>
<div>
	<div class="page-category">
		<div class="menu-category">
			<menu-category
			:categories="$route.query.categories.detail"
			></menu-category>
			</div>
		<div class="content-category">
			<div class="content-sections">
				<section>BreadCrumbs</section>
				<section>
					<v-layout class="text-xs-center" v-show="totalPages">
						<v-pagination
						:length="totalPages"
						:total-visible="pagesVisible"
						v-model="page"
						@input="updateData"
						></v-pagination>
					</v-layout>
				</section>
			</div>
			<products-section/>
		</div>
	</div>
		<div>
			<app-banner-top 
				:data="bannerTop"
				:color="colorSecondary"
				big/>
		</div>
	</div>
</template>

<script>
const menuCategory = () => import('@/components/shared/category/menu-category');
const productsSection = () => import('@/components/products/products-section');
const appBannerTop = () => import('@/components/header/app-banner-top');

function updateData() {
	this.$emit('data');
}

function pagesVisible() {
	return this.totalPages < 5 ? this.totalPages : 5;
}

function data() {
	return {
		totalPages: 5,
		page: 3,
		bannerTop: {
			urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/big.png',
			image: 'descuento',
		},
		colorSecondary: process.env.COLOR_SECONDARY,
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
	name: 'page-category',
	components: {
		appBannerTop,
		menuCategory,
		productsSection,
	},
	computed: {
		pagesVisible,
	},
	methods: {
		updateData,
	},
	data,
};
</script>

<style lang="scss" scoped>
.menu-category {
	background-color: color(background);
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

.content-sections {
	display: flex;
	justify-content: space-between;
	margin: 28px auto;
  max-width: 1070px;
}
</style>
