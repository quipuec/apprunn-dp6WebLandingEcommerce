<template>
	<div class="summary-container">
		<section class="summary-order">
			<div class="summary-header text-xs-center">
				<p class="summary-title">Resumen de Compra</p>
			</div>
			<div class="summary-amounts">
				<p class="summary-amount-container separate">
					<span>Subtotal</span><span class="summary-amount">{{getTotalToBuy}}</span>
				</p>
				<p class="summary-amount-container separate">
					<span>Descuento</span><span class="summary-amount">{{discount}}</span>
				</p>
				<p class="summary-amount-container separate">
					<span>Envío</span><span class="summary-amount">{{shippingCost}}</span>
				</p>
				<p class="summary-amount-container separate shipping" v-if="stepThree">
					<button
						type="button"
						class="shipping-cost"
					>
						<span>Calcular costo de envío</span>
						<i class="material-icons">expand_less</i>
					</button>
				</p>
				<p class="summary-amount-container total">
					<span>Total</span><span class="summary-total">{{total}}</span>
				</p>
			</div>
		</section>
		<section class="btns-summary-order">
			<app-button
				v-if="stepOne"
				action='Pagar'
				class="btn-order"
				:background="globalColors.primary"
				@click="goTo('buy-delivery')"
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
				v-else
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
import lib from '@/shared/lib';

function total() {
	return (this.getTotalToBuy - this.discount) + this.shippingCost;
}

async function makeOrder(flagFinish) {
	const body = this.buildBody(flagFinish);
	await this.$store.dispatch('CREATE_ORDER', { context: this, body });
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
		customerBill: this.getBillingData,
		deliveryAddress: this.getDeliveryAddress,
		details: this.getDetails(this.getOrderDetails),
		flagPickUp: this.getFlagPickUp,
		responsiblePickUp: this.getResponsible,
		warehouseId: process.env.WAREHOUSE_ID,
		warehouseName: process.env.WAREHOUSE_NAME,
		warehouseAddress: process.env.WAREHOUSE_ADDRESS,
	};
	if (this.getOrderId && this.getOrderStatus) {
		body.orderStateId = this.orderStateId;
		body.flagStatusOrder = flagFinish ? 3 : this.getOrderStatus;
		body.bankAccountId = flagFinish ? this.getWayPayment.bankAccountId : null;
		body.wayPaymentId = flagFinish ? this.getWayPayment.id : null;
	}
	body.commerceCode = process.env.COMMERCE_CODE;
	return body;
}

function getDetails(products) {
	return products.map((p) => {
		const { taxes } = p;
		const newTaxes = this.setTaxes(taxes);
		const newP = {
			alternateCode: p.alternateCode,
			brandId: lib.getDeeper('warehouseProduct.brandId')(p) || p.brandId,
			brandName: lib.getDeeper('warehouseProduct.brand.name')(p) || p.brandName,
			categoryId: p.categoryId,
			categoryName: lib.getDeeper('category.name')(p) || p.categoryName,
			codeTaxes: taxes[0].code,
			description: p.description,
			discount: p.discount || 0,
			discountPercentage: p.discountPercentage || 0,
			product: {
				id: p.id || p.productId,
				taxes: [...newTaxes],
				type: lib.getDeeper('typeInfo.id')(p) || lib.getDeeper('product.type')(p),
			},
			productCode: p.code || p.productCode,
			productId: p.id || p.productId,
			productImage: p.urlImage || p.productImage,
			productName: p.name || p.productName,
			quantity: p.quantity,
			salePrice: p.priceDiscount || p.salePrice,
			stockQuantity: p.stock,
			taxes: newTaxes,
			unit: p.unit,
			unitCode: p.unit.code,
			unitConversion: 1,
			unitId: p.unitId,
			unitName: p.unit.name,
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
	return lib.getDeeper('meta.step')(this.$route) === 3;
}

function stepOne() {
	return lib.getDeeper('meta.step')(this.$route) === 1;
}

function stepTwo() {
	return lib.getDeeper('meta.step')(this.$route) === 2;
}

function data() {
	return {
		discount: 0,
		shippingCost: 0,
	};
}

export default {
	name: 'summary-order',
	components: {
		appButton,
	},
	computed: {
		...mapGetters([
			'getBillingData',
			'getCustomerAddress',
			'getCustomerAddressId',
			'getDeliveryAddress',
			'getFlagPickUp',
			'getOrderDetails',
			'getOrderId',
			'getOrderStateId',
			'getOrderStatus',
			'getProductsToBuy',
			'getResponsible',
			'getShippingCost',
			'getTotalToBuy',
			'getWayPayment',
			'invalidOrder',
		]),
		stepOne,
		stepThree,
		stepTwo,
		total,
	},
	data,
	methods: {
		buildBody,
		getDetails,
		makeOrder,
		setTaxes,
	},
};
</script>
<style lang="scss" scoped>
	.summary-container {
		position: sticky;
		top: 65px;
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
		color: color(primary) !important;
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

