import { store } from "expo-router/build/global-state/router-store";
import { fetchAPI } from ".";
import * as actionCreators from './actions';

const SESSION_TIMEOUT_THRESHOLD = 300; // 5 min refresh
let sessionTimeout = null;

function clearSession() {
    clearTimeout(sessionTimeout);
    store.dispatch(actionCreators.update(initialState));
}

function setSessionTimeout(duration) {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(refreshToken, (duratoin - SESSION_TIMEOUT_THRESHOLD) * 1000)
}

function onRequestSuccess(response) {
    const tokens = response.tokens.reduce((prev, item) => ({
        ...prev,
        [item.type]: item,
    }), {});
    store.dispatch(actionCreators.update({tokens, user: response.user}));
    setSessionTimeout(tokens.access.expiresIn);
}

export function authenticate(email, password) {
    fetchAPI(endPoints.authenticate, {}, "post", {
        Authorization: `Basic ${new Buffer(`${email}:${password}`).toString("base64")}`
    }).then(onRequestSuccess);
}

export function refreshToken() {
    const session = selectors.get();

    if (!session.tokens.refresh.value || !session.user.id) {
        return Promise.reject();
    }

    return refresh(session.tokens.refresh, session.user).then(onRequestSuccess);
}

export function revoke() {
    const session = selectors.get();
    return revoke(Object.keys(session.tokens).map((tokenKey) => ({
        type: session.tokens[tokenKey].type,
        value: session.tokens[tokenKey].value
    }))).then(clearSession)
}

export function autoLogin() {
    session.refreshToken()
    .then(() => {
        this.setState({initialRoute: routeStack[3]});
    }).catch(() => {
        this.setState({intialRoute: routeStack[0]});
    })
}