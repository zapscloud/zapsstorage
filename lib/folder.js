'use strict';

const axios = require('axios');

module.exports = class Folder {
    constructor(){
    }

    createFolder(bucketid, folderid, foldername) {
        return new Promise((resolve, reject) => {
            var jsonfolder = {
                'folder_id': folderid,
                'folder_name': foldername
            }
            axios.post(`${this.zapsurl}/storages/${bucketid}/folders`, jsonfolder, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    removeFolder(bucketid, folderid) {
        return new Promise((resolve, reject) => {           
            axios.delete(`${this.zapsurl}/storages/${bucketid}/folders/${folderid}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getFolder(bucketid, folderid) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.zapsurl}/storages/${bucketid}/folders/${folderid}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getFolderList(bucketid, filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.get(`${this.zapsurl}/storages/${bucketid}/folders?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}