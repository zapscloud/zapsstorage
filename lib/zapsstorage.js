'use strict';

const Many = require('extends-classes')
const axios = require('axios');

const File = require('./file')

const btoa = function (str) {
    return Buffer.from(str).toString('base64');
}

class ZapsStorage extends Many(File){
    constructor(config) {
        super();
        var credentials = btoa(`${config.authkey}:${config.authsecret}`);
        var basicAuth = 'Basic ' + credentials;
        this.stage = config.stage;
        this.header_param = {
            headers: {
                Authorization: basicAuth,
                Application: (config.app?config.app:'')
            }
        };
        if(config.tenant)
            this.header_param.headers['Tenant'] = config.tenant;
    }
}

module.exports = ZapsStorage;