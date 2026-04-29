const TIGHT_CROP_PRODUCT_IDS = new Set([1, 3, 4, 12, 16])

function needsTightImageCropByProductId(productId) {
  return TIGHT_CROP_PRODUCT_IDS.has(productId)
}

export { needsTightImageCropByProductId }
