import ImagePicker from 'react-native-image-picker'

export default (cb) => {
  const options = {
    quality: 1.0,
    maxWidth: 500,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true
    },
    takePhotoButtonTitle: null,
    mediaType: 'photo',
    noData: true,

  }

  ImagePicker.showImagePicker(options, (response) => {
    if (response.didCancel) {
      return response.didCancel
    } else if (response.error) {
      return response.error
    } else if (response.customButton) {
      return response.customButton
    }
    // You can display the image using either:
    const source = response.uri
    cb(source)
  })
}
