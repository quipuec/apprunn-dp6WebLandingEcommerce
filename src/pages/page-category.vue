<template>
<div>
	<div class="page-category">
		<div class="name-select-mobile" v-if="!open">
			<div class="flex-center flex-60">
				<img 
					:src="categorySelected.webImage" 
					:alt="categorySelected.title" 
					class="mr-2" 
					height="21">
				<span class="text-select" :style="`color: ${globalColors.primary}`">{{categorySelected.title}}</span>
			</div>
			<div class="flex-center flex-40">
				<button @click="toggleMenu">
					<img 
						src="/static/img/icons/icon-filter-category.svg" 
						alt="filtro"
						class="mr-2"
						height="16"
					>
					<span>Filtrar por</span>
				</button>
			</div>
		</div>
		<div class="menu-category" :class="{open: open, toggle: toggle}" v-if="open">
			<button class="btn-close" @click="closeOpen">
				<img 
					src="/static/img/icons/close.svg" 
					alt="cerrar" 
					height="17">
			</button>
			<menu-category
				:categories="categories"
				@change-category="changeCategory"
				@change-sub-category="changeSubCategory"
				@change-sub-sub-category="changeSubSubCategory"
				@open-category="openCategory"
				@toggle="toggleCategory"
				@close="closeOpen"
			></menu-category>
		</div>
		<div class="wrapper-results" :class="{toggle: toggle, close: open}">
			<div class="wrapper-results-pagination">
				<v-breadcrumbs :items="breadcrumbs" divider=">">
					<template slot="item" slot-scope="props">
						<button
							:style="props.item.disabled ? `color: ${globalColors.primary}` : `color: ${globalColors.dark}`"
							@click="linkCategories(props.item)"
							>{{ props.item.text }}</button>
					</template>
				</v-breadcrumbs>
				 <section class="section-pagination-category">
						<p class="total-products">{{listProducts.length}} productos</p>
						<v-layout class="text-xs-center" v-show="totalPages" v-if="lastPage > 1">
							<v-pagination
								:length="lastPage"
								:total-visible="totalPages"
								v-model="page"
								@input="updateProductCard"
								:color="globalColors.secondary"
							></v-pagination>
						</v-layout>
				</section>
			</div>
			<section 
				class="section-product-card"
				v-if="listProducts.length"
			>
				<product-card
					class="product-card"
					v-for="product in listProducts"
					:key="product.id"
					:product="product"
					/>
			</section>
			<p v-else class="not-products">No se encontrarón productos</p>
			<section class="section-pagination-category container-end">
				<p class="total-products">{{listProducts.length}} productos</p>
				<div class="text-xs-center" v-show="totalPages" v-if="lastPage > 1">
					<v-pagination
						:length="lastPage"
						:total-visible="totalPages"
						v-model="page"
						@input="updateProductCard"
						:color="globalColors.secondary"
					></v-pagination>
				</div>
		</section>
		</div>
	</div>
	<app-banner-top 
		:data="bannerTop"
		:color="globalColors.secondary"
		big/>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

const appBannerTop = () => import('@/components/header/app-banner-top');
const buttonImage = () => import('@/components/shared/buttons/app-button-image');
const menuCategory = () => import('@/components/shared/category/menu-category');
const productCard = () => import('@/components/products/product-card');
const productsSection = () => import('@/components/products/products-section');

