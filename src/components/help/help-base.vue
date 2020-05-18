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
import { mapGetters } from 'vuex';

function created() {
	this.loadHelpInformation();
}

function loadHelpInformation() {
	const { help, slug } = this.$route.params;
	if (this.getCommerceData && this.getCommerceData.helperCenter) {
		const { helperCenter } = this.getCommerceData;
		this.helpData = this.findCurrentHelpSection(helperCenter, help, slug);
	} else {
		this.$router.push({ name: 'not-found' });
	}
}

function findCurrentHelpSection(helper, section, subSection) {
	const sectionFormatted = this.formattedString(section);
	const subSectionFormatted = this.formattedString(subSection);
	const filteredHelpCenter = helper.filter(h => h.section[0].name === sectionFormatted);
	return this.constructingHelpObject(filteredHelpCenter, sectionFormatted, subSectionFormatted);
}

function constructingHelpObject(helpArray, sectionTitle, subSectionTitle) {
	return helpArray.reduce((acc, item) => {
		const obj = { ...acc };
		if (!obj.title) {
			obj.title = sectionTitle;
		}
		if (item.name === subSectionTitle) {
			obj.section = {
				title: item.name,
				subTitle: item.subTitle,
				content: item.description,
				image: item.urlImage,
			};
		} else {
			const help = sectionTitle.split(' ').join('-');
			const slug = item.name.split(' ').join('-');
			obj.subTitles.push({ title: item.name, route: `/ayuda/apartado/${help}/seccion/${slug}` });
		}
		return obj;
	}, { title: '', section: {}, subTitles: [] });
}

function formattedString(str) {
	return str.split('-').join(' ');
}

function routeHandler() {
	this.loadHelpInformation();
}

function data() {
	return {
		helpData: {
			title: '',
			section: {
				title: '',
				subTitle: '',
				content: '',
				image: '',
			},
			subTitles: [{ title: '', route: '' }],
		},
	};
}

export default {
	name: 'information',
	computed: {
		...mapGetters([
			'getCommerceData',
		]),
	},
	created,
	data,
	methods: {
		constructingHelpObject,
		findCurrentHelpSection,
		formattedString,
		loadHelpInformation,
		routeHandler,
	},
	watch: {
		'$route.fullPath': routeHandler,
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