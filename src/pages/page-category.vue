<template>
<div>
	<div class="page-category">
		<div class="menu-category">
			<menu-category
				:categories="categories"
				@change-category="changeCategory"
				@change-sub-category="changeSubCategory"
				@change-sub-sub-category="changeSubSubCategory"
				@open-category="openCategory"
			></menu-category>
		</div>
		<section class="section-product-card" v-if="listProducts.length">
			<product-card
				class="product-card"
				v-for="product in listProducts"
				:key="product.id"
				:product="product"
				/>
		</section>
		<p v-else class="not-products">No se encontrarón productos</p>
		<!-- <div class="content-category">
			<div class="content-sections fixed">
				<section class="section-breadcrumbs bread-responsive">
					<v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
				</section>
				<section class="section-breadcrumbs-responsive">
					<img :src="$route.query.categories.webImage" alt="" class="image-breadcrumb-category">
					<span class="text-breadcrumb">{{this.$route.query.categories.title}}</span>
				</section>
				<section class="section-filter-responsive">
					<button-image
					:data="iconFilter"
					class="icon-filter"
					/>
					<button class="title-filter" @click="filterProducts">Filtrar por</button>
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
			<section class="section-breadcrumbs border-bottom bread-desktop-none">
				<v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
			</section>
			<section class="section-product-card">
				<product-card
				class="product-card"
				v-for="product in listProducts"
				:key="product.id"
				:product="product"
				/>
			</section>
		</div> -->
	</div>
	<div v-if="sliderCategory">
		<slider-category
		@close="closeCategory"
		></slider-category>
	</div>
		<div>
			<app-banner-top 
				:data="bannerTop"
				:color="globalColors.secondary"
				big/>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

const appBannerTop = () => import('@/components/header/app-banner-top');
const buttonImage = () => import('@/components/shared/buttons/app-button-image');
const menuCategory = () => import('@/components/shared/category/menu-category');
const productCard = () => import('@/components/products/product-card');
const productsSection = () => import('@/components/products/products-section');
const sliderCategory = () => import('@/components/shared/category/slider-category');

function created() {
	this.selectCategory();
}

function closeCategory() {
	this.sliderCategory = false;
}

