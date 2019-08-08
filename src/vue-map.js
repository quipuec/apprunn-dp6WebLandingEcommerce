import * as VueGoogleMaps from 'vue2-google-maps';

export default function (Vue) {
	Vue.use(VueGoogleMaps, {
		load: {
			key: 'AIzaSyCCEGkrl5PbIReILlfyLvfI4k1pBF_zj1g',
			libraries: 'places', // This is required if you use the Autocomplete plugin
		},
		installComponents: true,
		// If you intend to programmatically custom event listener code
		// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
		// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
		// you might need to turn this on.
		// autobindAllEvents: false,
	});
}
