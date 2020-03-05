import lib, { isEmpty, getDeeper } from '@/shared/lib';

const twoDecimals = lib.decimals(2);

const getters = {
	getProductToBuy(state) {
		if (state.order.products) {
			const products = lib.map(
				lib.setNewProperty(
					'total',
					({ price, salePrice, priceDiscount, quantity }) =>
						twoDecimals(quantity * (salePrice || priceDiscount || price)),
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
		const newProducts = isEmpty(order) ? products : order.details;
		if (newProducts) {
			return newProducts.reduce(
				(acc, { price, priceDiscount, salePrice, quantity }) =>
					twoDecimals((priceDiscount || salePrice || price) * quantity) + acc, 0);
		}
		return 0;
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
		const invalidResponsible = isEmpty(responsible);
		const invalidDelivery = isEmpty(delivery);
		const invalidNewDelvery = getDeeper('id')(delivery) === 0
			? isEmpty(customerAddress) : false;
		const invalidBill = flagBill ? isEmpty(bill) : false;
		const invalidShippingCost = flagPickUp === 1 ? isEmpty(shippingCost) : false;
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
	getStates(state) {
		return state.order.orderStates;
	},
	getOrderDetails(state) {
		const { products, order } = state.order;
		const newProducts = isEmpty(order) ? products : order.details;
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
	getBankAccounts(state) {
		const bankAccounts = state.order.bankAccountsRelated;
		return bankAccounts.reduce((acum, bank) => {
			const newAcum = [...acum];
			const newBank = { ...bank };
			const index = newAcum.findIndex(n => n.bankId === bank.bankId);
			if (index > -1) {
				newAcum[index].accounts.push(bank);
			} else {
				newBank.accounts = [{ ...bank }];
				newAcum.push(newBank);
			}
			return newAcum;
		}, []);
	},
};

export default getters;