function created() {
	this.selectCategory();
	this.changeOpen();
	window.addEventListener('resize', this.changeOpen);
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

function updateProductCard(value) {
	this.page = value;
	this.loadProduct();
}

function selectCategory() {
	this.loadProduct();
	this.breadcrumbs = [];
	this.categorySelected = this.getCategories.filter(c => Number(c.id) === Number(this.fisrt))[0];
	this.categories = this.getCategories.map((c) => {
		const newCategory = { ...c };
		const flagOpen = Number(c.id) === Number(this.fisrt);
		newCategory.selectFirst = flagOpen;
		newCategory.open = flagOpen;
		if (flagOpen) {
			this.breadcrumbs.push({ text: c.title, links: [c.id], link: 'first' });
		}
		if (this.second) {
			const indexSearch = newCategory.detail.findIndex(d => Number(d.id) === Number(this.second));
			newCategory.detail = c.detail.map((d, index) => {
				const newDetail = { ...d };
				if (indexSearch > -1) {
					newDetail.selectSecond = indexSearch === index;
					if (indexSearch === index) {
						this.breadcrumbs.push({ text: d.title, links: [c.id, d.id], link: 'second' });
					}
				} else {
					newDetail.selectSecond = false;
				}
				if (this.third && d.detail.length) {
					newDetail.detail = d.detail.map((sub, indexSub) => {
						const indexSearchSub = d.detail.findIndex(s => Number(s.id) === Number(this.third));
						const newSubDetail = { ...sub };
						if (indexSearchSub > -1) {
							newSubDetail.selectThird = indexSearchSub === indexSub;
							if (indexSearchSub === indexSub) {
								this.breadcrumbs.push({ text: sub.title, links: [c.id, d.id, sub.id], link: 'third' });
							}
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
	this.breadcrumbs = this.breadcrumbs.map((b, index) => {
		const newBreadcrumb = { ...b };
		newBreadcrumb.disabled = index === this.breadcrumbs.length - 1;
		return newBreadcrumb;
	});
}

function changeCategory({ slug, id }) {
	this.goTo('category', { params: { fisrt: slug || id } });
	if (window.innerWidth < 986) {
		this.open = false;
	}
}

function changeSubCategory(dataFirst, dataSecond) {
	const urlFirst = dataFirst.slug || dataFirst.id;
	const urlSecond = dataSecond.slug || dataSecond.id;
	this.goTo('category', { params: { fisrt: urlFirst, second: urlSecond } });
	if (window.innerWidth < 986) {
		this.open = false;
	}
}

function changeSubSubCategory(dataFirst, dataSecond, dataThird) {
	const urlFirst = dataFirst.slug || dataFirst.id;
	const urlSecond = dataSecond.slug || dataSecond.id;
	const urlThird = dataThird.slug || dataThird.id;
	this.goTo('category', { params: { fisrt: urlFirst, second: urlSecond, third: urlThird } });
	if (window.innerWidth < 986) {
		this.open = false;
	}
}

function openCategory(id) {
	this.categories = this.categories.map((c) => {
		const newCategory = { ...c };
		newCategory.open = c.id === id ? !c.open : false;
		return newCategory;
	});
}

function toggleMenu() {
	this.open = true;
}

function changeOpen() {
	this.open = window.innerWidth > 986;
}

function closeOpen() {
	this.open = false;
}

function linkCategories(item) {
	if (item.link === 'first') {
		this.goTo('category', { params: { fisrt: item.links[0] } });
	} else if (item.link === 'second') {
		this.goTo('category', { params: { fisrt: item.links[0], second: item.links[1] } });
	} else {
		this.goTo('category', { params: { fisrt: item.links[0], second: item.links[1], third: item.links[2] } });
	}
}

function toggleCategory() {
	this.toggle = !this.toggle;
}

function data() {
	return {
		bannerTop: {
			urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/big.png',
			image: 'descuento',
		},
		categoryId: null,
		lastPage: 0,
		listSubCategories: [],
		listProducts: [],
		page: 1,
		totalPages: 7,
		categories: [],
		categorySelected: {},
		open: false,
		breadcrumbs: [],
		toggle: false,
	};
}

export default {
	name: 'page-category',
	created,
	components: {
		appBannerTop,
		buttonImage,
		menuCategory,
		productCard,
		productsSection,
	},
	computed: {
		...mapGetters([
			'getCategories',
		]),
	},
	methods: {
		loadProduct,
		updateProductCard,
		selectCategory,
		changeCategory,
		changeSubCategory,
		changeSubSubCategory,
		openCategory,
		toggleMenu,
		changeOpen,
		closeOpen,
		linkCategories,
		toggleCategory,
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
	left: 0;
	position: relative;
	transition: all .2s linear 0s;

	@media (max-width: 986px) {
		height: 100%;
		left: -150%;
		padding: 0;

		&.open {
			left: 0 !important;
			width: 100%;
		}
	}

	&.toggle {
		left: -327px;
		position: absolute;
		z-index: 2;
	}
}

.page-category {
	display: flex;
	position: relative;
	width: 100%;

	@media (max-width: 986px) {
		flex-direction: column;
	}
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

	@media (max-width: 986px) {
		display: none;
	}
}

.section-product-card {
	display: grid;
	grid-auto-rows: minmax(min-content, max-content);
	grid-template-columns: repeat(auto-fill, minmax(214px, 1fr));

	@media (max-width: 986px) {
		margin: 0;
		width: 100%;
	}
}

.not-products {
	font-size: 18px;
	margin: 50px;
	text-align: center;
	width: 70%;
}

.name-select-mobile {
	background: color(white);
	box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.05);
	display: none;
	height: 59px;
	position: sticky;
  top: 75px;
	z-index: 3;

	@media (max-width: 986px) {
		display: flex;
	}
}

.flex-center {
	align-items: center;
	display: flex;
	justify-content: center;
}

.flex-60 {
	border-right: 1px solid color(border);
	flex: 1 60%;
}

.flex-40 {
	flex: 1 40%;
}

.text-select {
	font-family: font(bold);
	font-size: size(xlarge);
}

.btn-close {
	border-bottom: 1px solid color(border);
	display: none;
	padding: 15px;
	text-align: right;
	width: 100%;

	@media (max-width: 986px) {
		display: block;
	}
}

.wrapper-results {
	padding: 28px 50px;
	position: relative;
	width: 70%;

	&.toggle {
		width: 100%;
	}

	&.close {
		@media (max-width: 986px) {
			display: none;
		}
	}

	@media (max-width: 986px) {
		margin: 0;
		padding: 0;
		width: 100%;
	}
}

.wrapper-results-pagination {
	display: flex;
	justify-content: space-between;
}

.container-end {
	justify-content: flex-end;

	@media (max-width: 986px) {
		display: none !important;
	}
}
</style>
