import lib from '@/shared/lib';
import helper from '@/shared/helper';

const asyncActions = {
	LOAD_PRODUCTS: async ({ commit, state, getters }, { context, params = {} }) => {
		const request = [];
		const completeParams = Object.assign({}, params, getters.productParams);
		if (state.token) {
			request.push(
				context.$httpProducts.get('products/favorites', { params: completeParams }),
			);
		} else {
			request.push(
				context.$httpProducts.get('products-public', { params: completeParams }),
			);
		}
		const [{ data: products, headers }] = await Promise.all(request);
		const setUpDateInProducts = products.map(
			lib.setNewProperty('createdAt', ({ createdAt }) => helper.formatDate(createdAt)),
		);
		const newProducts = [].concat(state.products.list, setUpDateInProducts);
		commit('SET_PRODUCTS', newProducts);
		commit('LAST_PAGE', headers);
	},
	SET_FAVORITE_FLAG: async ({ commit, state }, { context, product }) => {
		const url = `products/favorite/${product.id}`;
		const body = {
			isFavorite: !product.flagFavorite,
		};
		if (state.token) {
			await context.$httpProducts.post(url, body);
		} else {
			const message = {
				text: 'Debe iniciar sesión para agregar a favoritos',
				isVisible: true,
				color: 'error',
			};
			commit('showSnackBar', message);
		}
	},
	CREATE_ORDER: async (store, { context, body }) => {
		const url = 'orders';
		const { data: order } = await context.$httpSales.post(url, body);
		asyncActions.GET_ORDER_INFO(store, { context, id: order.id });
	},
	UPDATE_ORDER: async (store, { context, id, body }) => {
		const url = `orders/${id}`;
		const { data: order } = await context.$httpSales.patch(url, body);
		asyncActions.GET_ORDER_INFO(store, { context, id: order.id });
	},
	GET_ORDER_INFO: async (store, { context, id }) => {
		const url = `orders/${id}`;
		const { data: order } = await context.$httpSales.get(url);
		localStorage.setItem('ecommerce-order', JSON.stringify(order));
		store.dispatch('getOrderData', order);
	},
	LOAD_DEPARTMENTS: async ({ commit }, context) => {
		const url = 'province';
		const { data: departments } = await context.$httpSales.get(url);
		commit('SET_DEPARTMENTS', departments);
	},
	LOAD_PROVINCES: async ({ commit }, { context, provinceId }) => {
		const url = `cities/${provinceId}`;
		const { data: cities } = await context.$httpSales.get(url);
		commit('SET_PROVINCES', cities);
	},
	LOAD_DISTRICTS: async ({ commit }, { context, cityId }) => {
		const url = `parish/${cityId}`;
		const { data: parish } = await context.$httpSales.get(url);
		commit('SET_DISTRICTS', parish);
	},
	LOAD_CATEGORIES: async ({ commit }, { context }) => {
		let { data: response } = await context.$httpProductsPublic.get('e-categories-public');
		response = response.map((r) => {
			const newCategory = { ...r };
			newCategory.select = false;
			newCategory.hover = false;
			return newCategory;
		});
		commit('SET_CATEGORIES', response);
	},
	LOAD_USER_ADDRESS: async ({ commit }, { context, params }) => {
		const { data: address, headers } = await context.$httpSales.get('customers-address', { params });
		commit('SET_USER_ADDRESS', address);
		commit('SET_DIRECTIONS', address);
		return Number(headers['x-last-page']);
	},
	LOAD_DIRECTIONS: async ({ commit }, context) => {
		const url = 'customers-address';
		const { data: directions } = await context.$httpSales.get(url);
		commit('SET_DIRECTIONS', directions);
	},
	LOAD_WAREHOUSES: async ({ commit }, context) => {
		const url = 'warehouse-public';
		const { data: warehouses } = await context.$httpProductsPublic.get(url);
		commit('SET_WAREHOUSES', warehouses);
	},
	NEW_ADDRESS: async ({ commit }, { context, newAddress }) => {
		await context.$httpSales.post('customers-address', newAddress);
		asyncActions.LOAD_USER_ADDRESS(
			{ commit },
			{ context, params: { page: 1, limit: 5 } });
	},
	SET_FAVORITE_ADDRESS: async (state, { context, body, id }) => {
		await context.$httpSales.patch(`customers-address/${id}`, body);
	},
	DELETE_ADDRESS: async (state, { context, id }) => {
		await context.$httpSales.delete(`customers-address/${id}`);
	},
	LOAD_ORDERS_STATUS: async ({ commit }, context) => {
		const { data: orderStatus } = await context.$httpSales.get('order-states');
		commit('SET_ORDER_STATUS', orderStatus);
	},
	LOAD_ORDERS: async ({ commit }, { context, params, orderStatusId }) => {
		const url = `orders?orderStateId=${orderStatusId}`;
		const { data: orders, headers } = await context.$httpSales.get(url, { params });
		const setUpDateInOrders = orders.map(
			lib.setNewProperty('createdAt', ({ createdAt }) => helper.formatDate(createdAt)),
		);
		commit('SET_ORDERS', setUpDateInOrders);
		return Number(headers['x-last-page']);
	},
	LOAD_ORDER_DETAILS: async ({ commit }, { context, orderId }) => {
		const url = `orders/${orderId}`;
		const { data: orderDetails } = await context.$httpSales.get(url);
		orderDetails.createdAt = helper.formatDate(orderDetails.createdAt);
		commit('SET_ORDER_INFO', orderDetails);
	},
	UPDATE_USER_DATA: async (state, { context, body }) => {
		const url = 'customers-public';
		await context.$httpSales.patch(url, body);
		asyncActions.LOAD_USER_DATA(state, context);
	},
	LOAD_USER_DATA: async ({ commit }, context) => {
		const url = 'customers/current';
		const { data: user } = await context.$httpSales.get(url);
		commit('setUser', user);
	},
	SET_CURRENCY_DEFAULT: async ({ commit }, context) => {
		const aclCode = process.env.ACL_COMPANY_CODE;
		const url = `companies/${aclCode}/acl`;
		const { data: res } = await context.$httpSales.get(url);
		context.setLocalData(`${process.env.STORAGE_USER_KEY}::currency-default`, res.currencyDefault);
		commit('SET_CURRENCY_DEFAULT', res.currencyDefault);
	},
	LOAD_FILTERS: async ({ commit }, context) => {
		const { data: filters } = await context.$httpProductsPublic.get('filters-public');
		const newFilters = lib.map(lib.setNewProperty('select', (filter, index) => index === 0), filters);
		commit('UPDATE_FILTERS', newFilters);
	},
	LOAD_FAVORITES_PRODUCTS: async ({ commit }, { context, params }) => {
		const url = 'products/favorites?favorite=true';
		const { data: favorites, headers } = await context.$httpProducts.get(url, { params });
		const newFavorites = favorites.map(
			lib.setNewProperty('createdAt', ({ createdAt }) => helper.formatDate(createdAt)),
		);
		commit('SET_FAVORITES', newFavorites);
		return Number(headers['x-last-page']);
	},
	LOAD_BANNERS: async ({ commit }, context) => {
		const { data: banners } = await context.$httpProductsPublic.get('banners-public');
		commit('SET_BANNERS', banners);
	},
	LOAD_COMMERCE_INFO: async ({ commit, dispatch }, context) => {
		const url = `com-ecommerce-companies/${process.env.COMMERCE_CODE}/public`;
		const { data: commerceData } = await context.$httpSalesPublic.get(url);
		context.setLocalData(`${process.env.STORAGE_USER_KEY}::ecommerce-data`, commerceData);
		commit('SET_COMMERCE_DATA', commerceData);
		dispatch('SET_ECOMMERCE_THEME', commerceData.settings.theme);
		const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
		link.type = 'image/x-icon';
		link.rel = 'shortcut icon';
		link.href = commerceData.urlDomain;
		link.sizes = '16x16';
		document.getElementsByTagName('head')[0].appendChild(link);
		const pageTitle = document.getElementsByTagName('title');
		pageTitle[0].innerHTML = commerceData.name || 'AppRunn SAC';
	},
};

export default asyncActions;
