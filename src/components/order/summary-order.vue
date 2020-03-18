<template>
	<div class="summary-container">
		<section class="summary-order">
			<div class="summary-header text-xs-center">
				<p class="summary-title">Resumen de Compra</p>
			</div>
			<div class="summary-amounts">
				<p class="summary-amount-container separate">
					<span>Subtotal</span><span class="summary-amount">{{getCurrencySymbol}}. {{getTotalToBuy | currencyFormat}}</span>
				</p>
				<p class="summary-amount-container separate">
					<span>Descuento</span><span class="summary-amount">{{getCurrencySymbol}}. {{discount | currencyFormat}}</span>
				</p>
				<p class="summary-amount-container separate">
					<span>Envío</span><span class="summary-amount">{{getCurrencySymbol}}. {{getShippingCost | currencyFormat}}</span>
				</p>
				<p class="summary-amount-container total">
					<span>Total</span><span class="summary-total">{{getCurrencySymbol}}. {{total | currencyFormat}}</span>
				</p>
			</div>
		</section>
		<section class="btns-summary-order">
			<app-button
				v-if="stepOne"
				action='Hacer pedido'
				class="btn-order"
				:background="globalColors.primary"
				@click="goToMakeOrder"
			/>
			<app-button
				v-else-if="stepTwo"
				action="Pasar a caja"
				class="btn-order"
				:background="globalColors.primary"
				:disabled="invalidOrder"
				@click="makeOrder(false)"
			/>
			<app-button
				v-else-if="stepThree"
				action="Pagar"
				class="btn-order"
				:background="globalColors.primary"
				@click="makeOrder(true)"
			/>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import appButton from '@/components/shared/buttons/app-button';
import { isEmpty, getDeeper } from '@/shared/lib';

function total() {
	return (this.getTotalToBuy - this.discount) + this.getShippingCost;
}

async function makeOrder(flagFinish) {
	const body = this.buildBody(flagFinish);
	const orderExist = !isEmpty(this.getOrderInfo);
	const dispatchName = orderExist ? 'UPDATE_ORDER' : 'CREATE_ORDER';
	const dispatchObj = orderExist
		? { context: this, id: this.getOrderInfo.id, body }
		: { context: this, body };
	await this.$store.dispatch(dispatchName, dispatchObj);
	if (flagFinish) {
		this.goTo('buy-summary');
	} else {
		this.goTo('buy-payment');
	}
}

function buildBody(flagFinish) {
	const body = {
		costShipping: this.getShippingCost,
		customerAddressId: this.getCustomerAddressId,
		customerAddress: this.getCustomerAddressId ? null : this.getCustomerAddress,
		customerBill: this.getFlagBill ? this.getBillingData : null,
		deliveryAddress: this.getCustomerAddressId
			? this.getDeliveryAddress : this.getCustomerAddress,
		details: this.getDetails(this.getOrderDetails, this.getOrderId),
		discount: this.discount,
		flagPickUp: this.getFlagPickUp,
		responsiblePickUp: this.getResponsible,
		warehouseId: process.env.WAREHOUSE_ID,
		warehouseName: process.env.WAREHOUSE_NAME,
		warehouseAddress: process.env.WAREHOUSE_ADDRESS,
	};
	if (this.getOrderId && this.getOrderStatus) {
		body.orderStateId = this.getOrderStatus;
		body.flagStatusOrder = flagFinish ? 3 : this.getFlagStatusOrder;
		body.bankAccountId = flagFinish ? this.getWayPayment.bankAccountId : null;
		body.wayPaymentId = flagFinish ? this.getWayPayment.wayPayment : null;
	} else {
		body.commerceCode = process.env.COMMERCE_CODE;
	}
	return body;
}

function getUnitOrConvesion(product, orderId) {
	if (orderId) {
		return product.unit;
	}
	const { conversions, unit, unitId, unitSelected } = product;
	return unitId === unitSelected ? unit : conversions[unitSelected];
}

