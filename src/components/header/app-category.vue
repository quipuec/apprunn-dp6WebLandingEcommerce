<template>
	<div class="app-category">
		<div class="app-category-user">
			<div class="container-user" :style="`border-color: ${colorBase}`">
				<img :src="imgUser.urlImage" :alt="imgUser.name" :height="imgUser.height">
			</div>
			<div class="container-link-user" :style="`border-color: ${colorBorder}`">
				<router-link 
					to="/"
					:style="`color: ${colorBase}`"
					class="link">Iniciar Sesión</router-link>
				<router-link 
					to="/"
					:style="`color: ${colorBase}`"
					class="link">Crear cuenta</router-link>
			</div>
		</div>
		<div class="menu-app-category">
			<div class="menu-list-name-category">
				<div 
					v-for="(list, index) in categories" 
					:key="index"
					class="name-category"
					:class="{'select': list.select}">
					<div class="list-name-category">
						<item-menu 
						:data="list" 
						color-select="#ed0000"
						@click-item="clickCategory"/>
						<button class="btn-collapse" @click="clickCategory(list)">
							<simple-svg
								:filepath="imageArrow.urlImage"
								:fill="colorBorder"
								width="11"
								class="icon"
								:class="{'rotate-icon': list.select}"
							/>
						</button>
					</div>
					<div v-if="list.list && list.select" class="menu-mobile">
						<div v-for="(listTwo, indexTwo) in list.list" :key="indexTwo" class="content-list-subcategory">
							<div class="list-name-category list-subcategory">
								<span class="list-item-name bold">{{listTwo.name}}</span>
								<button @click="clickSubCategory(listTwo,index)">
									<simple-svg
										v-if="listTwo.list"
										:filepath="imageArrow.urlImage"
										:fill="colorBorder"
										width="11"
										class="icon"
										:class="{'rotate-icon': listTwo.select}"
									/>
								</button>
							</div>
							<div v-if="listTwo.list && listTwo.select" class="content-sub-subcategory">
								<span 
									v-for="(listThree, indexThree) in listTwo.list" 
									:key="indexThree"
									class="list-item-sub list-subcategory">{{listThree.name}}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="menu-list-item desktop" :class="isMoreTwo ? 'isMultiple' : 'isTwo'" v-if="selectCategory">
				<div 
					v-for="(item, index) in selectCategory.list" 
					:key="index"
					class="list-item">
					<span class="list-item-name bold">{{item.name}}</span>
					<div v-if="item.list">
						<span 
							v-for="(itemList, indexItem) in item.list" 
							:key="indexItem"
							class="list-item-sub">{{itemList.name}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="container-option">
			<div class="option-user"></div>
			<div class="option-close"></div>
		</div>
	</div>
</template>
<script>
const itemMenu = () => import('@/components/header/item-menu');

function created() {
	window.addEventListener('resize', this.oneSelectCategory);
	this.oneSelectCategory();
}

function clickCategory(item) {
	const windowWidth = window.innerWidth;
	this.categories = this.categories.map((c) => {
		const newCategory = { ...c };
		if (c.id === item.id) {
			newCategory.select = windowWidth >= 764 ? true : !c.select;
		} else {
			newCategory.select = false;
			newCategory.list = c.list.map((l) => {
				const newSub = { ...l };
				newSub.select = false;
				return newSub;
			});
		}
		return newCategory;
	});
}

function selectCategory() {
	const index = this.categories.findIndex(c => c.select);
	return this.categories[index];
}

function isMoreTwo() {
	return this.selectCategory ? this.selectCategory.list.length > 2 : false;
}

function oneSelectCategory() {
	const windowWidth = window.innerWidth;
	if (windowWidth >= 764) {
		this.categories[0].select = true;
	}
}

function destroyed() {
	window.removeEventListener('resize', this.oneSelectCategory);
}

function clickSubCategory(item, index) {
	if (this.categories[index].list) {
		this.categories[index].list = this.categories[index].list.map((c) => {
			const newSubCategory = { ...c };
			if (item.id === c.id) {
				newSubCategory.select = !c.select;
			} else {
				newSubCategory.select = false;
			}
			return newSubCategory;
		});
	}
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
						id: 11,
						name: 'Tejidas Galvanizadas',
					},
					{
						id: 12,
						name: 'Electrosoldadas',
					},
					{
						id: 13,
						name: 'Malla Expanded Metal',
					},
					{
						id: 14,
						name: 'Mallas para Filtros y Tamizado',
					},
					{
						id: 15,
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
						id: 21,
						name: 'Automotriz',
						select: false,
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
						id: 22,
						name: '4x4',
						select: false,
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
						id: 23,
						name: '4x4',
					},
					{
						id: 24,
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
						id: 31,
						name: 'Cables de alta ingeniería: BRIDON',
					},
					{
						id: 32,
						name: 'Cables de Acero Convencionales',
					},
				],
			},
		],
		imageArrow: {
			urlImage: '/static/img/arrow-down.svg',
			name: 'Desplegar',
		},
	};
}

export default {
	name: 'app-category',
	data,
	created,
	components: {
		itemMenu,
	},
	destroyed,
	methods: {
		clickCategory,
		oneSelectCategory,
		clickSubCategory,
	},
	computed: {
		selectCategory,
		isMoreTwo,
	},
	props: {
		imgUser: {
			type: Object,
			default: () => {},
		},
		colorBase: String,
		colorBorder: String,
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
		overflow-y: scroll;
		z-index: 5;

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

		@media (max-width: 764px) {
			height: calc(100vh - 240px);
			overflow-y: scroll;
		}
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
		cursor: pointer;
		margin-bottom: 31px;
	}

	.menu-list-item {
		cursor: pointer;
		display: grid;
		flex: 1 1 80%;

		.list-item {
			border-right: 1px solid color(dark);
			padding: 10px 10%;
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
		height: 53px;
		justify-content: center;
		margin: 0 auto;
		width: 53px;
	}

	.container-link-user {
		border-bottom: 1px solid;
		display: flex;
		justify-content: space-between;
		margin-bottom: 33px;
		padding-bottom: 10px;

		

		.link {
			font-family: font(demi);
			font-size: size(small);
			text-decoration: none;
		}
	}

	.app-category-user, .btn-collapse, .menu-mobile {
		display: none;

		@media (max-width: 764px) {
			display: block;
		}
	}

	.list-name-category {
		display: flex;
		justify-content: space-between;
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

		@media (max-width: 764px) {
			font-size: size(small);
		}
	}

	.list-item-sub {
		color: color(base);

		@media (max-width: 764px) {
			font-size: size(small);
		}
	}

	.menu-mobile {
		margin: 8px 16px 0 42px;
	}

	.icon {
		transform: rotateZ(0deg);

		&.rotate-icon {
			transform: rotateZ(180deg);
		}
	}

	.list-subcategory {
		border-bottom: 1px solid map-get($colors, border);
		padding: 3px 0; 
	}

	.content-sub-subcategory {
		display: flex;
		flex-direction: column;

		.list-subcategory {
			&:last-child {
				border-bottom: none;
			}
		}
	}

	.menu-mobile {
		.content-list-subcategory {
			&:last-child {
				.list-subcategory {
				border-bottom: none;
				}
			}
		}
	}

	.container-option {
		display: none;
		height: 100px;

		@media (max-width: 764px) {
			display: block;
			font-size: size(small);
		}
	}

	.option-user {
		border-bottom: 1px solid map-get($colors, border);
		height: 50px;
	}
</style>


