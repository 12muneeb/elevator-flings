import { Keyboard } from 'react-native';
import { Image as ImageCompressor } from 'react-native-compressor';
export { colors } from './colors';
export {
  paginationLimit,
  DEFAULT_LANGUAGE,
  version,
  platform,
  systemVersion,
  deviceUId,
  deviceType,
  hasNotch,
} from './constants';
export { WP, HP } from './styling/responsive';
export { size, family } from './sizes';

export const updateImagesInGallery = async (path, mime, type, galleryAssets, callBackForGalleryAssets) => {
  let multipleImages = [];
  if (Array.isArray(path)) {
    const arr = path?.map(async item => {
      const result = await ImageCompressor.compress(item?.path, {
        maxHeight: 400,
        maxWidth: 400,
        quality: 1,
      });
      let imageObject = {
        uri: result,
        name: `Image${Date.now()}${item?.filename}.${item?.mime.slice(
          item?.mime.lastIndexOf('/') + 1,
        )}`,
        type: item?.mime,
        tempType: 'photo',
      };
      multipleImages.push(imageObject);
    });
    await Promise.all(arr);
    console.log('multipleImages', multipleImages);
    const mergeImagesWithExistingGalleryAssets = [
      ...galleryAssets,
      ...multipleImages,
    ];
    callBackForGalleryAssets(mergeImagesWithExistingGalleryAssets);
  } else {
    const getExistingGalleryAssets = [...galleryAssets];
    const imageObject = {
      uri: path,
      name: `Image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
      type: mime,
      tempType: type,
    };
    getExistingGalleryAssets.push(imageObject);
    callBackForGalleryAssets(getExistingGalleryAssets);
  }
  Keyboard.dismiss();
};