'use strict';

/* Script Modules */
const serviceFactory = require('*/cartridge/scripts/line/util/serviceFactory');
const serviceHelpers = require('*/cartridge/scripts/helpers/serviceHelpers');

const LINEConfig = {
    createRequest: function (service, requestDataContainer) {
        this.serviceAction = requestDataContainer.action;

        var serviceUrl;
        var requestMethod = requestDataContainer.requestMethod;
        if (requestMethod) {
            service.setRequestMethod(requestMethod);

            // enable caching for GET requests
            if (requestMethod === 'GET') {
                service.setCachingTTL(60);
            }
        }

        // add path to service URL
        if (Object.hasOwnProperty.call(requestDataContainer, 'path') && requestDataContainer.path) {
            serviceHelpers.appendUrlPath(service, requestDataContainer.path);
        }

        // append params to the service request
        if (Object.hasOwnProperty.call(requestDataContainer, 'params') && requestDataContainer.params) {
            serviceHelpers.appendParams(service, requestDataContainer.params);
        }

        // override service URL if it exists in request container
        if (Object.hasOwnProperty.call(requestDataContainer, 'serviceUrl') && requestDataContainer.serviceUrl) {
            serviceUrl = requestDataContainer.serviceUrl;
            service.setURL(serviceUrl);
        }

        var requestHeaders = Object.hasOwnProperty.call(requestDataContainer, 'headers') && requestDataContainer.headers ? requestDataContainer.headers : {};
        var contentType = Object.hasOwnProperty.call(requestHeaders, 'Content-Type') && requestHeaders['Content-Type'] ? requestHeaders['Content-Type'] : null;
        if (requestHeaders && Object.keys(requestHeaders).length > 0) {
            Object.keys(requestHeaders).forEach(function (headerName) {
                service.addHeader(headerName, requestHeaders[headerName]);
            });
        }
        if (this.serviceAction === serviceFactory.ACTIONS.VERIFY_ID_TOKEN) {
            let clientId = service.configuration.credential.user;
            requestDataContainer.data.client_id = clientId;
        }
        if (this.serviceAction === serviceFactory.ACTIONS.REVOKE) {
            let clientId = service.configuration.credential.user;
            requestDataContainer.data.client_id = clientId;
            const clientSecret = service.configuration.credential.password;
            requestDataContainer.data.client_secret = clientSecret
        }
        
        if (requestDataContainer.data) {
            switch (contentType) {
                case 'application/json':
                    return JSON.stringify(requestDataContainer.data);
                case 'application/x-www-form-urlencoded':
                    return serviceHelpers.buildFormPostRequest(requestDataContainer.data);
                default:
                    return requestDataContainer.data;
            }
        }

        return '';
    },
    parseResponse: function (service, serviceResponse) {
        if (serviceResponse && serviceResponse.statusCode >= 200 && serviceResponse.statusCode < 300) {
            if (this.serviceAction === serviceFactory.ACTIONS.USER_INFO || this.serviceAction === serviceFactory.ACTIONS.VERIFY_ID_TOKEN) {
                return serviceHelpers.parseJsonResponse(serviceResponse);
            }
            return serviceResponse;
        }
        throw new Error('Service Errored with Status Code: ' + serviceResponse.statusCode);
    },
    mockCall: function (service) {
        const mockService = require('*/cartridge/scripts/line/util/mockService');

        if (this.serviceAction === serviceFactory.ACTIONS.USER_INFO) {
            return mockService.getUserInfoResponse();
        }

        if (this.serviceAction === serviceFactory.ACTIONS.VERIFY_ID_TOKEN) {
            return mockService.getVerifyIdTokenResponse();
        }

        return {
            statusCode: 200,
            statusMessage: 'Success',
            text: 'MOCK RESPONSE (' + service.URL + ')'
        };
    },
    filterLogMessage: function (data) {
        try {
            var logObj = JSON.parse(data);
            var result = serviceHelpers.iterate(logObj);
            return result ? JSON.stringify(result) : data;
        } catch (ex) {
            return serviceHelpers.prepareFormLogData(data);
        }
    }
};

module.exports.LINEConfig = LINEConfig;
