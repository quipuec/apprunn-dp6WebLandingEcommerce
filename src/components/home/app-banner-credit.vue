

<template>
	<div
	class="app-banner-credit"
	:style="`background-image: url(${webImage})`"
	>
		<div class="section-banner">
			<div>
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
		</div>
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
	left: 155px;
	margin-left: 10px;
	position: relative;
	top: 81px;
	width: 165px;
}

.app-banner-credit {
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 283px;
	padding: 16px 26px;
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

.section-banner {
	align-items: center;
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 60px;
}

.link-credit {
	color: color(white);
	text-decoration: none;
}
</style>