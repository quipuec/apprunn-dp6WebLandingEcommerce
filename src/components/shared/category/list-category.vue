<template>
	<div class="list-category">
		<div class="wrapper-name-category" :style="`border-color: ${globalColors.primary}`">
			<button class="mr-3">
				<img :src="data.webImage" :alt="data.title">
			</button>
			<button 
				class="title-category mr-5" 
				:style="data.selectFirst ? `color: ${globalColors.primary}` : `color: ${globalColors.dark}`">{{data.title}}</button>
			<button>abierto</button>
		</div>
		<div v-if="data.detail.length" class="wrapper-subcategory">
			<div v-for="subCategory in data.detail" :key="subCategory.id">
				<button 
					class="text-subcategory"
					:style="subCategory.selectSecond ? `color: ${globalColors.secondary}` : `color: ${globalColors.base}`">{{subCategory.title}}</button>
				<div v-if="subCategory.detail.length" class="wrapper-subsubcategory">
					<button 
						v-for="subSubCategory in subCategory.detail" 
						:key="subSubCategory.id"
						class="text-subsubcategory">{{subSubCategory.title}}</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'list-category',
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
<style lang="scss" scoped>
	.list-category {
		margin-bottom: 30px;

		.wrapper-name-category {
			border-bottom: 2px solid;
			display: flex;
			margin-bottom: 15px;
			padding-bottom: 3px;
		}

		.title-category {
			font-family: font(bold);
			font-size: size(xlarge);
		}

		.wrapper-subcategory {
			padding-left: 27px;
		}

		.text-subcategory {
			color: color(base);
			position: relative;

			&::before {
				content: '';
				background: color(black);
				border-radius: 50%;
				height: 5px;
				left: -12px;
				position: absolute;
				top: 7px;
				width: 5px;
			}
		}

		.text-subsubcategory {
			color: color(base);
		}
		
		.wrapper-subsubcategory {
			margin: 8px 0;
			padding-left: 20px;
		}
	}
</style>