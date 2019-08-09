<template>
	<div class="page-detail-product">
		<div class="detail-product-top">
			<product-view 
				:data="product"
				class="container-product-view"/>
			<productDetail 
				:data="product"
				class="container-product-detail"
				@update="loadData"/>
		</div>
		<div>
			<product-tab 
				class="container-product-tab"
				:tabs="tabs"
				:sections="product.sections"
				:lastIndex="lastIndex"/>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const productView = () => import('@/components/products/product-view');
const productDetail = () => import('@/components/products/product-detail');
const productTab = () => import('@/components/products/product-tab');

function isLoggedUser() {
	if (this.token) {
		return this.$httpProducts.get(`products/favorites/${this.id}`);
	}
	return this.$httpProductsPublic.get(`products-public/${this.id}`);
}

function created() {
	this.loadData();
}

async function loadData() {
	try {
		const { data: response } = await this.isLoggedUser();
		this.product = response;
		this.product.images = this.product.images.map((i, index) => {
			const newImage = { ...i };
			newImage.select = index === 0;
			return newImage;
		});
		this.tabs = this.product.sections.map(p => p.name);
		this.tabs.push('Comentarios');
		this.lastIndex = this.product.sections.length;
	} catch (error) {
		this.showGenericError();
	}
}

function data() {
	return {
		product: {},
		tabs: [],
		lastIndex: 0,
	};
}

export default {
	name: 'page-detail-product',
	created,
	components: {
		productView,
		productDetail,
		productTab,
	},
	computed: {
		...mapGetters([
			'token',
		]),
	},
	data,
	methods: {
		loadData,
		isLoggedUser,
	},
	props: {
		id: {
			type: [Number, String],
		},
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
		padding: 53px 41px 0 41px;

		@media screen and (max-width: 996px) {
			padding: 27px 0 0;
		}
	}

	.detail-product-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 92px;
		padding: 0 7%;

		@media screen and (max-width: 996px) {
			flex-direction: column;
			margin-bottom: 35px;
			padding: 0;
		}
	}

	.container-product-detail {
		width: 45%;
		@media screen and (max-width: 996px) {
			padding: 0 5%;
			width: 100%;
		}
	}

	.container-product-tab {
		width: 80%;
	}
</style>

