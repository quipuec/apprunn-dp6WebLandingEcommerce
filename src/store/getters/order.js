import lib from '@/shared/lib';

const twoDecimals = lib.decimals(2);

const getters = {
	getProductToBuy(state) {
		if (state.order.products) {
			const products = lib.map(
				lib.setNewProperty(
					'total',
					({ salePrice, priceDiscount, quantity }) =>
						twoDecimals(quantity * (salePrice || priceDiscount)),
				),
				state.order.products,
			);
			return products;
		}
		return [];
	},
	getOrderId(state) {
		return state.order.id;
	},
	getTotalToBuy(state) {
		const { products, order } = state.order;
		const newProducts = order ? order.details : products;
		return newProducts.reduce(
			(acc, { priceDiscount, salePrice, quantity }) =>
				twoDecimals((priceDiscount || salePrice) * quantity) + acc, 0);
	},
	getTotalQuantityProducts(state) {
		const { products } = state.order;
		return products ? products.length : 0;
	},
	getFlagPickUp(state) {
		return state.order.flagPickUp;
	},
	getDeliveryAddress(state) {
		return state.order.delivery;
	},
	invalidOrder(state) {
		const {
			responsible,
			delivery,
			flagBill,
			bill,
			shippingCost,
			flagPickUp,
			customerAddress,
		} = state.order;
		const invalidResponsible = lib.isEmpty(responsible);
		const invalidDelivery = lib.isEmpty(delivery);
		const invalidNewDelvery = lib.getDeeper('id')(delivery) === 0
			? lib.isEmpty(customerAddress) : false;
		const invalidBill = flagBill ? lib.isEmpty(bill) : false;
		const invalidShippingCost = flagPickUp === 1 ? lib.isEmpty(shippingCost) : false;
		return lib.atLeastOneTrue(
			invalidResponsible,
			invalidDelivery,
			invalidBill,
			invalidShippingCost,
			invalidNewDelvery,
		);
	},
	getFlagBill(state) {
		return state.order.flagBill;
	},
	getOrders(state) {
		return state.order.list;
	},
	getStatus(state) {
		return state.order.orderStatus;
	},
	getOrderDetails(state) {
		const { products, order } = state.order;
		const newProducts = order ? order.details : products;
		return newProducts;
	},
	getResponsible(state) {
		return state.order.responsible;
	},
	getShippingCost(state) {
		return state.order.shippingCost;
	},
	getCustomerAddress(state) {
		return state.order.customerAddress;
	},
	getCustomerAddressId(state) {
		return state.order.customerAddressId;
	},
	getBillingData(state) {
		return state.order.bill;
	},
	getOrderStatus(state) {
		return state.order.orderStatus;
	},
	getWayPayment(state) {
		return state.order.paymentMethod;
	},
	getOrderInfo(state) {
		return state.order.order;
	},
	getFlagStatusOrder(state) {
		return state.order.flagStatusOrder;
	},
	getWaysPayments(state) {
		return state.order.waysPayments;
	},
};

export default getters;
