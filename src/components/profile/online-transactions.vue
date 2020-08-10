<template>
	<div>
		<section>
			<h3
				:style="`color: ${globalColors.primary};`"
				class="section-title">Mis transacciones online</h3>
		</section>
		<section class="table">
			<responsive-table
				align-left
				:columns="columns"
				:rows="defaultTransactions"
				:pages="totalPages"
				@page-changed="pageChange"
			>
				<template slot-scope="{ row }">
					<td class="order-number">{{row.orderNumber}}</td>
					<td class="order-amount">{{row.amount}}</td>
					<td class="order-status">{{row.status}}</td>
					<td class="order-reference">{{row.reference}}</td>
					<td class="date">{{row.createdAt}}</td>
					<td class="actions">
						<details-component class="action-btn" @click="seeDetails(row)"/>
					</td>
				</template>
			</responsive-table>
		</section>
	</div>
</template>
<script>
import carComponent from '@/components/shared/icons/car-component';
import deleteComponent from '@/components/shared/icons/delete-component';
import responsiveTable from '@/components/shared/table/respondive-table';
import detailsComponent from '@/components/shared/icons/details-component';

async function created() {
	this.loadTransactions();
}

function loadTransactions() {
	return this.defaultTransactions;
}

function buyThisProduct(product) {
	this.$store.dispatch('addProductToBuyCar', product);
	this.goTo('buy');
}

async function noMoreFavorite(product) {
	await this.$store.dispatch('SET_FAVORITE_FLAG', { context: this, product });
	this.$store.dispatch('LOAD_FAVORITES_PRODUCTS', { context: this, params: this.params });
}

function pageChange(page) {
	this.params.page = page;
	this.$store.dispatch('LOAD_FAVORITES_PRODUCTS', { context: this, params: this.params });
}

function data() {
	return {
		columns: [
			{ value: 'order', title: 'Pedido', responsive: true },
			{ value: 'amount', title: 'Monto', responsive: true },
			{ value: 'status', title: 'Estado', responsive: true },
			{ value: 'reference', title: 'Referencia Pago', responsive: false },
			{ value: 'date', title: 'Fecha', responsive: false },
			{ value: 'actions', title: 'Acciones', responsive: false },
		],
		defaultTransactions: [
			{
				orderNumber: '321',
				status: 'Pagado',
				amount: '1.232',
				reference: 'DF-3432',
				createdAt: '2020-08-02',
			},
		],
		params: {
			page: 1,
			limit: 5,
		},
		totalPages: 0,
	};
}

export default {
	name: 'online-transactions',
	components: {
		carComponent,
		deleteComponent,
		detailsComponent,
		responsiveTable,
	},
	created,
	data,
	methods: {
		buyThisProduct,
		loadTransactions,
		noMoreFavorite,
		pageChange,
	},
};
</script>
<style lang="scss" scoped>

	.product-info-container {
		align-items: center;
		display: grid;
		grid-column-gap: 20px;
		grid-template-columns: 50px 1fr;
	}

	.table {
		margin: 0 50px;
		
		@media (max-width: 600px) {
			margin: 0 10px;
		}

		td {
			padding: 10px 20px;
			text-align: center;
		}
	}

	.row-product {
		grid-column: 1/3;

		@media (max-width: 600px) {
			align-items: center;
			background-color: color(disabled);
			display: flex;
			height: 100%;
		}
	}

	.product-name {
		font-family: font(bold);
		font-size: size(medium);

		@media (max-width: 600px) {
			font-size: size(small);
		}
	}

	.product-description,
	.product-img {

		@media (max-width: 600px) {
			display: none;
		}
	}

	.order-number {
		grid-column: 1;
		grid-row: 1;

		@media (max-width: 600px) {
			font-size: size(small);
		}
	}

	.order-amount {
		grid-column: 2;
		grid-row: 1;
		white-space: nowrap;

		@media (max-width: 600px) {
			font-size: size(small);
			text-align: left;
		}
	}

	.order-status {
		grid-column: 3;
		grid-row: 1;

		@media (max-width: 600px) {
			font-size: size(small);
		}
	}

	.order-reference {
		grid-column: 2;
		grid-row: 2;

		@media (max-width: 600px) {
			border-bottom: none;
			font-size: size(small);
		}
	}

	.actions {
		grid-column: 3;
		grid-row: 2;

		@media (max-width: 600px) {
			border-bottom: none;
			font-size: size(small);
		}
	}

	.date {
		grid-column: 1;
		grid-row: 2;

		@media (max-width: 600px) {
			border-bottom: none;
			font-size: size(small);
		}
	}

	.product-actions-wrapper {
		display: flex;
	}

	.row-product {

		@media (max-width: 600px) {
			border: none;
		}
	}

	.product-img {
		height: 34px;
		object-fit: contain;
		width: 50px;
	}

	.action-btn {
		margin: 0 10px;
	}

	.section-title {
		font-family: font(bold);
		font-size: size(large);
		margin: 30px 0 40px 40px;
		text-transform: uppercase;

		@media (max-width: 500px) {
			margin-bottom: 20px;
		}
	}
</style>
