<template>
<div>
	<div class="page-category">
		<div class="menu-category">
			<menu-category
			:categories="this.arrayCategory"
			:title-category="title"
			></menu-category>
			</div>
		<div class="content-category">
			<div class="content-sections">
				<section>
					<v-breadcrumbs 
					:items="items" 
					divider=">">
						<span class="title-breadcrumbs-category">{{this.$route.query.title}}</span>
					</v-breadcrumbs>
				</section>
				<section class="section-pagination-category">
					<p class="total-products">{{listProducts.length}} productos</p>
					<v-layout class="text-xs-center" v-show="totalPages">
						<v-pagination
						:length="this.lastPage"
						:total-visible="pagesVisible"
						v-model="page"
						@input="updateProductCard"
						></v-pagination>
					</v-layout>
				</section>
			</div>
			<section class="section-product-card">
				<product-card
				class="product-card"
				v-for="product in listProducts"
				:key="product.id"
				:product="product"
				/>
			</section>
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
const appBannerTop = () => import('@/components/header/app-banner-top');
const menuCategory = () => import('@/components/shared/category/menu-category');
const productCard = () => import('@/components/products/product-card');
const productsSection = () => import('@/components/products/products-section');

function created() {
	({ title: this.title, id: this.categoryId } = this.$route.query);
	this.arrayCategory = this.$route.query.categories.detail;
	this.subCategories = this.$route.query.categories.detail;
	this.loadProduct();
}

async function loadProduct() {
	try {
		const params = {
			page: this.page,
		};
		const url = `products-public?eCategories=${this.categoryId}`;
		const { data: products, headers } = await this.$httpProductsPublic.get(url, { params });
		this.listProducts = products;
		this.lastPage = Number(headers['x-last-page']);
	} catch (error) {
		this.showGenericError();
	}
}

function pagesVisible() {
	return this.totalPages < 5 ? this.totalPages : 5;
}

function updateProductCard(value) {
	this.page = value;
	this.loadProduct();
}

function data() {
	return {
		bannerTop: {
			urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/big.png',
			image: 'descuento',
		},
		categoryId: null,
		colorSecondary: process.env.COLOR_SECONDARY,
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
		lastPage: 0,
		listSubCategories: [],
		listProducts: [],
		page: 1,
		totalPages: 5,
	};
}

export default {
	name: 'page-category',
	created,
	components: {
		productCard,
		appBannerTop,
		menuCategory,
		productsSection,
	},
	computed: {
		pagesVisible,
	},
	methods: {
		updateProductCard,
		loadProduct,
	},
	data,
};
</script>

<style lang="scss" scoped>
.menu-category {
	background-color: color(background);
	padding: 0px 15px;
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

.total-products {
	color: color(base);
	font-family: font(medium);
	font-size: 12px;
	margin-bottom: 0;
}

.section-pagination-category {
	align-items: center;
	display: flex;
}

.section-product-card {
	align-items: center;
	display: grid;
	flex-wrap: wrap;
	grid-template-columns: repeat(auto-fit, minmax(214px, 1fr));
	margin: 42px auto;
	max-width: 1070px;
}

.title-breadcrumbs-category {
	color: #acaaaa;
	font-size: 16px;
	font-family: font(medium)
}
</style>
