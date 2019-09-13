<template>
  <div class="container-company-data padding-container" :style="`background: ${globalColors.primary}`">
		<media-company-data
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/customer-service.png"
			image-height="30"
			border-right="#ffffff"
			family="medium"
			description="(511) 326-0933 
			(511) 326-8056"
		></media-company-data>
		<media-company-data
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/address.svg"
			image-height="32"
			border-right="#ffffff"
			family="medium"
			description="Av. Circunvalación #1857, Urb. El Pino San Luis"
		></media-company-data>
		<media-company-data
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/open-email.svg"
			image-height="29"
			family="medium"
			description="info@mrc.com.pe"
		></media-company-data>
	</div>
</template>

<script>
const mediaCompanyData = () => import('@/components/shared/company/media-company-data');

export default {
	components: {
		mediaCompanyData,
	},
	name: 'container-company-data',
};
</script>


<style lang="scss" scoped>
	.padding-container {
		border-radius: 5px;
		padding: 9px 0;

		@media (max-width: 860px) {
			padding: 5px 0;
		}
	}

	.container-company-data {
		align-items: center;
		display: flex;
		height: 86px;
		justify-content: space-around;
		width: 701px;
		
		@media screen and (max-width: 860px) {
			height: 52px;
			width: 80%;
		}
	}
</style>
