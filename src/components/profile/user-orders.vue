<template>
	<div>
		<profile-tab class="web-tab"/>
		<div class="table-container">
			<responsive-table
				:columns="columns"
				:rows="rows"
				:pages="50"
			>
				<template slot-scope="{ row }">
					<td class="row-date">{{row.date}}</td>
					<td class="row-order">
						<span class="row-order-label">Nro. Orden: </span>{{row.order}}</td>
					<td class="row-totalOrder">
						<span class="row-totalOrder-label">Total: </span>{{row.totalOrder}}</td>
					<td class="row-orderStatus">{{row.orderStatus}}</td>
					<td class="row-wayDelivery">{{row.wayDelivery}}</td>
					<td class="row-wayPayment">{{row.wayPayment}}</td>
					<td class="row-actions">
						<details-component class="action-btn" @click="seeDetails(row)"/>
						<delete-component class="action-btn"/>
					</td>
				</template>
			</responsive-table>
		</div>
	</div>
</template>
<script>

function seeDetails({ order }) {
	this.$router.push({ name: 'order-detail', params: { n: order } });
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
		rows: [
			{
				date: '23/04/2019',
				order: '1471',
				totalOrder: 320,
				orderStatus: 'No pagado',
				wayPayment: 'Pago en tienda',
				wayDelivery: 'Recojo en tienda',
			},
			{
				date: '23/04/2019',
				order: '1471',
				totalOrder: 320,
				orderStatus: 'No pagado',
				wayPayment: 'Pago en tienda',
				wayDelivery: 'Envío a domicilio',
			},
		],
	};
}

export default {
	name: 'user-orders',
	components: {
		deleteComponent: () => import('@/components/shared/icons/delete-component'),
		detailsComponent: () => import('@/components/shared/icons/details-component'),
		profileTab: () => import('@/components/shared/tabs/profile-tab'),
		responsiveTable: () => import('@/components/shared/table/respondive-table'),
	},
	data,
	methods: {
		seeDetails,
	},
};
</script>
<style lang="scss" scoped>
	.web-tab {
		bottom: 100%;
		position: absolute;
		width: 100%;
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
