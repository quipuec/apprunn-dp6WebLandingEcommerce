<template>
	<button type="button" @click="clicked" class="button-container">
		<svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18">
			<g
				fill-rule="nonzero"
				:class="[white ? 'white' : 'default']"
			>
				<path d="M20.714 2.155H17.69L16.527.21A.427.427 0 0 0 16.16 0H5.84c-.15 0-.289.08-.367.21L4.31 2.155H1.286C.577 2.155 0 2.745 0 3.47V15.46c0 .726.577 1.316 1.286 1.316h5.532a.414.414 0 0 0 .048-.003A7.567 7.567 0 0 0 11 18a7.568 7.568 0 0 0 4.13-1.224h5.584c.709 0 1.286-.59 1.286-1.316V3.471c0-.726-.577-1.316-1.286-1.316zM6.08.879h9.84l.763 1.276H5.317L6.08.879zM1.286 15.897a.432.432 0 0 1-.427-.437V3.47c0-.24.192-.437.427-.437h6.171C4.966 4.352 3.26 7.014 3.26 10.077c0 2.298.96 4.371 2.493 5.82H1.286zm19.855-.437a.432.432 0 0 1-.427.437h-4.466a7.988 7.988 0 0 0 2.493-5.82 8.008 8.008 0 0 0-.734-3.371.425.425 0 0 0-.572-.21.444.444 0 0 0-.205.584 7.12 7.12 0 0 1 .652 2.997c0 3.884-3.087 7.043-6.882 7.043-3.795 0-6.882-3.16-6.882-7.043S7.205 3.034 11 3.034a6.75 6.75 0 0 1 3.724 1.12l.055.036c.2.13.466.069.593-.136a.446.446 0 0 0-.133-.607l-.051-.033-.108-.07a7.633 7.633 0 0 0-.532-.31h6.166c.235 0 .427.196.427.437V15.46z"/>
				<path d="M11.5 16A5.506 5.506 0 0 1 6 10.5C6 7.467 8.467 5 11.5 5S17 7.467 17 10.5 14.533 16 11.5 16zm0-10.124A4.63 4.63 0 0 0 6.876 10.5a4.63 4.63 0 0 0 4.624 4.624 4.63 4.63 0 0 0 4.624-4.624A4.63 4.63 0 0 0 11.5 5.876zM16.5 6c-.21 0-.4-.135-.47-.332a.504.504 0 0 1 .146-.55.505.505 0 0 1 .588-.044c.175.11.267.321.227.523A.505.505 0 0 1 16.5 6z"/>
			</g>
		</svg>
		<span :style="`color:${globalColors.title}`">Cambiar Imagen</span>
	</button>
</template>
<script>
function clicked() {
	this.$emit('click');
}
export default {
	name: 'camera-component',
	methods: {
		clicked,
	},
	props: {
		white: {
			default: false,
			type: Boolean,
		},
	},
};
</script>
<style lang="scss" scoped>
	.button-container {
		align-items: center;
		display: flex;
		justify-content: center;

		svg {
			margin-right: 10px;
		}
	}

	.white {
		fill: white;
	}

	.default {
		fill: color(dark);
	}
</style>
