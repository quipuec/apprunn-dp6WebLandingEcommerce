<template>
	<div
		class="conversions-container"
	>
		<h3
			:class="[
				indeterminate ? 'loading' : 'conversions-title',
			]"
			:style="`color:${globalColors.base}`"
		>Presentaciones:</h3>
		<v-flex xs12>
			<v-btn
			v-for="(item, index) in conversionsComputed"
			:key="index"
			:style="btnStyleConversions"
			type="button">
			{{ item.name }}
			</v-btn>
		</v-flex>
		<div
			:class="{ 'loading conversions-select-container': indeterminate }"
		>
			<AppSelect
				v-show="!indeterminate"
				return-object
				class="conversions-select"
				placeholder="presentaciones..."
				item-text="name"
				:items="conversionsComputed"
				:value="defaultUnit"
				@input="$emit('unit-selection', $event)"
			/>
		</div>
	</div>
</template>
<script>
import AppSelect from '@/components/shared/inputs/app-select';
import { mapGetters } from 'vuex';
import l from '@/shared/lib';

function conversionsComputed() {
	const conversionsFormatted = l.map(
		k => l.setNewProperty('id', Number(k))(this.conversions[k]),
		Object.keys(this.conversions),
	);
	return [].concat(this.defaultUnit, conversionsFormatted);
}

function btnStyleConversions() {
	const itemSelected = this.globalColors.primary;
	const notAllowedColor = this.globalColors.base;
	const bg = `background-color:${this.isSelected ? itemSelected : 'white'}`;
	const border = `border:${this.isSelected ? 'red' : notAllowedColor}`;
	return `${bg};${border}`;
}

export default {
	name: 'product-conversions',
	components: {
		AppSelect,
	},
	computed: {
		...mapGetters([
			'indeterminate',
		]),
		conversionsComputed,
		btnStyleConversions,
	},
	props: {
		conversions: {
			default: () => {},
			type: Object,
		},
		defaultUnit: {
			default: () => {},
			type: Object,
		},
	},
};
</script>
<style lang="scss" scoped>
	.conversions-container {
		align-items: center;
		border-bottom: 1px solid color(border);
		border-top: 1px solid color(border);
		display: flex;
		justify-content: flex-start;
		margin-top: 10px;
		padding: 20px 0;
	}

	.conversions-title {
		margin-right: 10px;
	}

	.conversions-select-container {
		height: 24px;
		margin-left: 10px;
		width: 100%;
	}
</style>