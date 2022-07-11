if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/docserver'

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB`)
    })
    .catch((err) => {
        console.log('Connection Error', err);
    })


const Api = require('./models/apiModel')
const api = new Api({
    apiName: "Create An Account",
    apiDescription: "Api used to create accounts",
    attributes: [
        {
            name: 'Name',
            description: 'User recognizable name for the Account. must not contain double quotes (") or colon (:)',
            dataType: 'String',
            required: true,
            additionalMessage: 'Max 100 characters',
        },
        {
            name: 'AcctNum',
            description: 'User-defined account number to help the user in identifying the account within the chart-of-accounts and in deciding what should be posted to the account',
            dataType: 'String',
            required: true,
            additionalMessage: 'Name must be unique, Length must be between 6 and 20 characters. Must start with the account number from the master category list. Name limited to alpha-numeric characters',
        },
        {
            name: 'TaxCodeRef',
            description: 'Reference to the default tax code used by this account. Tax codes are referenced by the TaxCode.Id in the TaxCode object. Available when endpoint is invoked with the minorversion=3 query parameter. For global locales.',
            dataType: 'ReferenceType',
            required: true,
            additionalMessage: 'Required for France locales',

        },
        {
            name: 'AccountType',
            description: 'A detailed account classification that specifies the use of this account. The type is based on the Classification',
            dataType: 'AccountTypeEnum',
            required: true,
            additionalMessage: 'Required if AccountSubType is not specified'
        },
        {
            name: 'AccountSubType',
            description: 'The account sub-type classification and is based on the AccountType value',
            dataType: 'String',
            required: true,
            additionalMessage: 'Required if AccountType is not specified'
        }
    ],

    requestBaseURL: 'https://sandbox-quickbooks.api.intuit.com',
    requestPath: '/v3/company/<realmID>/account',
    requestMethod: 'POST',
    requestContentType: 'application/json',
    requestBody: JSON.stringify({
        "Name": "MyJobs_test",
        "AccountType": "Accounts Receivable"
    }),
    returnDescription: 'Returns the newly created Account object',
    responseObject: JSON.stringify({
        "Account": {
            "FullyQualifiedName": "MyJobs",
            "domain": "QBO",
            "Name": "MyJobs",
            "Classification": "Asset",
            "AccountSubType": "AccountsReceivable",
            "CurrencyRef": {
                "name": "United States Dollar",
                "value": "USD"
            },
            "CurrentBalanceWithSubAccounts": 0,
            "sparse": false,
            "MetaData": {
                "CreateTime": "2014-12-31T09:29:05-08:00",
                "LastUpdatedTime": "2014-12-31T09:29:05-08:00"
            },
            "AccountType": "Accounts Receivable",
            "CurrentBalance": 0,
            "Active": true,
            "SyncToken": "0",
            "Id": "94",
            "SubAccount": false
        },
        "time": "2014-12-31T09:29:05.717-08:00"
    })

})

api.save()
    .then(() => {
        console.log('Saved');
    })
    .catch((err) => {
        console.log(err);
    })