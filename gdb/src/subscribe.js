const { execute } = require('apollo-link');
const { WebSocketLink } = require('apollo-link-ws');
const { SubscriptionClient } = require('subscriptions-transport-ws');
const ws = require('ws');

const getWsClient = function (wsurl) {
    const client = new SubscriptionClient(
        wsurl, { reconnect: true }, ws
    );
    return client;
};

// wsurl: GraphQL endpoint
// query: GraphQL query (use gql`` from the 'graphql-tag' library)
// variables: Query variables object
const createSubscriptionObservable = (wsurl, query, variables) => {
    const link = new WebSocketLink(getWsClient(wsurl));
    return execute(link, { query: query, variables: variables });
};

function CustomSubscribe(ws_url,gql_query,func_cb, func_err) {
    const subscriptionClient = createSubscriptionObservable(
        ws_url, // GraphQL endpoint
        gql_query,                                       // Subscription query
        {}                                                // Query variables
    ).subscribe((eventData)=>{
        func_cb(eventData);
    },(err)=>{
        if (func_err) {
            func_err(err)
        }
    });
}
//subtest();

module.exports.CustomSubscribe = CustomSubscribe;