'use strict';

/**
 * Model for LINE Services
 * @module models/lineModel
 */

/* Script Modules */
const Logger = require('dw/system/Logger').getLogger('AZURE_API');
const serviceFactory = require('*/cartridge/scripts/line/util/serviceFactory');
const serviceMgr = require('*/cartridge/scripts/line/services/serviceMgr');

const LINEModel = ({
    /**
     * Return LINE UserInfo response for access token
     * @param {string} accessToken - OAuth Access Token
     * @returns {Object} service response object
     */
    getUserInfo: function (accessToken) {
        var result = {
            success: false,
            responseObject: null
        };

        try {
            if (!accessToken) return result;
            const requestContainer = serviceFactory.buildGetUserInfoRequestContainer({ accessToken: accessToken });
            const lineService = serviceMgr.getService(serviceFactory.SERVICE_IDS.USER_INFO);
            var serviceResult = lineService.call(requestContainer);
            var serviceObject = serviceResult ? serviceResult.getObject() : null;
            if (serviceResult.isOk() && serviceObject && serviceObject.responseObject) {
                result.success = true;
                result.responseObject = serviceObject.responseObject;
            }
        } catch (e) {
            Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        }
        return result;
    },
    verifyIdToken: function (idToken) {
        var result = {
            success: false,
            responseObject: null
        };

        try {
            if (!idToken) return result;
            const requestContainer = serviceFactory.buildVerifyIdTokenRequestContainer({ idToken: idToken });
            const lineService = serviceMgr.getService(serviceFactory.SERVICE_IDS.VERIFY_ID_TOKEN);
            var serviceResult = lineService.call(requestContainer);
            var serviceObject = serviceResult ? serviceResult.getObject() : null;
            if (serviceResult.isOk() && serviceObject && serviceObject.responseObject) {
                result.success = true;
                result.responseObject = serviceObject.responseObject;
            }
        } catch (e) {
            Logger.error(e.toString() + ' in ' + e.fileName + ':' + e.lineNumber);
        }
        return result;
    }
});

module.exports = LINEModel;
