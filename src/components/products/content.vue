<template>
	<div class="wrapper-content">
		<div
			v-if="isHtml"
			class="content-description"
			v-html="description"
		></div>
		<div
			v-else
			class="content-description"
		>{{description}}</div>
		<div v-if="content.urlImages">
				<div v-for="(item, index) in content.urlImage" :key="index">
					<img 
						:src="item" 
						:alt="item"
						class="content-img"
					>
			</div>
		</div>
		<div v-else-if="content.urlImage">
			<img 
				:src="content.urlImage" 
				:alt="content.urlImage"
				class="content-img"
			>
		</div>
	</div>
</template>
<script>

function description() {
	const html = this.content.description.includes('</');
	this.isHtml = !!html;
	return this.content.description;
}

function data() {
	return {
		isHtml: false,
	};
}

export default {
	name: 'content-text',
	computed: {
		description,
	},
	data,
	props: {
		content: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
<style lang="scss" scoped>
	.wrapper-content {	
		.content-description {
			font-size: size(minmedium);
			margin-bottom: 29px;
		}

		.content-img {
			max-width: 100%;
		}
	}
</style>

