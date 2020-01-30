

<template>
	<div
	class="app-banner-credit"
	:style="`background-image: url(${webImage})`"
	>
			<button class="btn-submit"
			:style="`background-color: ${globalColors.primary}`">
				<a
				v-if="webLink"
				:href="webLink"
				target="_blank"
				class="link-credit">
					SOLICITA AQUÍ
				</a>		
			</button>
	</div>
</template>

<script>
import lib from '@/shared/lib';
import { mapGetters } from 'vuex';

function webImage() {
	return lib.getDeeper('webImage')(this.data);
}

function webLink() {
	return lib.getDeeper('webLink')(this.data);
}

export default {
	name: 'app-banner-credit',
	computed: {
		webImage,
		webLink,
		...mapGetters([
			'getCreditBanner',
		]),
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>

<style lang="scss" scoped>
.btn-submit {
	color: color(white);
	border-radius: 7px;
	font-family: font(bold);
	font-size: size(large);
	height: 47px;
	left: 790px;
	margin-left: 10px;
	position: relative;
	top: 170px;
	width: 165px;
}

.app-banner-credit {
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 310px;
	width: 100%;

	@media (max-width: 764px) {
		height: 310px;
	}
}

.big {
	height: 283px;

	@media (max-width: 764px) {
		height: 295px;
	}
}

.title-banner {
	color: color(white);
	font-family: font(bold);
	font-size: 55px;
}

.description-banner {
	color: color(white);
	font-family: font(bold);
	font-size: size(sbig);
}

.link-credit {
	color: color(white);
	text-decoration: none;
}

.link-credit {
	bottom: 0;
	display: block;
	height: 47px;
	left: 0;
	position: absolute;
	top: 13px;
	right: 0;
	width: 165px;
}
</style>