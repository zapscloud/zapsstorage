# zapsstorage
_Zapscloud Storage API Client_

**Initialize Library with config values**
    
    var zapsstorage = new ZapsStorage({
        url: 'https://api.zapscloud.com',
        app: 'appname',
        authkey: ' ',
        authsecret: ' '
    })

    var stubucket = 'students'

**Snippet for Storage Bucket Create**

> Create Bucket

    zapsstorage.createBucket(stubucket, 'Student Files Bucket')
    .then(function (response) {
        console.log('Response Insert', response)
    })
    .catch(function (err) {
        console.log('Error Insert', err)
    });

**Snippet for Folder Create**

> Create Folder

    var imagesfolder = 'images'
    
    zapsstorage.createFolder (stubucket, imagesfolder, 'Folder to store Images in Student Bucket') 
    .then(function (response) {
        console.log('Create Folder Response', response)
    })
    .catch(function (err) {
        console.log('Error Folder Create', err)
    });


**Snippet for File Upload**

> Upload a file with public access

    zapsstorage.uploadFile(stubucket, imagesfolder, '/data/images/merchant_shop.png', true)
    .then(function (response) {
        console.log('Upload Response', response)
    })
    .catch(function (err) {
        console.log('Error Upload', err)
    });


**Snippet for Get File Details**

> Get File Details by Uploaded File Name

    zapsstorage.getFileDetail(stubucket, imagesfolder, '1565018681600-merchant_shop.png')
    .then(function (response) {
        console.log('Response Insert', response)
    })
    .catch(function (err) {
        console.log('Error Insert', err)
    });


**Snippet for File Download**

> Download a file in given folder using file key

    zapsstorage.getFile('students/images/1565018591686-merchant_shop.png','/download/images')
    .then(function (response) {
        console.log('Download Response', response)
    })
    .catch(function (err) {
        console.log('Error Download', err)
    });

**Snippet for Remove Uploaded File**

> Remove uploaded file using file id

    zapsstorage.removeFile(stubucket, imagesfolder, '1565018591686-merchant_shop.png')
    .then(function (response) {
        console.log('Response Remove File', response)
    })
    .catch(function (err) {
        console.log('Error Remove File', err)
    });
