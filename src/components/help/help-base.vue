<template>
	<div class="help-main-container">
		<div class="help-menu" :style="`border:1px solid ${globalColors.base}`">
			<h2
				:style="`border-bottom:1px solid ${globalColors.base};color:${globalColors.primary}`"
			>{{helpData.title}}</h2>
			<router-link
				class="sub-title"
				v-for="(sub, indexSub) in helpData.subTitles"
				:key="indexSub"
				:to="sub.route"
				:style="`color:${globalColors.title}`"
			>{{sub.title}}</router-link>
		</div>
		<div class="help-content" :style="`border:1px solid ${globalColors.base}`">
			<router-view
				:title="helpData.section.title"
				:sub-title="helpData.section.subTitle"
				:content="helpData.section.content"
				:image="helpData.section.image"
			></router-view>
		</div>
	</div>
</template>
<script>

function created() {
	this.loadHelpInformation();
}

function loadHelpInformation() {
	this.helpData = this.fake;
}

function data() {
	return {
		fake: {
			title: 'Información',
			section: {
				title: 'Términos y condiciones',
				subTitle: 'Términos',
				content: 'párrafos con contenido',
				imgage: '',
			},
			subTitles: [
				{ title: 'Términos y condiciones', route: '/terminos-y-condiciones' },
				{ title: 'Reclamo', route: '/reclamos' },
			],
		},
		helpData: {},
	};
}

export default {
	name: 'information',
	created,
	data,
	methods: {
		loadHelpInformation,
	},
};
</script>
<style lang="scss" scoped>
.help-main-container {
	display: grid;
	grid-column-gap: 10px;
	grid-template-columns: 250px 1fr;
	width: 100%;

	.help-menu {
		border-radius: 5px;
		display: flex;
		flex-direction: column;
		height: fit-content;
		padding: 21px;
		position: sticky;
		top: 140px;

		h2 {
			margin-bottom: 5px;
		}

		.sub-title {
			margin: 10px 0;
			text-decoration: none;
		}
	}

	.help-content {
		border-radius: 5px;
		padding: 35px 60px 60px;
	}
}
</style>