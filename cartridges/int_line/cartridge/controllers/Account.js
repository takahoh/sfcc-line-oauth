'use strict';

const server = require('server');
server.extend(module.superModule);

/**
 * Login-RevokeLINE
 * @name Base/Login-RevokeLINE
 * @function
 * @memberof Login
 * @param {middleware} - server.middleware.https
 */
server.get('RevokeLINE', server.middleware.https, function (req, res, next) {
    const CustomerMgr = require('dw/customer/CustomerMgr');
    const URLUtils = require('dw/web/URLUtils');
    const Transaction = require('dw/system/Transaction');
    const LINEModel = require('*/cartridge/models/lineModel');
    const collections = require('*/cartridge/scripts/util/collections');

    const customer = CustomerMgr.getCustomerByCustomerNumber(req.currentCustomer.profile.customerNo);
    const accessToken = req.session.privacyCache.store.accessToken;
    const verifyAccessTokenResponse = LINEModel.verifyAccessToken(accessToken);

    // TODO reflesh access token if verify result is not ok.

    if (verifyAccessTokenResponse.success) { 
        Transaction.wrap(function () {
            collections.forEach(customer.externalProfiles, function (exProfile) {
                if (exProfile.authenticationProviderID === "LINE") {
                    customer.removeExternalProfile(exProfile);
                }
            })        
            const revokeAccessTokenResponse = LINEModel.revokeAccessToken(accessToken);
            // TODO clear privacy cache if success revoke LINE access token.
        })
    }
    
    res.redirect(URLUtils.url('Home-Show'));

    next();
});

module.exports = server.exports();
