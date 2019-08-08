<template>
	<div class="wrapper-content">
		<div class="content-description" v-if="content.description">{{content.description}}</div>
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
export default {
	name: 'content',
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
			// color: color(text-grey-medium);
			font-size: size(minmedium);
			margin-bottom: 29px;
		}

		.content-img {
			max-width: 100%;
		}
	}
</style>

