'use strict';

const LINEServiceFactory = {
    SERVICE_IDS: {
        USER_INFO: 'line.http.userinfo',
        VERIFY_ID_TOKEN: 'line.http.verifyIdToken',
        VERIFY_ACCESS_TOKEN: 'line.http.verifyIdToken',
        REVOKE: 'line.http.revoke'
    },
    ACTIONS: {
        USER_INFO: 'USER_INFO',
        VERIFY_ID_TOKEN: 'VERIFY_ID_TOKEN',
        VERIFY_ACCESS_TOKEN: 'VERIFY_ACCESS_TOKEN',
        REVOKE: 'REVOKE'
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
            requestMethod: 'GET',
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
    },
    buildVerifyAccessTokenRequestContainer: function (requestParams) {
        return {
            requestMethod: 'GET',
            action: LINEServiceFactory.ACTIONS.VERIFY_ACCESS_TOKEN,
            params: {
                access_token: requestParams.accessToken
            }
        };
    },
    buildRevokeRequestContainer: function (requestParams) {
        return {
            requestMethod: 'POST',
            action: LINEServiceFactory.ACTIONS.REVIKE,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: {
                access_token: requestParams.accessToken,
            }
        };
    }
};

module.exports = LINEServiceFactory;
