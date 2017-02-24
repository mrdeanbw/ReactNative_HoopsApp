import * as firebase from 'firebase'

import {Platform} from 'react-native'
import RNFetchBlob from 'react-native-fetch-blob'

import Config from '../config'
const firebaseConfig = {
  apiKey: Config.FIREBASE_API_KEY,
  authDomain: "localhost",
  databaseURL: Config.FIREBASE_DATABASE_URL,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
}

export default firebase

export const firebaseApp = firebase.initializeApp(firebaseConfig)

export const firebaseDb = firebaseApp.database().ref()

export const firebaseStorage = firebaseApp.storage()

const fs = RNFetchBlob.fs
/* global Blob */
window.Blob = RNFetchBlob.polyfill.Blob
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest

/*
 * We need to replace the in-build fetch() API since we are messing around
 * with XMLHttpRequest.
 * https://github.com/wkh237/react-native-fetch-blob/wiki/Fetch-API#rnfb-as-fetch
 */
window.fetch = new RNFetchBlob.polyfill.Fetch({
    // enable this option so that the response data conversion handled automatically
    auto : true,
    // when receiving response data, the module will match its Content-Type header
    // with strings in this array. If it contains any one of string in this array,
    // the response body will be considered as binary data and the data will stored
    // in file system instead of in memory.
    // By default, it only store response data to file system when Content-Type
    // contains string `application/octet`.
    binaryContentTypes : [
        'image/',
        'video/',
        'audio/',
        'foo/',
    ]
}).build()


export const uploadImage = (uri, location) => {
  return new Promise((resolve, reject) => {
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
    const mime = 'application/octet-stream'

    let uploadBlob = null
    let imageRef = firebaseStorage.ref(location)

    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` })
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
    })
  })
}
