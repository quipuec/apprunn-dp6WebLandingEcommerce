export default function (code) {
	if (code === 'USER_EXISTS') {
		return 'El usuario ya existe';
	}
	return 'Verifique que completó los datos requeridos';
}
