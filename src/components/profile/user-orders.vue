<template>
	<div>
		<profile-tab class="web-tab" @status-changed="statusChanged"/>
		<div class="table-container">
			<responsive-table
				:columns="columns"
				:rows="getOrders"
				:page="params.page"
				:pages="lastPage"
				@page-changed="changePage"
			>
				<template slot-scope="{ row }">
					<td class="row-date">{{row.createdAt}}</td>
					<td class="row-order">
						<span class="row-order-label">Nro. Orden: </span>{{row.number}}</td>
					<td class="row-totalOrder">
						<span class="row-totalOrder-label">Total: </span>{{row.total}}</td>
					<td class="row-orderStatus">{{getValue('orderState.name', row)}}</td>
					<td class="row-wayDelivery">{{row.pickUpName}}</td>
					<td class="row-wayPayment">{{getValue('wayPayment.name', row)}}</td>
					<td class="row-actions">
						<details-component class="action-btn" @click="seeDetails(row)"/>
						<delete-component
							v-show="row.orderState.code === 'REQUESTED' || row.orderState.code === 'CONFIRMED'"
							class="action-btn"
							@click="deleteOrder(row)"
						/>
					</td>
				</template>
			</responsive-table>
		</div>
	</div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import lib from '@/shared/lib';
import deleteComponent from '@/components/shared/icons/delete-component';
import detailsComponent from '@/components/shared/icons/details-component';
import profileTab from '@/components/shared/tabs/profile-tab';
import responsiveTable from '@/components/shared/table/respondive-table';

function created() {
	this.$store.dispatch('LOAD_ORDERS_STATUS', this);
}

async function getStatusHandler(status) {
	if (status) {
		({ id: this.orderStatusId } = lib.find(lib.equality('code', 'REQUESTED'), status));
		this.loadOrders(this.orderStatusId);
	}
}

async function loadOrders(orderStatusId) {
	this.lastPage = await this.$store.dispatch(
		'LOAD_ORDERS',
		{ context: this, params: this.params, orderStatusId },
	);
}

function seeDetails(order) {
	this.$router.push({ name: 'order-detail', params: { id: order.id } });
}

function getValue(route, order) {
	return lib.getDeeper(route)(order);
}


function changePage(page) {
	this.loadOrders(this.orderStatusId);
	this.params.page = page;
}

function statusChanged(id) {
	this.orderStatusId = id;
	this.params.page = 1;
	this.loadOrders(this.orderStatusId);
}

async function deleteOrder(order) {
	const { id } = order;
	const newOrdersArray = this.getOrders.filter(o => o.id !== id);
	this.$store.commit('SET_ORDERS', newOrdersArray);
	await this.CANCEL_ORDER({ context: this, id });
}

function data() {
	return {
		columns: [
			{ value: 'date', title: 'Fecha de orden', responsive: true },
			{ value: '', title: 'Número de orden', responsive: false },
			{ value: '', title: 'Total Orden' },
			{ value: 'orderStatus', title: 'Estado', responsive: true },
			{ value: 'wayDelivery', title: 'Modo de entrega', responsive: false },
			{ value: 'wayPayment', title: 'Método de pago', responsive: true },
			{ value: '', title: 'Acción' },
		],
		lastPage: 0,
		orderStatusId: 0,
		params: {
			limit: 5,
			page: 1,
		},
	};
}

export default {
	name: 'user-orders',
	components: {
		deleteComponent,
		detailsComponent,
		profileTab,
		responsiveTable,
	},
	computed: {
		...mapGetters([
			'getOrders',
			'getStatus',
		]),
	},
	created,
	data,
	methods: {
		...mapActions([
			'CANCEL_ORDER',
		]),
		changePage,
		deleteOrder,
		getStatusHandler,
		getValue,
		loadOrders,
		seeDetails,
		statusChanged,
	},
	watch: {
		getStatus: {
			deep: true,
			handler: getStatusHandler,
		},
	},
};
</script>
<style lang="scss" scoped>
	.web-tab {
		bottom: 100%;
		position: absolute;
		width: 100%;

		@media (max-width: 900px) {
			bottom: 90%;
		}
	}

	.table-container {
		margin: 50px 50px 0;

		@media (max-width: 600px) {
			margin: 20px 10px 0;
		}
	}

	.row-order {
		grid-column: 1/2;
		grid-row: 1/2;

		@media (max-width: 600px) {
			border: none;
			font-family: font(bold);
			font-size: size(small);
			line-height: 45px;
		}
	}

	.row-date {
		grid-column: 1/2;
		grid-row: 2/3;

		@media (max-width: 600px) {
			background-color: color(background);
			font-size: size(small);
			line-height: 45px;
		}
	}

	.row-totalOrder {
		grid-column: 2/3;
		grid-row: 1/2;

		@media (max-width: 600px) {
			border: none;
			font-family: font(bold);
			font-size: size(small);
			line-height: 45px;
		}
	}

	.row-orderStatus {
		grid-column: 2/3;
		grid-row: 2/3;

		@media (max-width: 600px) {
			background-color: color(background);
			font-size: size(small);
			line-height: 45px;
		}
	}

	.row-actions {
		display: flex;
		grid-column: 3/4;
		grid-row: 1/2;

		@media (max-width: 600px) {
			border: none;
			line-height: 45px;
		}
	}

	.row-wayPayment {
		grid-column: 3/4;
		grid-row: 2/3;

		@media (max-width: 600px) {
			background-color: color(background);
			font-size: size(small);
			line-height: 45px;
			overflow: hidden;
		}
	}

	.row-wayDelivery {
		
		@media (max-width: 600px) {
			display: none;
		}
	}

	.action-btn {
		margin: 0 10px;
	}

	.row-totalOrder-label,
	.row-order-label {
		display: none;

		@media (max-width: 600px) {
			display: inline-block,
		}
	}
</style>
