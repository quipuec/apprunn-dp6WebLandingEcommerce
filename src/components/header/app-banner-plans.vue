<template>
<div
v-if="webImage || mobileImage"
class="app-banner-plans"
:class="[big ? 'big' : null, small ? 'small' : null]">
	<div
	:class="[
	'banner-plans-height',
	big ? 'big' : null, small ? 'small' : null,
	]">
		<picture>
			<source :srcset="webImage" media="(min-width: 600px)">
			<img :src="mobileImage">
		</picture>
	</div>
</div>
</template>

<script>
import lib from '@/shared/lib';

function webImage() {
	return lib.getDeeper('webImage')(this.data);
}

function mobileImage() {
	return lib.getDeeper('mobileImage')(this.data);
}

export default {
	name: 'app-banner-plans',
	computed: {
		webImage,
		mobileImage,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		big: {
			type: Boolean,
			default: false,
		},
		small: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.app-banner-plans {
	background-color: color(white);
	height: 389px;
}

.big {
	height: 380px;

	@media (max-width: 764px) {
		height: 420px;
	}
}

.banner-plans-height {
	height: 100%;
}
</style>