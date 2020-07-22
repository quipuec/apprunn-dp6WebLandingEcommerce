<template>
	<div class="help-main-container">
		<div class="help-menu" :style="`border:1px solid ${globalColors.base}`">
			<button
				class="title-btn-container"
				:style="`border-bottom:1px solid ${globalColors.base};color:${globalColors.primary}`"
				@click="show = !show"
			>
				<h2
					type="button"
					class="title-btn"
				>{{helpData.title}}</h2>
				<div
					:class="[show ? 'up' : 'down']"
				>^</div>
			</button>
			<div class="help-menu-routes" v-show="show">
				<router-link
					class="sub-title"
					v-for="(sub, indexSub) in helpData.subTitles"
					:key="indexSub"
					:to="sub.route"
					:style="`color:${globalColors.title}`"
				>{{sub.title}}</router-link>
			</div>
		</div>
		<div class="help-content" :style="`border:1px solid ${globalColors.base}`">
			<router-view
				:is-html="isHtml"
				:title="title"
				:sub-title="subtitle"
				:content="content"
				:image="image"
			></router-view>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function mounted() {
	setTimeout(() => {
		this.loadHelpInformation();
	}, 200);
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
	const filteredHelpCenter = helper.filter(
		h => h.section[0].name.trim() === sectionFormatted.trim(),
	);
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
		}
		const help = sectionTitle.split(' ').join('-');
		const slug = item.name.split(' ').join('-');
		obj.subTitles.push({ title: item.name, route: `/ayuda/apartado/${help}/seccion/${slug}` });
		return obj;
	}, { title: '', section: {}, subTitles: [] });
}

function formattedString(str) {
	return str.split('-').join(' ');
}

function routeHandler() {
	this.loadHelpInformation();
}

function title() {
	return this.helpData.section.title || '';
}

function subtitle() {
	return this.helpData.section.subTitle || '';
}

function content() {
	debugger;
	const html = this.helpData.section.content.includes('</');
	this.isHtml = !!html;
	return this.helpData.section.content;
	// return this.helpData.section.content || '';
}

function image() {
	return this.helpData.section.image || '';
}

function data() {
	return {
		isHtml: false,
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
		open: false,
		show: true,
	};
}

export default {
	name: 'help-base',
	computed: {
		...mapGetters([
			'getCommerceData',
		]),
		content,
		image,
		subtitle,
		title,
	},
	data,
	methods: {
		constructingHelpObject,
		findCurrentHelpSection,
		formattedString,
		loadHelpInformation,
		routeHandler,
	},
	mounted,
	watch: {
		'$route.fullPath': routeHandler,
	},
};
</script>
<style lang="scss" scoped>
.help-main-container {
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	margin: auto;
	max-width: 1090px;
	width: 100%;

	@media(min-width: 768px) {
		flex-direction: row;
		justify-content: center;
	}

	.help-menu {
		background-color: white;
		border-radius: 5px;
		display: flex;
		flex: 0 0 30%;
		flex-direction: column;
		height: fit-content;
		margin: 0 0 20px 0;
		padding: 21px;
		position: sticky;
		top: 80px;

		@media(min-width: 768px) {
			margin-right: 20px;
			top: 140px;
		}

		.title-btn-container {
			align-items: center;
			display: flex;
			justify-content: space-between;

			.title-btn {
				font-family: font(bold);
				font-size: size(large);
				margin-bottom: 5px;
				text-align: left;
			}

			.up, .down {
				align-items: center;
				display: flex;
				margin-right: 10px;
				transform: rotate(0deg);
				transition: transform 250ms ease;
				transform-origin: center 7px;

				@media (min-width: 768px) {
					display: none;
				}
			}

			.down {
				transform: rotate(180deg);
			}
		}


		.help-menu-routes {
			display: flex;
			flex-direction: column;
		}

		.sub-title {
			margin: 10px 0;
			text-decoration: none;

			&.router-link-exact-active {
				text-decoration: underline;
			}
		}
	}

	.help-content {
		border-radius: 5px;
		padding: 35px 20px 60px;
		width: auto;

		@media(min-width: 768px) {
			padding: 35px 60px 60px;
			width: 800px;
		}
	}
}
</style>