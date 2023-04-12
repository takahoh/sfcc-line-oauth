'use strict';

const mockedResponses = require('~/cartridge/scripts/line/tests/data/mockedResponses');
const MOCK_SUCCESS = true;

/**
 * set mock text
 * @param {Object} jsonObject - the object to stringify
 * @returns {string} stringified JSON object
 */
function setMockText(jsonObject) {
    if (!jsonObject || !Object.keys(jsonObject).length) return '';
    jsonObject.isMocked = true; // eslint-disable-line no-param-reassign
    return JSON.stringify(jsonObject);
}

const LINEMockService = {
    getUserInfoResponse: function () {
        if (MOCK_SUCCESS) {
            return {
                statusCode: 200,
                statusMessage: 'OK',
                text: setMockText(mockedResponses.lineUserInfo.success)
            };
        }
        return {
            statusCode: 401,
            statusMessage: 'ERROR',
            errorText: setMockText(mockedResponses.lineUserInfo.error)
        };
    },
    getVerifyIdTokenResponse: function () {
        if (MOCK_SUCCESS) {
            return {
                statusCode: 200,
                statusMessage: 'OK',
                text: setMockText(mockedResponses.verifyIdToken.success)
            };
        }
        return {
            statusCode: 401,
            statusMessage: 'ERROR',
            errorText: setMockText(mockedResponses.verifyIdToken.error)
        };
    }
};

module.exports = LINEMockService;
