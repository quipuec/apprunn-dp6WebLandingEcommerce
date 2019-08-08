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
				@click="seeThisHelp(item)"
				type="button" 
				class="item-tabs"
				v-for="(item, indexItem) in help.items" :key="indexItem"
				:class="[
				{ 'active-help': currentHelp === item }
				]">
					{{item}}
					</button>
				</div>
			</div>
		</div>	
		<div class="content-components">
			<warranty></warranty>
			<component
				class="content-help"
				:is="currentHelpComponent"
			></component>
		</div>
	</div>
</template>

<script>
const warranty = () => import('@/components/help/warranty');

function created() {
	this.seeThisHelp(this.$route.params.helpSection);
}

function seeThisHelp(help) {
	const opts = {
		Garantía: warranty,
	};
	this.currentHelp = help;
	this.currentHelpComponent = opts[help];
	this.open = true;
}


function data() {
	return {
		currentHelpComponent: warranty,
		currentHelp: '',
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
		open: false,
	};
}

export default {
	created,
	data,
	name: 'tabs-help',
	components: {
		warranty,
	},
	methods: {
		seeThisHelp,
	},
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
	font-size: size(large);
	padding-bottom: 7px;
}

.title-tabs {
	border-bottom: 2px solid color(disabled);
	color: color(dark);
	font-family: font(bold);
	font-size: font(medium);
	margin-top: 22px;
	padding-bottom: 6px;
}

.item-tabs {
	color: color(base);
	font-family: font(heavy);
	font-size: size(small);
	padding: 8px 0;
	text-align: left;
	width: 294px;

	&:active {
		color: #f42b17;
		font-size: 12px;
		font-family: font(bold);
	}
}
.content-components {
	padding-left: 77px;
	width: 75%;
}

.content-help {
	width: 25%;
}

.w-100 {
	width: 100%;
}

.content-help {
	max-width: 700px;
}
</style>
