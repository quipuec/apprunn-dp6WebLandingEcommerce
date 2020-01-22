<template>
  <div class="product-tab">
		<v-tabs 
			v-model="active" 
			slider-color="transparent"
			show-arrows
			color="#f1f1f1"
		>
			<v-tab
				v-for="(tab, index) in tabs"
				:key="index"
				ripple
			>
				<div 
					:style="active === index ? `background-color: ${globalColors.primary}; color: white` : null"
					class="text-tab">{{ tab }}</div>
			</v-tab>
			<v-tab-item v-for="(section, index) in sections" :key="index">
        <content-text
					:content="subSection"
					v-for="subSection in section.subSections"
					:key="subSection.id"
				/>
      </v-tab-item>
			<v-tab-item v-if="active === lastIndex">
        <product-opinion :opinions="opinions" @update-opinion="$emit('update-opinion')"/>
      </v-tab-item>
		</v-tabs>
	</div>
</template>
<script>
import contentText from '@/components/products/content';
import productOpinion from '@/components/products/product-opinion';

function data() {
	return {
		active: null,
	};
}

export default {
	name: 'product-tab',
	data,
	components: {
		contentText,
		productOpinion,
	},
	props: {
		tabs: {
			type: Array,
			default: () => [],
		},
		sections: {
			type: Array,
			default: () => [],
		},
		lastIndex: Number,
		opinions: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
<style lang="scss" scoped>
	.text-tab {
		align-items: center;
		border-radius: 5px;
		display: flex;
		font-family: font(bold);
		font-size: size(medium);
		height: 100%;
		justify-content: center;
		padding: 0 10px;
		width: 100%;

		@media screen and (max-width: 996px) {
			font-size: 9px;
		}
	}

	.product-tab {
		@media screen and (max-width: 996px) {
			padding: 0 13px;
		}
	}
</style>


