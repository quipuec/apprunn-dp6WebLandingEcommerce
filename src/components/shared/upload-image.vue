<template>
	<div class="upload-container">
		<input
			hidden
			type="file"
			class="upload-input"
			ref="upload"
			accept=".png,.jpg,.jpeg"
			@input="loadImage"
		>
		<app-input
			v-if="!noInput"
			readonly
			placeholder="Constancia de pago"
			class="voucher"
			:value="value"
			@input="sendValue"
		/>
		<div
			class="camera-container"
			:style="transparent ? 'background-color: transparent' : `background-color:${globalColors.primary}`"
		>
			<CameraSvg
				:white="!transparent"
				@click="upload"
			/>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	import CameraSvg from '@/components/shared/icons/camera-component';
	import appInput from '@/components/shared/inputs/app-input';

	function upload() {
		this.$refs.upload.click();
	}

	async function loadImage({ target }) {
		const reader = new FileReader();
		const file = target.files[0];
		reader.onload = (event) => {
			const fileData = {
				name: file.name.replace(/\s/g, '-'),
				base64data: event.target.result,
			};
			const headers = {
				Authorization: `Bearer ${this.token}`,
			};
			this.$httpUpLoad.post('upload-files', fileData, { headers })
				.then((response) => {
					this.cb(response.data.Location);
				})
				.catch(() => {
					this.showNotification(
						'No es posible cargar ese archivo',
						'error',
					);
				});
		};
		reader.readAsDataURL(file);
	}

	function cb(urlImage) {
		this.urlImage = urlImage;
		this.$emit('url-image', urlImage);
	}

	function sendValue(event) {
		this.$emit('input', event.target.value);
	}

	export default {
		name: 'upload-image',
		components: {
			appInput,
			CameraSvg,
		},
		computed: {
			...mapGetters([
				'token',
			]),
		},
		methods: {
			cb,
			loadImage,
			sendValue,
			upload,
		},
		props: {
			noInput: {
				default: false,
				type: Boolean,
			},
			transparent: {
				default: false,
				type: Boolean,
			},
			value: null,
		},
	};
</script>

<style lang="scss" scoped>
	.upload-container {
		align-items: center;
		display: flex;
		justify-content: flex-start;
	}

	.upload-input {
		flex: 1 1 auto;
	}

	.camera-container {
		align-items: center;
		border-top-right-radius: 4px;
		border-bottom-right-radius: 4px;
		cursor: pointer;
		display: flex;
		height: 46.8px;
		justify-content: center;
		transform: translateX(-5px);
		width: 57px;
	}

	.voucher {
		width: 100%;
	}
</style>