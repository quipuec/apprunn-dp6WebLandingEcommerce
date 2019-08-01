const asyncActions = {
	LOAD_PRODUCTS: async ({ commit }, { context, params = {} }) => {
		const request = [];
		if (context.token) {
			const headers = {
				Authorization: `Bearer ${context.token}`,
			};
			request.push(context.$http.get('products/favorites', { headers, params }));
		} else {
			request.push(context.$http.get('products-public', { params }));
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
