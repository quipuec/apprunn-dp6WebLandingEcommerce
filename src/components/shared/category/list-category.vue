<template>
	<div class="list-category">
		<div class="wrapper-name-category" :style="`border-color: ${globalColors.primary}`">
			<button 
				class="title-category mr-5" 
				:style="idSelect(data.id) ? `color: ${globalColors.primary}` : `color: ${globalColors.dark}`"
				@click="$emit('change-category', data.id)"	
			>
				<img :src="data.webImage" :alt="data.title" class="mr-3">
				{{data.title}}
			</button>
			<button @click="$emit('open-category', data.id)">
				<simple-svg
					filepath="/static/img/arrow-left.svg"
					:fill="globalColors.primary"
					width="11"
					class="icon"
					:class="{'rotate-icon': data.open}"
				/>
			</button>
		</div>
		<transition  name="slide">
			<div v-if="data.detail.length && (idSelect(data.id) || data.open)" class="wrapper-subcategory">
				<v-treeview
					:items="data.detail"
					item-children="detail"
					open-all
					item-text="title"
					expand-icon="fiber_manual_record"
					item-key="id"
					activatable
					@update:active="goToCategories"
					return-object
				>
					<template slot="label" slot-scope="{ item }">
						<button :style="idSelect(item.id) ? `color: ${globalColors.secondary}` : `color: ${globalColors.base}`">{{item.title}}</button>
					</template>
				</v-treeview>
			</div>
		</transition>
	</div>
</template>
<script>

function idSelect(id) {
	return this.breadcrumbs.find(b => b.id === id);
}

function goToCategories(item) {
	if (item.length) {
		const id = item[0].slug || item[0].id;
		this.$emit('change-category', id);
	}
}

export default {
	name: 'list-category',
	methods: {
		idSelect,
		goToCategories,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		breadcrumbs: {
			data: {
				type: Array,
				default: () => [],
			},
		},
	},
};
</script>
<style lang="scss" scoped>
	.list-category {
		margin-bottom: 30px;

		.wrapper-name-category {
			border-bottom: 2px solid;
			display: inline-flex;
			margin-bottom: 15px;
			padding-bottom: 3px;

			@media (max-width: 986px) {
				display: flex;
				justify-content: space-between;
				padding: 7px 25px;
			}
		}

		.title-category {
			align-items: center;
			display: flex;
			font-family: font(bold);
			font-size: size(xlarge);
		}

		.wrapper-subcategory {
			padding-left: 27px;

			@media (max-width: 986px) {
				padding-left: 0px;
			}
		}
		
		&:first-child {
			margin-top: 50px;

			@media (max-width: 986px) {
				margin-top: 30px;
			}
		}
		
		.icon {
			transform: rotateZ(270deg);

			&.rotate-icon {
				transform: rotateZ(450deg);
			}
		}
	}
</style>