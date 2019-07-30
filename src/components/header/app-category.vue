<template>
	<div class="app-category">
		<div class="app-category-user">
			<div class="container-user" :style="`border-color: ${colorBase}`">
				<img :src="imgUser.urlImage" :alt="imgUser.name" :height="imgUser.height">
			</div>
			<div class="container-link-user">
				<router-link 
					to="/"
					:style="`color: ${colorBase}`">Iniciar Sesión</router-link>
				<router-link 
					to="/"
					:style="`color: ${colorBase}`">Crear cuenta</router-link>
			</div>
		</div>
		<div class="menu-app-category">
			<div class="menu-list-name-category">
				<div 
					v-for="(list, index) in categories" 
					:key="index"
					class="name-category"
					:class="{'select': list.select}">
					<item-menu 
						:data="list" 
						color-select="#ed0000"
						@click-item="clickCategory"/>
				</div>
			</div>
			<div class="menu-list-item desktop" :class="isMoreTwo ? 'isMultiple' : 'isTwo'">
				<div 
					v-for="(item, index) in selectCategory.list" 
					:key="index"
					class="list-item">
					<span class="list-item-name" :class="{'bold': isBold}">{{item.name}}</span>
					<div v-if="item.list">
						<span 
							v-for="(itemList, indexItem) in item.list" 
							:key="indexItem"
							class="list-item-sub">{{itemList.name}}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const itemMenu = () => import('@/components/header/item-menu');

function created() {
	this.categories[0].select = true;
}

function clickCategory(item) {
	this.categories = this.categories.map((c) => {
		const newCategory = { ...c };
		newCategory.select = c.id === item.id;
		return newCategory;
	});
}

function selectCategory() {
	const index = this.categories.findIndex(c => c.select);
	return this.categories[index];
}

function isBold() {
	const flag = this.selectCategory.list.some(l => l.list);
	return flag;
}

function data() {
	return {
		categories: [
			{
				id: 1,
				name: 'Mallas',
				urlImage: '/static/img/category-mesh.svg',
				select: false,
				list: [
					{
						name: 'Tejidas Galvanizadas',
					},
					{
						name: 'Electrosoldadas',
					},
					{
						name: 'Malla Expanded Metal',
					},
					{
						name: 'Mallas para Filtros y Tamizado',
					},
					{
						name: 'Mallas de plancha perforada',
					},
				],
			},
			{
				id: 2,
				name: 'Resortes',
				urlImage: '/static/img/category-springs.svg',
				select: false,
				list: [
					{
						name: 'Automotriz',
						list: [
							{
								name: 'Minería ',
							},
							{
								name: 'Ferrocarriles y Vagones',
							},
							{
								name: 'Puerta de Garaje',
							},
							{
								name: 'Industria en General',
							},
						],
					},
					{
						name: '4x4',
						list: [
							{
								name: 'Sistema a Gas',
							},
							{
								name: 'Tuning',
							},
							{
								name: 'Competencia',
							},
						],
					},
					{
						name: '4x4',
					},
					{
						name: '4x4',
					},
				],
			},
			{
				id: 3,
				name: 'Cables',
				urlImage: '/static/img/category-cables.svg',
				select: false,
				list: [
					{
						name: 'Cables de alta ingeniería: BRIDON',
					},
					{
						name: 'Cables de Acero Convencionales',
					},
				],
			},
		],
	};
}

function isMoreTwo() {
	return this.selectCategory.list.length > 2;
}

export default {
	name: 'app-category',
	data,
	created,
	components: {
		itemMenu,
	},
	methods: {
		clickCategory,
	},
	computed: {
		selectCategory,
		isBold,
		isMoreTwo,
	},
	props: {
		imgUser: {
			type: Object,
			default: () => {},
		},
		colorBase: String,
	},
};
</script>
<style lang="scss" scoped>
	.app-category {
		background: color(white);
		border-top: solid 1px color(border);
		box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.07);
		max-height: 502px;
		min-height: 226px;

		@media (max-width: 764px) {
			height: 100vh;
			max-height: none;
			min-height: none;
			padding: 22px 8%;
			position: absolute;
			width: 85%;
		}
	}

	.menu-list-name-category {
		flex: 1 1 20%;
	}

	.menu-app-category {
		align-items: center;
		display: flex;
		padding: 33px 10%;

		@media (max-width: 764px) {
			padding: 0px;
		}
	}

	.name-category {
		align-items: center;
		cursor: pointer;
		display: flex;
		margin-bottom: 31px;
	}

	.menu-list-item {
		cursor: pointer;
		display: grid;
		flex: 1 1 80%;

		.list-item {
			border-right: 1px solid color(dark);
			padding: 10px 20%;
		}

		.list-item-name {
			color: color(base);

			&.bold {
				color: color(black);
				font-family: font(bold);
			}

			&:hover {
				color: color(black);
			}
		}

		.list-item-sub {
			color: color(base);
		}

		&.isMultiple {
			grid-template-columns: 33% 33% 33%;

			.list-item {
				&:nth-child(3n) {
					border-right: none;
				}
			}
		}

		&.isTwo {
			grid-template-columns: 50% 50%;
			
			.list-item {
				&:nth-child(2n) {
					border-right: none;
				}
			}
		}
	}

	.desktop {
		display: grid;

		@media (max-width: 764px) {
			display: none;
		}
	}

	.container-user {
		align-items: center;
		border: 1px solid;
		border-radius: 50%;
		display: flex;
		justify-content: center;
		height: 53px;
		margin: 0 auto;
		width: 53px;
	}

	.container-link-user {
		display: flex;
		justify-content: space-between;
	}
</style>


