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
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

const productView = () => import('@/components/products/product-view');
const productDetail = () => import('@/components/products/product-detail');
const productTab = () => import('@/components/products/product-tab');
const productRelated = () => import('@/components/products/product-related');

function isLoggedUser() {
	if (this.token) {
		return this.$httpProducts.get(`products/favorites/${this.id}`);
	}
	return this.$httpProductsPublic.get(`products-public/${this.id}`);
}

function created() {
	this.loadData();
	this.loadOpinions();
}

async function loadData() {
	const requests = [
		this.$httpProductsPublic.get(`products-public/${this.id}/related`),
	];
	requests.push(this.isLoggedUser());
	([
		{ data: this.relateds },
		{ data: this.product },
	] = await Promise.all(requests));
	this.product.images = this.product.images.map((i, index) => {
		const newImage = { ...i };
		newImage.select = index === 0;
		return newImage;
	});
	this.tabs = this.product.sections.map(p => p.name);
	this.tabs.push('Comentarios');
	this.lastIndex = this.product.sections.length;
}

async function loadOpinions() {
	const params = {
		typeQuestionAnswer: 3,
		productId: this.id,
	};
	const { data: response } = await this.$httpProducts.get('question-answer', { params });
	this.opinions = response;
}

function newRoute() {
	this.loadData();
	this.loadOpinions();
}

function data() {
	return {
		lastIndex: 0,
		opinions: [],
		product: {},
		relateds: [],
		tabs: [],
	};
}

export default {
	name: 'page-detail-product',
	created,
	components: {
		productView,
		productDetail,
		productTab,
		productRelated,
	},
	computed: {
		...mapGetters([
			'token',
		]),
	},
	data,
	methods: {
		isLoggedUser,
		loadData,
		loadOpinions,
		newRoute,
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
			padding: 0 5%;
			width: 100%;
		}
	}

	.container-product-tab {
		width: 65%;
		
		@media screen and (max-width: 996px) {
			width: 100%;
		}
	}
</style>

