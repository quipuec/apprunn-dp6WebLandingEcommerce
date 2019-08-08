<template>
	<div class="page-detail-product">
		<div class="detail-product-top">
			<product-view 
				:data="product"
				class="container-product-view"/>
			<productDetail 
				:data="product"
				class="container-product-detail"/>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const productView = () => import('@/components/products/product-view');
const productDetail = () => import('@/components/products/product-detail');

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
	} catch (error) {
		this.showGenericError();
	}
}

function data() {
	return {
		product: {},
	};
}

export default {
	name: 'page-detail-product',
	created,
	components: {
		productView,
		productDetail,
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
		padding: 0 7%;

		@media screen and (max-width: 996px) {
			flex-direction: column;
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
</style>

