import { compress } from "@assetpack/core/image"

export default {
  entry: './raw-assets',
  output: './assets',
  pipes: [
    compress({
      webp: { quality: 75, alphaQuality: 80, },
      avif: false,
      bc7: false,
      astc: false,
      basis: false,
      etc: false
    })
  ],
}
