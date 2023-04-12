'use strict';

const LINEServiceFactory = {
    SERVICE_IDS: {
        USER_INFO: 'line.http.userinfo'
    },
    ACTIONS: {
        USER_INFO: 'USER_INFO'
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
    }
};

module.exports = LINEServiceFactory;