function getDetails(products, orderId) {
	return products.map((p) => {
		const conversionSelected = this.getUnitOrConvesion(p, orderId);
		const { taxes } = p;
		const newTaxes = this.setTaxes(taxes);
		const newP = {
			alternateCode: p.alternateCode,
			brandId: getDeeper('warehouseProduct.brandId')(p) || p.brandId,
			brandName: getDeeper('warehouseProduct.brand.name')(p) || p.brandName,
			categoryId: p.categoryId,
			categoryName: getDeeper('category.name')(p) || p.categoryName,
			codeTaxes: taxes[0].code,
			description: p.description,
			discount: p.discount || 0,
			discountPercentage: p.discountPercentage || 0,
			product: {
				id: p.productId || p.id,
				taxes: [...newTaxes],
				type: getDeeper('typeInfo.id')(p) || getDeeper('product.type')(p),
			},
			productCode: p.code || p.productCode,
			productId: p.productId || p.id,
			productImage: p.imagePresentation || p.productImage,
			productName: p.name || p.productName,
			quantity: p.quantity,
			salePrice: p.priceDiscount || p.salePrice || p.price,
			stockQuantity: p.stock,
			taxes: newTaxes,
			unit: conversionSelected,
			unitCode: conversionSelected.code,
			unitConversion: conversionSelected.quantity,
			unitId: conversionSelected.id,
			unitName: conversionSelected.name,
			unitQuantity: p.quantity,
			warehouseId: process.env.WAREHOUSE_ID,
			warehouseName: process.env.WAREHOUSE_NAME,
		};
		return newP;
	});
}

function setTaxes(taxes) {
	const newTaxes = [];
	if (!taxes && taxes.length === 0) {
		newTaxes[0] = {
			code: '01',
			codeTable: 'TABLE17',
			codePercentage: '01',
			flagSales: true,
			flagPurchases: false,
		};
	} else {
		const tax = taxes[0];
		newTaxes[0] = {
			code: tax.code,
			codeTable: tax.codeTable,
			codePercentage: tax.codePercentage,
			flagSales: Boolean(tax.flagSales),
			flagPurchases: Boolean(tax.flagPurchases),
		};
	}
	return newTaxes;
}

function stepThree() {
	return getDeeper('meta.step')(this.$route) === 3;
}

function stepOne() {
	return getDeeper('meta.step')(this.$route) === 1;
}

function stepTwo() {
	return getDeeper('meta.step')(this.$route) === 2;
}

function goToMakeOrder() {
	if (this.token) {
		this.goTo('buy-delivery');
	} else {
		this.showGenericError('Debe iniciar sesión para hacer el pedido');
	}
}

function discount() {
	const percentage = this.user.discount;
	const amount = this.getTotalToBuy * (Number(percentage) / 100);
	return Number(amount.toFixed(2));
}

export default {
	name: 'summary-order',
	components: {
		appButton,
	},
	computed: {
		...mapGetters([
			'getBillingData',
			'getCurrencySymbol',
			'getCustomerAddress',
			'getCustomerAddressId',
			'getDeliveryAddress',
			'getFlagBill',
			'getFlagPickUp',
			'getFlagStatusOrder',
			'getOrderDetails',
			'getOrderId',
			'getOrderInfo',
			'getOrderStateId',
			'getOrderStatus',
			'getProductsToBuy',
			'getResponsible',
			'getShippingCost',
			'getTotalToBuy',
			'getWayPayment',
			'invalidOrder',
			'token',
			'user',
		]),
		discount,
		stepOne,
		stepThree,
		stepTwo,
		total,
	},
	methods: {
		buildBody,
		getDetails,
		getUnitOrConvesion,
		goToMakeOrder,
		makeOrder,
		setTaxes,
	},
};
</script>
<style lang="scss" scoped>
	.summary-container {
		position: sticky;
		top: 115px;
		margin: 0 auto;
		max-width: 400px;
	}

	.summary-order {
		background-color: white;
		border-radius: 20px;
		box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.18);
		margin-bottom: 10px;
		padding: 8px;
	}

	.summary-header {
		border-bottom: 1px solid color(border);
		color: color(dark);
		font-family: font(demi);
		font-size: size(medium);
		font-weight: bold;
		padding: 25px 70px 17px;
	}

	.summary-title {
		margin: 0 auto;
		white-space: nowrap;	
	}

	.summary-amounts {
		color: color(dark);
		font-family: font(demi);
		font-size: size(medium);
		padding: 50px 32px 16px;
	}

	.summary-amount-container {
		align-items: center;
		display: flex;
		justify-content: space-between;
	}

	.total {
		margin-bottom: 0;
	}

	.separate {
		border-bottom: 1px solid color(border);
	}

	.shipping {
		padding-bottom: 12px;
	}

	.shipping-cost {
		align-items: center;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.summary-amount {
		color: color(base);
		font-family: font(medium);
		font-size: size(medium);
	}

	.summay-total {
		font-family: font(bold);
	}
</style>

