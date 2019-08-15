<template>
	<div>
		<v-dialog 
			v-model="dialogModal"  
			max-width="766px"
			@input="closeModal">
			<v-card>
				<v-card-title>
					<p 
						class="title-modal"
						:style="`background: ${globalColors.primary}`"><span class="bold">Disponibilidad</span> en tiendas</p> 
				</v-card-title>
				<v-card-text>
					<responsive-table
						:columns="columns"
						:rows="rows"
						auto
					>
						<template slot-scope="{ row }">
							<td class="td-auto">
								<div>{{row.warehouse.name}}</div>
								<div>{{row.warehouse.address}}</div>
							</td>
							<td class="td-auto">{{row.stock}}</td>
							<td class="td-auto">
								<div class="icon-map">
									<img src="/static/img/map.svg" alt="mapa">
								</div>
							</td>
						</template>
					</responsive-table>
				</v-card-text>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>
const responsiveTable = () => import('@/components/shared/table/respondive-table');

function warehouseLatLon(row) {
	const { warehouse: { location } } = row;
	const { x, y } = location || {};
	return (!!x && !!y);
}

function closeModal(value) {
	this.$emit('change-modal', value);
}

function dialog(value) {
	this.dialogModal = value;
}

function data() {
	return {
		columns: [
			{ value: 'warehouse', title: 'Tienda', responsive: true },
			{ value: 'stock', title: 'Stock', responsive: true },
			{ value: 'map', title: 'Mapa', responsive: true },
		],
		dialogModal: false,
	};
}
export default {
	name: 'warehouses-modal',
	components: {
		responsiveTable,
	},
	data,
	methods: {
		closeModal,
		warehouseLatLon,
	},
	props: {
		dialog: {
			default: false,
			type: Boolean,
		},
		rows: {
			default: () => [],
			type: Array,
		},
	},
	watch: {
		dialog,
	},
};
</script>
<style lang="scss" scoped>
	.icon-map {
		cursor: pointer;
		padding: 10px 0;
	}

	.title-modal {
		border-radius: 5px;
		color: color(white);
		font-size: 15px;
		height: 46px;
		padding: 13px;
		text-align: center;
		width: 100%;

		.bold {
			font-family: font(bold);
		}
	}

	.td-auto {
		border-bottom: none !important;
		height: auto !important;
	}
</style>