import lib from '@/shared/lib';
import helper from '@/shared/helper';

const asyncActions = {
	LOAD_PRODUCTS: async ({ commit, state }, { context, params }) => {
		const request = [];
		if (state.token) {
			request.push(context.$httpProducts.get('products/favorites', { params }));
		} else {
			request.push(context.$httpProducts.get('products-public', { params }));
		}
		const [{ data: products }] = await Promise.all(request);
		commit('SET_PRODUCTS', products);
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
		localStorage.setItem('ecommerce-order', JSON.stringify(order));
		store.dispatch('getOrderData', order);
	},
	LOAD_DEPARTMENTS: async ({ commit }, context) => {
		const url = 'province';
		const { data: departments } = await context.$httpSales.get(url);
		commit('SET_DEPARTMENTS', departments);
	},
	LOAD_PROVINCES: async ({ commit }, { context, departmentId }) => {
		const url = `cities/${departmentId}`;
		const { data: districts } = await context.$httpSales.get(url);
		commit('SET_PROVINCES', districts);
	},
	LOAD_DISTRICTS: async ({ commit }, { context, districtId }) => {
		const url = `parish/${districtId}`;
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
		commit('SET_ORDER_DETAILS', orderDetails);
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
};

export default asyncActions;
