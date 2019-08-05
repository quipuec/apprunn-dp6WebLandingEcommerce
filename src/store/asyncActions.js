const asyncActions = {
	LOAD_PRODUCTS: async ({ commit, state }, { context }) => {
		const { params } = state.products;
		const request = [];
		if (context.$store.state.token) {
			const headers = {
				Authorization: `Bearer ${context.$store.state.token}`,
			};
			request.push(context.$httpProducts.get('products/favorites', { headers, params }));
		} else {
			request.push(context.$httpProducts.get('products-public', { params }));
		}
		const [{ data: products }] = await Promise.all(request);
		commit('SET_PRODUCTS', products);
	},
	SET_FAVORITE_FLAG: async (state, { context, product }) => {
		const headers = {
			Authorization: `Bearer ${context.token}`,
		};
		const url = `products/favorite/${context.product.id}`;
		const body = {
			isFavorite: product.flagFavorite,
		};
		await this.$httpQtc.post(url, body, { headers });
	},
};

export default asyncActions;
