'use strict';
const fs = require("fs");
const FormData = require('form-data');
const path = require('path');
const fileType = require('file-type');
const url = require('url');

const axios = require('axios');

module.exports = class File {
    constructor() {}

    uploadFile(bucketid, folderid, fullfilepath, ispublic) {
        return new Promise((resolve, reject) => {
            var formData = new FormData();
            fs.readFile(path.join(fullfilepath), (err, fileData) => {
                formData.append("file", fileData, {
                    filename: fullfilepath.filename,
                    filepath: path.join(fullfilepath),
                    contentType: (fileType(fileData)) ? fileType(fileData).mime : 'application/octet-stream',
                    knownLength: fullfilepath.size
                });

                var _ispulbic = (ispublic?'?access=public':'')
                this.header_param.headers['Content-Type'] = 'multipart/form-data; boundary=' + formData.getBoundary();
                axios.post(`${this.zapsurl}/storages/${bucketid}/folders/${folderid}/files${_ispulbic}`, formData, this.header_param)
                    .then(function (response) {
                        console.log("Uploaded ", response.data);
                        return resolve(response.data)
                    })
                    .catch(function (error) {
                        console.log("Error ", error)
                        return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
                    });
            })
        });
    }

    removeFile(bucketid, folderid, fileid) {
        return new Promise((resolve, reject) => {
            axios.delete(`${this.zapsurl}/storages/${bucketid}/folders/${folderid}/files/${fileid}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
                });
        });
    }

    getFileDetail(bucketid, folderid, fileid) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.zapsurl}/storages/${bucketid}/folders/${folderid}/files/${fileid}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
                });
        });
    }

    getFile(filekey, downloadpath) {
        return new Promise((resolve, reject) => {
            console.log('File key ', filekey, downloadpath)
            var _url = `${this.zapsurl}/storages/${filekey}`;
            var _urlparts = _url.split('/');
            const writer = fs.createWriteStream(downloadpath+_urlparts[_urlparts.length-1])
            axios({
                url: _url,
                method: 'GET',
                responseType: 'stream',
                headers: this.header_param.headers
            })
            .then(function (response) {
                response.data.pipe(writer);
                return resolve(downloadpath+_urlparts[_urlparts.length-1]);
            })
            .catch(function (error) {
                return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
            });
        });
    }

    getFileList(bucketid, folderid, filterquery='') {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.get(`${this.zapsurl}/storages/${bucketid}/folders/${folderid}/files?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
                });
        });
    }
}