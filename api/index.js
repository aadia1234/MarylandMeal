import fetchival from 'fetchival';
import _ from 'lodash';
import * as sessionSelectors from 'MobileApp/src/services/session/selectors';
import apiConfig from './config';

export function fetchAPI(endPoint, payload = {}, method = "get", headers = {}) {
    const token = sessionSelectors.get().tokens.access.value;
    return fetchival(`${apiConfig.url}${endPoint}`, {
        headers: _.pickBy({
            ...(token ? {
                Authorization: "Bearer ${token}",
            } : {
                "Client-ID": apiConfig.clientID
            }),
            ...headers
        }, (item) => !_.isEmpty(item))
    })[method.toLowerCase()](payload);
}