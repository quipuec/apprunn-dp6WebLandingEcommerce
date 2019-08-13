<template>
	<div>
		<section>
			<h3 class="section-title">direcciones</h3>
		</section>
		<section>
			<new-address-form/>
		</section>
		<section class="table">
			<responsive-table
				class="address"
				:columns="columns"
				:rows="getAddress"
				:pages="totalPage"
				@page-changed="pageChange"
			>
				<template slot-scope="{ row }">
					<td class="address-name">{{row.name || '--'}}</td>
					<td class="address-department">{{getValue('province.name', row) || '--'}}</td>
					<td class="address-province">{{getValue('parish.name', row) || '--'}}</td>
					<td class="address-city">{{getValue('city.name', row) || '--'}}</td>
					<td class="address-location">{{row.addressLine1}}</td>
					<td class="address-actions">
						<div class="address-actions-wrapper">
							<star-component class="action-btn"/>
							<delete-component class="action-btn"/>
						</div>
					</td>
				</template>
			</responsive-table>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import lib from '@/shared/lib';

const newAddressForm = () => import('@/components/profile/new-address-form');

async function created() {
	this.totalPage = await this.$store.dispatch('LOAD_USER_ADDRESS',
		{ context: this, params: { page: this.currentPage, limit: this.limit } },
	);
}

function getValue(route, row) {
	return lib.getDeeper(route)(row);
}

function pageChange(page) {
	this.currentPage = page;
	this.$store.dispatch('LOAD_USER_ADDRESS',
		{ context: this, params: { page: this.currentPage, limit: this.limit } },
	);
}

function data() {
	return {
		columns: [
			{ value: 'alias', title: 'Alias', responsive: true },
			{ value: 'department', title: 'Departamento', responsive: true },
			{ value: 'province', title: 'Provincia', responsive: true },
			{ value: 'district', title: 'Distrito', responsive: true },
			{ value: 'address', title: 'Dirección', responsive: false },
			{ value: 'actions', title: 'Acción', responsive: false },
		],
		currentPage: 1,
		limit: 5,
		totalPage: 0,
	};
}

export default {
	name: 'address',
	components: {
		deleteComponent: () => import('@/components/shared/icons/delete-component'),
		newAddressForm,
		responsiveTable: () => import('@/components/shared/table/respondive-table'),
		starComponent: () => import('@/components/shared/icons/star-component'),
	},
	computed: {
		...mapGetters([
			'getAddress',
		]),
	},
	created,
	data,
	methods: {
		getValue,
		pageChange,
	},
};
</script>
<style lang="scss" scoped>
	.address {

		td {
			font-size: size(small);
			padding: 5px !important;
		}
	}

	.table {
		margin: 0 50px;
		
		@media (max-width: 680px) {
			margin: 0 10px;
		}

		td {
			padding: 10px 30px;

			@media (max-width: 600px) {
				font-size: size(small);
				padding: 10px;
			}
		}
	}

	.address-name {
		grid-column: 1;
		grid-row: 2;

		@media (max-width: 600px) {
			align-items: center;
			background-color: white;
			border-bottom: none;
			display: flex;
			height: 100%;
		}
	}

	.address-department {
		grid-column: 2;
		grid-row: 2;
		text-transform: lowercase;

		@media (max-width: 600px) {
			background-color: white;
			border-bottom: none;
			text-align: left;
		}
	}

	.address-province {
		grid-column: 3;
		grid-row: 2;
		text-transform: lowercase;

		@media (max-width: 600px) {
			background-color: white;
			border-bottom: none;
			text-align: left;
		}
	}

	.address-city {
		grid-column: 4;
		grid-row: 2;
		text-transform: lowercase;

		@media (max-width: 600px) {
			background-color: white;
			border-bottom: none;
			text-align: left;
		}
	}

	.address-actions {
		grid-column: 4/5;
		grid-row: 1;
		height: 65px;

		@media (max-width: 600px) {
			height: 45px;
		}
	}

	.address-location {
		grid-column: 1/4;
		grid-row: 1;

		@media (max-width: 600px) {
			font-family: font(demi);
			text-align: left;
		}
	}

	.address-actions-wrapper {
		align-items: baseline;
		display: flex;
	}

	.action-btn {
		margin: 0 10px;
	}

	.section-title {
		color: color(primary);
		font-family: font(bold);
		font-size: size(large);
		margin: 30px 0 40px 40px;
		text-transform: uppercase;

		@media (max-width: 500px) {
			margin-bottom: 20px;
		}
	}
</style>
