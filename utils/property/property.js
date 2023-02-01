export function getImages(property) {
  let imgs = [];
  const mainUrl = {
    url: `https:${property.mainPhoto.fields.file.url}`,
    alt: property.mainPhoto.fields.description,
  };
  const addUrls = property.additionalPhotos.map((photo) => ({
    url: `https:${photo.fields.file.url}`,
    alt: photo.fields.description,
  }));
  imgs = [mainUrl, ...addUrls];
  return imgs;
}
