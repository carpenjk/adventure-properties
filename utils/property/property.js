export function getImages(property) {
  let imgs = [];
  const mainUrl = {
    url: `http:${property.mainPhoto.fields.file.url}`,
    alt: property.mainPhoto.fields.description,
  };
  const addUrls = property.additionalPhotos.map((photo) => ({
    url: `http:${photo.fields.file.url}`,
    alt: photo.fields.description,
  }));
  imgs = [mainUrl, ...addUrls];
  return imgs;
}
