/** 
 * Created by Eswar Sairam on 23/09/20
 **/

 import { Component } from 'react';
 import RNShare from 'react-native-share';
 import { Platform } from 'react-native';
 import RNFetchBlob from 'rn-fetch-blob';
 var RNFS = require('react-native-fs');
 
 export default class Share extends Component {
 
     static open(options, callback) {
         if (options && options.url) {
             convertUrlAndShare(options, callback)
         } else if (options && options.urls && options.urls.length > 0) {
             convertUrlAndShareMultiple(options, callback)
         } else {
             openRNShare(options, callback)
         }
     }
 
 
 
 }
 
 const convertUrlAndShareMultiple = async (options, callback) => {
     const fs = RNFetchBlob.fs;
     let imagePath = null
     let finalOptions = options
     let urls = []
     let tempCount = 0
     let imageCount = 0
     options.urls.forEach(data => {
         if (Platform.OS == 'ios') {
 
             imageCount += 1
             const localFile = `${RNFS.DocumentDirectoryPath}/${options.title || "images"}${imageCount}.jpg`;
             const downloadOptions = {
                 fromUrl: data,
                 toFile: localFile
             };
             RNFS.downloadFile(downloadOptions).promise
                 .then(() => {
                     tempCount += 1
                     urls.push(`file://${localFile}`)
                     if (tempCount == options.urls.length) {
                         finalOptions.urls = urls
                         openRNShare(finalOptions, callback)
                     }
                 })
                 .catch(error => {
                     tempCount += 1
                     if (callback) {
                         callback(false, error)
                     }
                 })
 
 
         } else {
             RNFetchBlob.config({
                 fileCache: true
             })
                 .fetch("GET", data)
                 .then(resp => {
                     imagePath = resp.path();
                     return resp.readFile("base64");
                 })
                 .then(base64Data => {
                     tempCount += 1
                     urls.push('data:image/png;base64,' + base64Data)
                     if (tempCount == options.urls.length) {
                         // console.log("urls===", urls)
                         finalOptions.urls = urls
                         openRNShare(finalOptions, callback)
                     }
                     return fs.unlink(imagePath);
                 }).catch(error => {
                     if (callback) {
                         callback(false, error)
                     }
                 })
         }
     })
 }
 
 const convertUrlAndShare = async (options, callback) => {
     const fs = RNFetchBlob.fs;
     let imagePath = null
     let finalOptions = options
     if (Platform.OS == 'ios') {
         const localFile = `${RNFS.DocumentDirectoryPath}/Invoice.pdf`;
         const downloadOptions = {
             fromUrl: options.url,
             toFile: localFile
         };
         RNFS.downloadFile(downloadOptions).promise
             .then(() => {
                 setTimeout(() => {
                     finalOptions.url = `file://${localFile}`
                     openRNShare(finalOptions, callback)
                 }, 200)
             })
             .catch(error => {
                 if (callback) {
                     callback(false, error)
                 }
             })
     } else {
         RNFetchBlob.config({
             fileCache: true
         })
             .fetch("GET", options.url)
             .then(resp => {
                 imagePath = resp.path();
                 return resp.readFile("base64");
             })
             .then(base64Data => {
                 setTimeout(() => {
                     finalOptions.url = 'data:application/pdf;base64,' + base64Data
                     openRNShare(finalOptions, callback)
                 }, 200)
                 return fs.unlink(imagePath);
             }).catch(error => {
                 if (callback) {
                     callback(false, error)
                 }
             })
     }
 }
 
 const openRNShare = async (optionss, callback) => {
     // console.log(optionss.title)
     try {
         await RNShare.open(optionss);
         if (callback) {
             callback(true, null)
         }
     } catch (error) {
         if (callback) {
             callback(false, error)
         }
     }
 }
 