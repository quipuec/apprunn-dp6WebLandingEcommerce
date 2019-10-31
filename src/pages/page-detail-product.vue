<template>
	<div class="page-detail-product">
		<div class="detail-product-top">
			<product-view 
				:data="product"
				class="container-product-view"/>
			<productDetail 
				:data="product"
				:features="features"
				class="container-product-detail"
				@update="loadData"
				@select="selectFeature"
				@clear="clearFeatures"
				@click-quantity="clickQuantity"
				@open-dialog="openDialog"
				/>
		</div>
		<div class="detail-tab-publicity">
			<product-publicity class="container-publicity desktop"/>
			<product-tab 
				class="container-product-tab"
				:tabs="tabs"
				:sections="product.sections"
				:lastIndex="lastIndex"
				:opinions="opinions"
				@update-opinion="loadOpinions"/>
		</div>
		<div>
			<product-related 
				:relateds="relateds"
				v-if="relateds.length"
			/>
		</div>
		<product-publicity class="container-publicity mobile"/>
		<app-banner-top
			:data="getPromotionalBanner"
			:color="globalColors.secondary"
			big/>
		<warehouses-modal 
			:dialog="dialogWarehouses"
			:rows="warehouses"
			@change-modal="closeModal"/>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const appBannerTop = () => import('@/components/header/app-banner-top');
const productView = () => import('@/components/products/product-view');
const productDetail = () => import('@/components/products/product-detail');
const productTab = () => import('@/components/products/product-tab');
const productRelated = () => import('@/components/products/product-related');
const warehousesModal = () => import('@/components/products/warehouses-modal');
const productPublicity = () => import('@/components/products/product-publicity');

function created() {
	this.loadProduct();
}

function isLoggedUser() {
	if (this.token) {
		return this.$httpProducts.get(`products/favorites/${this.id}`);
	}
	return this.$httpProductsPublic.get(`products-public/${this.id}`);
}

async function loadProduct() {
	try {
		const { data: response } = await this.isLoggedUser();
		this.product = response;
		document.title = this.product.name.toUpperCase();
		this.loadData(this.product.id);
		this.loadOpinions();
	} catch (error) {
		this.showGenericError();
	}
}

async function loadData(id) {
	const requests = [
		this.$httpProductsPublic.get(`products-public/${id}/related`),
		this.$httpProductsPublic.get(`products-public/${id}/children`),
	];
	([
		{ data: this.relateds },
		{ data: this.childrens },
	] = await Promise.all(requests));
	this.product.images = this.product.images.map((i, index) => {
		const newImage = { ...i };
		newImage.select = index === 0;
		return newImage;
	});
	this.product.quantity = 1;
	this.productFather = { ...this.product };
	this.tabs = this.product.sections.map(p => p.name);
	this.tabs.push('Comentarios');
	this.lastIndex = this.product.sections.length;
	this.allFeatures = this.childrens.reduce((acum, children) => acum.concat(children.features), []);
	this.features = this.allFeatures.reduce((acum, feature) => {
		const index = acum.findIndex(a => a.name === feature.name);
		if (index > -1) {
			const indexValue = acum[index].values.findIndex(i => i.name === feature.value);
			if (indexValue === -1) {
				const value = {
					name: feature.value,
					active: false,
					possible: false,
					disabled: false,
					code: feature.code,
				};
				acum[index].values.push(value);
			}
		} else {
			acum.push({ name: feature.name,
				value: 'PADRE',
				values: [
					{ name: feature.name,
						active: false,
						possible: false,
						disabled: true,
						code: 'PADRE',
					},
					{ name: feature.value,
						active: false,
						possible: false,
						disabled: false,
						code: feature.code,
					},
				],
			});
		}
		return acum;
	}, []);
	if (this.childrens.length) {
		this.disabledBtn = true;
	}
}

function selectFeature(index, value) {
	this.featureSelect.push({ name: this.features[index].name, code: value });
	this.filterProduct(this.featureSelect);
}

function filterProduct(filters) {
	const numFilter = filters.length;
	this.arrayPossible = [];
	this.productsFilter = this.childrens.reduce((acum, children) => {
		const flagFilter = [];
		filters.forEach((filter) => {
			if (children.features.filter(f => f.name === filter.name &&
				f.code === filter.code).length) {
				flagFilter.push(filter);
			}
		});
		if (flagFilter.length === numFilter) {
			acum.push(children);
			children.features.forEach((element) => {
				if (this.arrayPossible.length) {
					const index = this.arrayPossible.findIndex(a => a.name === element.name
						&& a.value === element.value);
					if (index === -1) {
						this.arrayPossible.push({ name: element.name, value: element.code });
					}
				} else {
					this.arrayPossible.push({ name: element.name, value: element.code });
				}
			});
		}
		return acum;
	}, []);
	this.possibleFeature(this.arrayPossible);
}

