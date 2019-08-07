<template>
	<layout-admin>
		<div class="detail-product">
			<div class="detail-product-top">
				<product-view 
					:data="product"
					class="container-product-view"/>
			</div>
		</div>
	</layout-admin>
</template>
<script>
import { mapGetters } from 'vuex';

const productView = () => import('@/components/products/product-view');

function isLoggedUser() {
	if (this.token) {
		return this.$httpProducts.get(`products/favorites/${this.id}`);
	}
	return this.$productsPublicInstance.get(`products-public/${this.id}`);
}

function created() {
	this.loadData();
}

async function loadData() {
	try {
		const { data: response } = await this.isLoggedUser();
		this.product = response;
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
	}

	.detail-product {
		padding: 53px 41px 0 41px;
	}

	.detail-product-top {
		padding: 0 7%;
	}
</style>

