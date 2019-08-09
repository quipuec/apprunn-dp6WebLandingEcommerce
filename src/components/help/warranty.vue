<template>
	<div>
		<p class="title-component">GARANTÍA</p>
		<p class="subtitle-component">TIEMPO DE GARANTÍA Y PERIODO DE VIGENCIA</p>
		<p class="description-component">Recuerda que la garantía cubre defectos de funcionamiento de la unidad completa por los períodos indicados, siendo cargo de Quetalcompra.com los repuestos y la mano de obra necesarios para la restitución del producto a su estado normal o cambio por otra unidad.</p>
		<p class="description-component">IMPORTANTE: para hacer uso de la garantía, el propietario del producto deberá preservar su boleta o factura</p>
		<p class="description-component">El periodo de vigencia de la garantía dependerá del tipo de producto:</p>
		<table class="table-warranty">
			<tr>
				<th class="title-table">PRODUCTO</th>
				<th class="title-table">TIEMPO DE GARANTÍA</th>
			</tr>
			<tr v-for="(item, index) in rows" :key="index">
				<td>{{item.name}}</td>
				<td>{{item.warranty}}</td>
			</tr>
		</table>
	</div>
</template>

<script>
function data() {
	return {
		rows: [
			{
				name: 'Celulares',
				warranty: '1 año',
			},
			{
				name: 'Audífonos con Cable',
				warranty: '15 días',
			},
			{
				name: 'Audífonos Bluetooth',
				warranty: '3 meses',
			},
			{
				name: 'Productos Xiaomi (No incluye celulares)',
				warranty: '6 meses',
			},
			{
				name: 'Memorias USB',
				warranty: '1 año',
			},
			{
				name: 'Tv Box',
				warranty: '6 meses',
			},
			{
				name: 'Mouse, Teclado, Mando, Parlante',
				warranty: '6 meses',
			},
			{
				name: 'Otros',
				warranty: '6 meses',
			},
		],
	};
}

export default {
	data,
	name: 'warranty',
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
}

table, td, th {
	border: 2px solid black;
	padding: 4px;
}

.title-component {
	color: color(primary);
	font-family: font(bold);
	font-size: 16px;
	@media (max-width: 950px) {
		color: #004e9c;
		font-size: 16px;
		margin-top: 32px;
	}
}

.subtitle-component {
	color: #4a4a4a;
	font-size: 14px;
	font-family: font(demi);
}

.description-component {
	font-size: 12px;
	font-family: font(regular);
}

.title-table {
	color: color(primary);
	font-size: 14px;
	text-align: left;
}

.table-warranty {
	margin-top: 35px;
	width: 60%;

	@media (max-width: 950px) {
		width: 100%;
	}
}
</style>
