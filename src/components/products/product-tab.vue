<template>
  <div class="product-tab">
		<v-tabs v-model="active">
			<v-tab
				v-for="(tab, index) in tabs"
				:key="index"
				ripple
			>
				{{ tab }}
			</v-tab>
			<v-tab-item v-for="(section, index) in sections" :key="index">
        <content-text
					:content="subSection"
					v-for="subSection in section.subSections"
					:key="subSection.id"
				/>
      </v-tab-item>
			<v-tab-item>
        <p>cococco</p>
      </v-tab-item>
		</v-tabs>
	</div>
</template>
<script>
const contentText = () => import('@/components/products/content');

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
	},
};
</script>