function possibleFeature(possibles) {
	this.features = this.features.map((element, index) => {
		element.values.forEach((value, indexValue) => {
			if (this.productsFilter.length === 1) {
				const flag = possibles.filter(p => p.value === value.code);
				this.$set(this.features[index].values[indexValue], 'active', !!flag.length);
				this.$set(this.features[index].values[indexValue], 'possible', false);
				this.$set(this.features[index].values[indexValue], 'disabled', !flag.length);
				if (value.code === 'PADRE') {
					this.$set(this.features[index].values[indexValue], 'disabled', true);
				}
				if (value.active) {
					this.$set(this.features[index], 'value', value.code);
				}
			} else {
				const flag = possibles.filter(p => p.value === value.code && !value.active);
				this.$set(this.features[index].values[indexValue], 'possible', !!flag.length);
				this.$set(this.features[index].values[indexValue], 'disabled', !flag.length);
			}
		});
		return element;
	});
	if (this.productsFilter.length === 1) {
		this.productsFilter[0].images = this.productsFilter[0].images.map((i, index) => {
			const newImage = { ...i };
			newImage.select = index === 0;
			return newImage;
		});
		this.assignProduct(this.productsFilter[0]);
		this.disabledBtn = false;
	}
}

function assignProduct(product) {
	this.product = { ...product };
	this.product.quantity = 1;
}

async function loadOpinions() {
	const params = {
		typeQuestionAnswer: 3,
		productId: this.product.id,
	};
	const { data: response } = await this.$httpProductsPublic.get('question-answer/public', { params });
	this.opinions = response;
}

function clearFeatures() {
	this.features = this.features.map((element) => {
		const newElement = { ...element };
		newElement.value = 'PADRE';
		newElement.values = element.values.map((v) => {
			const newValue = { ...v };
			newValue.active = false;
			newValue.possible = false;
			newValue.disabled = v.code === 'PADRE';
			return newValue;
		});
		return newElement;
	});
	this.featureSelect = [];
	this.arrayPossible = [];
	this.productsFilter = [];
	this.product = { ...this.productFather };
}

function newRoute() {
	this.loadProduct();
}

function clickQuantity(value) {
	let num = this.product.quantity;
	const newProductdetail = { ...this.product };
	if (value === 'less' && num === 1) {
		num = 1;
	} else {
		num = value === 'more' ? num += 1 : num -= 1;
	}
	this.$set(newProductdetail, 'quantity', num);
	this.product = { ...newProductdetail };
}

async function openDialog() {
	try {
		const { data: response } = await this.$httpProductsPublic.get(`products-public/${this.product.id}/stock-by-warehouse`);
		this.warehouses = response;
		this.dialogWarehouses = true;
	} catch (error) {
		this.showGenericError();
	}
}

function closeModal(value) {
	this.dialogWarehouses = value;
}

function data() {
	return {
		lastIndex: 0,
		opinions: [],
		product: {},
		relateds: [],
		childrens: [],
		allFeatures: [],
		features: [],
		featureSelect: [],
		arrayPossible: [],
		productsFilter: [],
		productFather: {},
		disabledBtn: false,
		dialogWarehouses: false,
		cities: [],
		warehouses: [],
		bannerTop: {
			urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/big.png',
			image: 'descuento',
		},
		featuresFather: [],
		tabs: [],
	};
}

export default {
	name: 'page-detail-product',
	created,
	components: {
		appBannerTop,
		productDetail,
		productPublicity,
		productView,
		productTab,
		productRelated,
		warehousesModal,
	},
	computed: {
		...mapGetters([
			'getPromotionalBanner',
			'token',
		]),
	},
	data,
	methods: {
		assignProduct,
		clearFeatures,
		filterProduct,
		isLoggedUser,
		loadData,
		loadOpinions,
		loadProduct,
		newRoute,
		possibleFeature,
		clickQuantity,
		openDialog,
		closeModal,
		selectFeature,
	},
	props: {
		id: {
			type: [Number, String],
		},
	},
	watch: {
		$route: newRoute,
	},
};
</script>
<style lang="scss" scoped>
	.container-product-view {
		width: 50%;

		@media screen and (max-width: 996px) {
			width: 100%;
		}
	}

	.page-detail-product {
		background: color(white);
	}

	.detail-product-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 92px;
		padding: 53px 7% 0;

		@media screen and (max-width: 996px) {
			flex-direction: column;
			margin-bottom: 35px;
			padding: 0;
		}
	}

	.container-product-detail {
		width: 45%;

		@media screen and (max-width: 996px) {
			width: 100%;
		}
	}

	.container-product-tab {
		flex: 1 1 70%;
	}

	.container-publicity {
		flex: 1 1 30%;
		margin-right: 29px;
	}

	.detail-tab-publicity {
		display: flex;
		justify-content: space-between;
		padding: 0 3%;

		@media screen and (max-width: 764px) {
			flex-direction: column;
			padding: 0;
		}
	}

	.mobile {
		display: none;
		@media screen and (max-width: 764px) {
			display: block;
		}
	}

	.desktop {
		@media screen and (max-width: 764px) {
			display: none;
		}
	}

	.container-general-tab {
		padding: 0 7%;

		@media screen and (max-width: 764px) {
			padding: 0 5%;
		}
	}
</style>

