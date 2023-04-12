'use strict';

const LINEServiceFactory = {
    SERVICE_IDS: {
        USER_INFO: 'line.http.userinfo',
        VERIFY_ID_TOKEN: 'line.http.verifyIdToken'
    },
    ACTIONS: {
        USER_INFO: 'USER_INFO',
        VERIFY_ID_TOKEN: 'VERIFY_ID_TOKEN'
    },

    /* ***************************************************
     * Build requestContainer helpers
     * ************************************************* */
    /**
     * builds request container for LINE UserInfo api call
     * @param {Object} requestParams request parameter object
     * @returns {Object} the request container
     */
    buildGetUserInfoRequestContainer: function (requestParams) {
        return {
            requestMethod: 'POST',
            action: LINEServiceFactory.ACTIONS.USER_INFO,
            headers: {
                Authorization: 'Bearer ' + requestParams.accessToken
            }
        };
    },
    buildVerifyIdTokenRequestContainer: function (requestParams) {
        return {
            requestMethod: 'POST',
            action: LINEServiceFactory.ACTIONS.VERIFY_ID_TOKEN,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                id_token: requestParams.idToken
            }
        };
    }
};

module.exports = LINEServiceFactory;
