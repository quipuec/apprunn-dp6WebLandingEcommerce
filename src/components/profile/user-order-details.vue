<template>
	<div>
		<section class="nav">Titulo</section>
		<section class="header">header</section>
		<section class="table">
			<responsive-table
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
					<td class="product-quantity">{{row.quantity}}</td>
					<td class="product-sub">{{row.sub}}</td>
				</template>
			</responsive-table>
		</section>
	</div>
</template>
<script>
import responsiveTable from '@/components/shared/table/respondive-table';

function data() {
	return {
		columns: [
			{ value: 'product', title: 'Producto', responsive: false },
			{ value: 'unitPrice', title: 'Precio Und', responsive: true },
			{ value: 'quantity', title: 'Cantidad', responsive: true },
			{ value: 'sub', title: 'Precio Subtotal', responsive: true },
		],
		rows: [
			{
				product: {
					img: '/static/img/resorte.jpg',
					description: 'Descripcion',
					name: 'nombre',
				},
				unitPrice: 320,
				quantity: 2,
				sub: 640,
			},
			{
				product: {
					img: '/static/img/resorte.jpg',
					description: 'Descripcion',
					name: 'nombre',
				},
				unitPrice: 320,
				quantity: 2,
				sub: 640,
			},
		],
	};
}

export default {
	name: 'user-order-details',
	components: {
		responsiveTable,
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

	.table {
		margin: 0 50px;

		td {
			padding: 10px 30px;
		}
	}

	.product-name {
		font-family: font(bold);
		font-size: size(medium);
		grid-column: 1;
		grid-row: 1;

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
			background-color: color(background);
			font-size: size(small);
		}
	}

	.product-quantity {
		grid-column: 2;
		grid-row: 2;

		@media (max-width: 600px) {
			background-color: color(background);
			font-size: size(small);
		}
	}

	.product-sub {
		grid-column: 3;
		grid-row: 2;

		@media (max-width: 600px) {
			background-color: color(background);
			font-size: size(small);
		}
	}
</style>
