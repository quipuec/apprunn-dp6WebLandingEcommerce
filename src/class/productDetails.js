import l, { isEmpty } from '@/shared/lib';
import GlobalFeatures from '@/class/globalFeatures';

class ProductDetails {
	constructor(childrens) {
		this.childrens = childrens;
		this.filteredFeatures = [];
		this.globalFeatures = new GlobalFeatures(childrens);
		this.selectedFeatures = {};
		this.selectedProduct = {};
		this.selectedProductsArray = [];
		this.unitId = 0;
	}
	buyingProduct() {
		return { ...this.selectedProduct };
	}
	clearFilteredFeatures() {
		this.filteredFeatures = [];
	}
	clearSelectedFeatures() {
		this.selectedFeatures = {};
	}
	getFeatures() {
		return this.globalFeatures.get();
	}
	getImages() {
		const imgArray = this.getProductDetails().images;
		const imagesFiltered = imgArray.filter(img => img.unitId === this.unitId);
		if (isEmpty(imagesFiltered)) {
			return imgArray.filter(img => !img.unitId);
		}
		return imagesFiltered;
	}
	getProductDetails() {
		return { ...this.selectedProduct };
	}
	featureSelected(feature) {
		if (isEmpty(this.selectedFeatures)) {
			this.globalFeatures.allUnSelected();
		}
		this.updateSelectedFeatures.call(this, feature);
		this.setFilteredProducts.call(this);
		if (this.selectedProductsArray.length === 0) {
			this.globalFeatures.allUnSelected();
			this.clearFilteredFeatures.call(this);
			this.clearSelectedFeatures.call(this);
			this.updateSelectedFeatures.call(this, feature);
			this.setFilteredProducts.call(this);
			this.productSelected.call(this, this.selectedProductsArray[0]);
		} else {
			this.globalFeatures.update(this.filteredFeatures);
		}
	}
	firstProductSelected(product) {
		const { unitId } = product;
		this.globalFeatures.init();
		this.productSelected(product);
		this.updateUnitId.call(this, unitId);
		this.updateQuantity.call(this, 1);
	}
	productSelected(product) {
		if (product.features.length > 0) {
			product.features.forEach(this.featureSelected.bind(this));
		} else {
			this.updateSelectedProducts([product]);
		}
	}
	setFilteredProducts() {
		let localCache = this.childrens;
		const features = [];
		Object.values(this.selectedFeatures).forEach((f) => {
			const products = [];
			localCache.forEach((c) => {
				const index = c.features.findIndex(fea => fea.value === f.value);
				if (index > -1) {
					products.push(c);
					c.features.forEach((eleFea) => {
						const indexFeatures = features.findIndex(el => el.value === eleFea.value);
						if (indexFeatures === -1) {
							features.push(eleFea);
						}
					});
				}
			});
			localCache = [...products];
		});
		this.updateFilteredFeatures(features);
		this.updateSelectedProducts(localCache);
	}
	updateSelectedFeatures(feature) {
		this.selectedFeatures[feature.id] = feature;
	}
	updateSelectedProducts(productsCollection) {
		[this.selectedProduct] = productsCollection;
		if (l.isNotEmpty(this.selectedProduct)) {
			this.updateQuantity(1);
			this.updateUnitId(this.selectedProduct.unitId);
		}
		this.selectedProductsArray = productsCollection;
	}
	updateFilteredFeatures(features) {
		const newFeatures = features.map((feature) => {
			const selectedFeatures = Object.values(this.selectedFeatures);
			const isSelected = selectedFeatures.some(f => f.value === feature.value);
			return l.setNewProperty('isSelected', isSelected)(feature);
		});
		this.filteredFeatures = [...newFeatures];
	}
	updateProductSelected(prop, val) {
		this.selectedProduct[prop] = val;
	}
	updateQuantity(q) {
		this.updateProductSelected.call(this, 'quantity', q);
	}
	updateUnitId(unitId) {
		this.unitId = unitId;
		this.updateProductSelected.call(this, 'unitSelected', unitId);
	}
}

export default ProductDetails;
