import  fakeDataProvider from './fdp'
import buildGraphQLProvider from 'ra-data-graphql';
import ApolloClient from 'apollo-boost';

const myClient = new ApolloClient({
    uri: 'http://localhost:4466/'
  });
var dp_block;
buildGraphQLProvider({ client: myClient })
            .then(dataProvider => 
                dp_block = dataProvider
            );
            
/*export default (type, resource, params) => {
    console.log('resource name:'+resource)
    if(resource=='Block'){
        return dp_block;
    }else
        return fakeDataProvider(type, resource, params);
}*/