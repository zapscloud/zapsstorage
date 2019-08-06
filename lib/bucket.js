'use strict';

const axios = require('axios');

module.exports = class Bucket {
    constructor(){
    }
    createBucket(bucketid, bucketname) {
        return new Promise((resolve, reject) => {
            var jsonbucket = {
                'bucket_id': bucketid,
                'bucket_name': bucketname
            }
            axios.post(`${this.zapsurl}/storages/buckets`, jsonbucket, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    removeBucket(bucketname) {
        return new Promise((resolve, reject) => {           
            axios.delete(`${this.zapsurl}/storages/buckets/${bucketname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getBucket(bucketname) {
        return new Promise((resolve, reject) => {
            axios.get(`${this.zapsurl}/storages/buckets/${bucketname}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }

    getBucketList(filterquery) {
        return new Promise((resolve, reject) => {
            var _filterquery = (filterquery ? `${filterquery}` : '');
            axios.get(`${this.zapsurl}/storages/buckets?${_filterquery}`, this.header_param)
                .then(function (response) {
                    return resolve(response.data);
                })
                .catch(function (error) {
                    return reject(error.response?(error.response.data?error.response.data:error.response):error);
                });
        });
    }
}