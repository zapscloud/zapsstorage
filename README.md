# zapsstorage
_Zapscloud Storage API Client_

**Initialize Library with config values**
    
    var zapsstorage = new ZapsStorage({
        url: 'https://api.zapscloud.com',
        app: 'appname',
        authkey: ' ',
        authsecret: ' '
    })

**Snippet for File Upload**

> Upload a file with public access url

    var imagesfolder = 'students/images'

    zapsstorage.uploadFile(stubucket, imagesfolder, '/data/images/merchant_shop.png', true)
    .then(function (response) {
        console.log('Upload Response', response)
    })
    .catch(function (err) {
        console.log('Error Upload', err)
    });


**Snippet for Get File Details**

> Get File Details by Uploaded File 

    zapsstorage.getFileDetail(imagesfolder+'merchant_shop.png')
    .then(function (response) {
        console.log('Response File Details', response)
    })
    .catch(function (err) {
        console.log('Error Insert', err)
    });


**Snippet for Get File List**

> Get File Details by Uploaded File 
    zapsstorage.getFileList(imagesfolder)
    .then(function (response) {
        console.log('Response File & Folder List', response)
    })
    .catch(function (err) {
        console.log('Error Insert', err)
    });

**Snippet for File Download**

> Download a file in given folder

    zapsstorage.getFile(imagesfolder+'merchant_shop.png','/download/images')
    .then(function (response) {
        console.log('Download Response', response)
    })
    .catch(function (err) {
        console.log('Error Download', err)
    });

**Snippet for Remove Uploaded File**

> Remove uploaded file using file id

    zapsstorage.removeFile(imagesfolder+'merchant_shop.png')
    .then(function (response) {
        console.log('Response Remove File', response)
    })
    .catch(function (err) {
        console.log('Error Remove File', err)
    });
