<template>
	<div class="form-bulletin">
		<div class="content-description">
			<p class="text-subscription">Suscríbete a Boletín</p>
			<input type="text" placeholder="Ingresa tu correo Electrónico" class="input-form">
			<button class="button-form">Suscríbete</button>
		</div>
		<div class="form-bulletin-description-company">
			<div class="content-date-company">
				<img src="/static/img/icons/telephone-1.svg" alt="">
				<p class="item-date-company">[511] 326-0933 
				[511] 326-8056</p>
			</div>
			<div class="content-date-company">
				<img src="/static/img/icons/mail.svg" alt="">
				<p class="item-date-direction">Av. Circunvalación #1857, 
				Urb. El Pino - San Luis</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'form-bulletin',
};
</script>

<style lang="scss">
.button-form {
	background-color: color(dark);
	border-bottom-right-radius: 6px;
	border-top-right-radius: 6px;
	color: color(white);
	font-family: font(demi);
	font-size: size(medium);
	min-height: 39px;
	width: 128px;

	@media screen and (max-width: 850px) {
		font-size: size(small);
		position: relative;
  	top: -1px;
		width: 65px;
	}
}

.text-subscription {
	color: color(dark);
	font-family: font(demi);
	font-size:  size(medium);
	margin-bottom: 45px;
	text-align: center;

	@media (max-width: 850px) {
		text-align: center;
	}
}

.text-subscription::before {
		border-top: 1px solid #4a4a4a;
		content: '';
		color: #4a4a4a;
		height: 2px;
		left: 0px;
  	position: absolute;
		top: 9px;
		width: 120px;
	@media (max-width: 850px) {
		left: 12px;
		width: 80px;
	}

}

.text-subscription::after {
	border-top: 1px solid #4a4a4a;
	color: #4a4a4a;
	content: '';
	height: 2px;
	position: absolute;
	right: 0px;
	top: 9px;
	width: 120px;

	@media (max-width: 850px) {
		right: 12px;
		width: 80px;
	}
}

.form-bulletin {
	align-items: center;
	background-color: color(background);
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.08);
	display: flex;
	justify-content: space-around;
	min-height: 209px;
	padding: 40px 0px;
	width: 100%;

	@media (max-width: 850px) {
		flex-direction: column;		
	}
}

.item-date-company {
	margin: 0 0 0 20px;
	max-width: 109px;

	@media (max-width: 850px) {
		padding-top: 17px;
	}
}

.content-date-company {
	align-items: center;
	display: flex;
	margin-top: 11px;

	@media (max-width: 850px) {
		flex-direction: column;
	}
}

.item-date-direction {
	margin: 0 0 0 20px;
	max-width: 190px;

	@media (max-width: 850px) {
		padding-top: 17px;
		text-align: center;
	}
}

.input-form {
	border: 1px solid color(dark);
	border-radius: 6px;
	font-size: size(minmedium);
	left: 8px;
	min-height: 39px;
	padding-left: 13px;
	position: relative;
	width: 281px;

	@media (max-width: 650px) {
		font-size: size(msmall);
		padding-left: 5px;
		width: 160px;
	}
}

.form-bulletin-description-company {
	@media (max-width: 850px) {
		display: flex;
    flex-direction: column-reverse;
		margin-top: 50px;
	}
}

.content-description {
	position: relative;
}
</style>
