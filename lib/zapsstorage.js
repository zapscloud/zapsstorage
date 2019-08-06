'use strict';

const Many = require('extends-classes')
const axios = require('axios');

const Folder = require('./folder')
const Bucket = require('./bucket')
const File = require('./file')

const btoa = function (str) {
    return Buffer.from(str).toString('base64');
}

class ZapsStorage extends Many(Folder, Bucket, File){
    constructor(config) {
        super();
        var credentials = btoa(`${config.authkey}:${config.authsecret}`);
        var basicAuth = 'Basic ' + credentials;
        this.zapsurl = config.url;
        this.header_param = {
            headers: {
                Authorization: basicAuth,
                Application: (config.app?config.app:''),
                Tenant: (config.tenant?config.tenant:'')
            }
        };
    }
}

module.exports = ZapsStorage;