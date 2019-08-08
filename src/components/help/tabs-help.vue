<template>
  <div class="tabs-help">
		<div class="content-help">
			<div class="w-100">
				<div class="title-help">CENTRO DE AYUDA</div>
				<div v-for="(help, index) in helps" :key="index">
				<p class="title-tabs">
					{{help.title}}
				</p>
				<button 
				type="button" 
				class="item-tabs"
				v-for="(item, indexItem) in help.items" :key="indexItem">
					{{item}}
					</button>
				</div>
			</div>
		</div>	
		<div class="content-components">
			componente
		</div>
	</div>
</template>

<script>

function data() {
	return {
		helps: [
			{
				title: 'INFORMACIÓN',
				items: [
					'Ubicación y Horario de Trabajo',
					'Sobre Nosotros',
					'Término y Condiciones',
					'Politicas de Privacidad y Confidencialidad',
					'No encuentro lo que quiero',
					'Buscamos Proveedores',
				],
			},
			{
				title: 'PAGO Y ENVÍO',
				items: [
					'Forma de Pago',
					'Forma de Entrega',
					'Tiempo de Envio',
				],
			},
			{
				title: 'POLÍTICAS DE LA EMPRESA',
				items: [
					'Política de garantía',
					'Políticas de privacidad',
					'Política de devolución o cambio',
					'Garantía',
				],
			},
			{
				title: 'SERVICIO AL CLIENTE',
				items: [
					'Contáctenos',
					'¿Cómo ganar y usar tus Puntos?',
					'¿Cómo comprar?',
					'Preguntas Frecuentes',
					'Seguir su pedido',
					'Reclamos',
				],
			},
		],
	};
}

export default {
	data,
	name: 'tabs-help',
};
</script>

<style lang="scss" scoped>
.tabs-help {
	display: flex;
	justify-content: space-between;
	padding: 20px;
}

.title-help {
	border-bottom: 5px solid color(secondary);
	color: color(secondary);
	font-family: font(bold);
	font-size: 16px;
	padding-bottom: 7px;
}

.title-tabs {
	border-bottom: 2px solid #e5e5e5;
	color: color(dark);
	font-family: font(bold);
	font-size: font(medium);
	margin-top: 22px;
	padding-bottom: 6px;
}

.item-tabs {
	color: #acaaaa;
	font-size: 12px;
	padding: 8px 0;
	font-family: font(heavy);
}
.content-components {
	width: 70%;
	padding-left: 77px;
}

.content-help {
	width: 30%;
}

.w-100 {
	width: 100%;
}
</style>
