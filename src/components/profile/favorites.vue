<template>
	<div>
		<section>
			<h3
				:style="`color: ${globalColors.primary};`"
				class="section-title">Mis favoritos</h3>
		</section>
		<section class="table">
			<responsive-table
				align-left
				:columns="columns"
				:rows="rows"
				:pages="50"
			>
				<template slot-scope="{ row }">
					<td class="row-product">
						<div class="product-info-container">
							<img :src="row.product.img" alt="imagen del producto" class="product-img"/>
							<div class="text-xs-left">
								<h4 class="product-name">{{row.product.name}}</h4>
								<span class="product-description">{{row.product.description}}</span>
							</div>
						</div>
					</td>
					<td class="product-unit-price">{{row.unitPrice}}</td>
					<td class="product-date">{{row.createdAt}}</td>
					<td class="product-actions">
						<div class="product-actions-wrapper">
							<car-component class="action-btn"/>
							<delete-component class="action-btn"/>
						</div>
					</td>
				</template>
			</responsive-table>
		</section>
	</div>
</template>
<script>

function data() {
	return {
		columns: [
			{ value: 'product', title: 'Producto', responsive: false },
			{ value: 'unitPrice', title: 'Precio Und', responsive: true },
			{ value: 'createdAt', title: 'Fecha de Creación', responsive: true },
			{ value: 'actions', title: 'Acción', responsive: true },
		],
		rows: [
			{
				product: {
					img: '/static/img/resorte.jpg',
					description: 'Descripcion',
					name: 'nombre',
				},
				unitPrice: 320,
				createdAt: '29/07/2019',
			},
			{
				product: {
					img: '/static/img/resorte.jpg',
					description: 'Descripcion',
					name: 'nombre',
				},
				unitPrice: 320,
				createdAt: '29/07/2019',
			},
		],
	};
}

export default {
	name: 'favorites',
	components: {
		carComponent: () => import('@/components/shared/icons/car-component'),
		deleteComponent: () => import('@/components/shared/icons/delete-component'),
		responsiveTable: () => import('@/components/shared/table/respondive-table'),
	},
	data,
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
			padding: 10px 30px;

			@media (max-width: 600px) {
				padding: 10px 20px;
			}
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

	.product-unit-price {
		grid-column: 1;
		grid-row: 2;

		@media (max-width: 600px) {
			font-size: size(small);
		}
	}

	.product-date {
		grid-column: 2/4;
		grid-row: 2;

		@media (max-width: 600px) {
			font-size: size(small);
			text-align: left;
		}
	}

	.product-actions {
		grid-column: 3;
		grid-row: 1;
		height: 65px;

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
