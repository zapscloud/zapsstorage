'use strict';
const fs = require("fs");
const FormData = require('form-data');
const path = require('path');
const fileType = require('file-type');
const url = require('url');

const axios = require('axios');

var debug = require('debug')('zapsstroage:file')

module.exports = class File {
    constructor() {}

    uploadFile(folderpath, fullfilepath, ispublic) {
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

                var _path = `${folderpath}${_ispulbic}`.replace(new RegExp('//', 'g'),'/')
                axios.post(`https://storage.api${this.stage}.zapscloud.com/${_path}`, formData, this.header_param)
                    .then(function (response) {
                        debug("Uploaded ", response.data);
                        return resolve(response.data)
                    })
                    .catch(function (error) {
                        debug("Error ", error)
                        return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
                    });
            })
        });
    }

    removeFile(fullfilepath) {
        return new Promise((resolve, reject) => {
            var _path = `${fullfilepath}`.replace(new RegExp('//', 'g'),'/')
            axios.delete(`https://storage.api${this.stage}.zapscloud.com/${_path}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
                });
        });
    }

    getFileDetail(fullfilepath) {
        return new Promise((resolve, reject) => {
            var _path = `${fullfilepath}`.replace(new RegExp('//', 'g'),'/')
            axios.get(`https://storage.api${this.stage}.zapscloud.com/${_path}?action=stat`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
                });
        });
    }

    getFile(fullfilepath, downloadpath) {
        return new Promise((resolve, reject) => {
            debug('File key ', fullfilepath, downloadpath)
            var _path = `${fullfilepath}`.replace(new RegExp('//', 'g'),'/')
            var _url = `https://storage.api${this.stage}.zapscloud.com/${_path}`;
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

    getFileList(folderpath) {
        return new Promise((resolve, reject) => {
            var _path = `${folderpath}`.replace(new RegExp('//', 'g'),'/')
            axios.get(`https://storage.api${this.stage}.zapscloud.com/${_path}?action=list`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response ? (error.response.data ? error.response.data : error.response) : error);
                });
        });
    }
}