async function loadProduct() {
	try {
		const params = {
			page: this.page,
		};
		let idCategory = this.fisrt;
		if (this.third) {
			idCategory = this.third;
		} else if (this.second) {
			idCategory = this.second;
		}
		const url = `products-public?eCategories=${idCategory}`;
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

function filterProducts() {
	this.sliderCategory = true;
}

function selectCategory() {
	this.loadProduct();
	this.categories = this.getCategories.map((c) => {
		const newCategory = { ...c };
		newCategory.selectFirst = Number(c.id) === Number(this.fisrt);
		newCategory.open = Number(c.id) === Number(this.fisrt);
		if (this.second) {
			const indexSearch = newCategory.detail.findIndex(d => Number(d.id) === Number(this.second));
			newCategory.detail = c.detail.map((d, index) => {
				const newDetail = { ...d };
				if (indexSearch > -1) {
					newDetail.selectSecond = indexSearch === index;
				} else {
					newDetail.selectSecond = false;
				}
				if (this.third && d.detail.length) {
					newDetail.detail = d.detail.map((sub, indexSub) => {
						const indexSearchSub = d.detail.findIndex(s => Number(s.id) === Number(this.third));
						const newSubDetail = { ...sub };
						if (indexSearchSub > -1) {
							newSubDetail.selectThird = indexSearchSub === indexSub;
						} else {
							newSubDetail.selectThird = false;
						}
						return newSubDetail;
					});
				}
				return newDetail;
			});
		}
		return newCategory;
	});
}

function changeCategory(id) {
	this.goTo('category', { params: { fisrt: id } });
}

function changeSubCategory(id, idCategory) {
	this.goTo('category', { params: { fisrt: id, second: idCategory } });
}

function changeSubSubCategory(id, idCategory, idSubCategory) {
	this.goTo('category', { params: { fisrt: id, second: idCategory, third: idSubCategory } });
}

function openCategory(id) {
	this.categories = this.categories.map((c) => {
		const newCategory = { ...c };
		newCategory.open = c.id === id ? !c.open : false;
		return newCategory;
	});
}

function data() {
	return {
		sliderCategory: false,
		bannerTop: {
			urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/big.png',
			image: 'descuento',
		},
		iconFilter: {
			image: '/static/img/icons/icon-filter-category.svg',
			name: 'filtros',
			height: 16,
		},
		categoryId: null,
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
		categories: [],
	};
}

export default {
	name: 'page-category',
	created,
	components: {
		appBannerTop,
		buttonImage,
		menuCategory,
		sliderCategory,
		productCard,
		productsSection,
	},
	computed: {
		pagesVisible,
		...mapGetters([
			'getCategories',
		]),
	},
	methods: {
		closeCategory,
		filterProducts,
		loadProduct,
		updateProductCard,
		selectCategory,
		changeCategory,
		changeSubCategory,
		changeSubSubCategory,
		openCategory,
	},
	data,
	props: {
		fisrt: {
			type: [String, Number],
			default: null,
		},
		second: {
			type: [String, Number],
			default: null,
		},
		third: {
			type: [String, Number],
			default: null,
		},
	},
	watch: {
		$route: selectCategory,
	},
};
</script>

<style lang="scss" scoped>
.menu-category {
	background-color: color(background);
	padding: 0 0 0 27px;
	position: relative;

	@media (max-width: 980px) {
		display: none;
	}
}

.content-category {
	background-color: color(white);
	width: 75%;

	@media (max-width: 980px) {
		width: 100%;
	}
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
	width: 100%;
	
	@media (max-width: 980px) {
		border-bottom: 1px solid color(disabled);
		height: 77px;
		margin: 0;
	}
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

	@media (max-width: 980px) {
		display: none;
		width: 50%;
	}
}

.section-product-card {
	// align-items: center;
	display: grid;
	// flex-wrap: wrap;
	grid-auto-rows: minmax(min-content, max-content);
	grid-template-columns: repeat(auto-fill, minmax(214px, 1fr));
	// margin: 15px auto;
	// max-width: 1070px;
	margin: 30px 0 0 51px;
	width: 70%;

	@media (max-width: 980px) {
		margin: 19px auto;
	}
}

.title-breadcrumbs-category {
	color: color(base);
	font-family: font(medium);
	font-size: size(large);
}

.text-breadcrumb {
	color: color(dark);
	font-family: map-get($fonts, medium);
	font-size: size(medium);

	@media (max-width: 980px) {
		color: color(primary);
		font-family: font(bold);
		font-size: 18px;
		margin-left: 10px;
	}
}

.image-breadcrumb-category {
	display: none;
	
	@media (max-width: 980px) {
		display: block;
	}
}

.section-breadcrumbs-responsive {
	@media (min-width: 980px) {
		display: none;
	}
	align-items: center;
	border-right: 1px solid color(disabled);
	display: flex;
	justify-content: center;
	width: 50%;
}

.section-breadcrumbs {
	display: flex;
	justify-content: flex-start;
	margin-left: 19px;
}

.icon-filter {
	height: 16px;
	width: 15.6px;
}

.section-filter-responsive {
	align-items: center;
	display: flex;
	justify-content: center;
	width: 50%;

	@media (min-width: 980px) {
		display: none;
	}
}

.title-filter {
	color: color(dark);
	font-family: font(demi);
	font-size: size(small);
	margin: 0 0 0 5px;
}

.border-bottom {
	border-bottom: 1px solid color(disabled);
}

.bread-responsive {
	@media (max-width: 980px) {
		display: none;
	}
}

.bread-desktop-none {
	@media (min-width: 980px) {
		display: none;
	}
}

.not-products {
	font-size: 18px;
	margin: 50px;
	text-align: center;
	width: 70%;
}
</style>
