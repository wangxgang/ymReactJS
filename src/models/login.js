import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, myFakeAccountLogin } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { setToken, setUserID } from '@/utils/authLocal';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
  },
  effects: {
    *login({ payload }, { call, put }) {
      debugger
      const response = yield call(fakeAccountLogin, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      }); // Login successfully
      debugger

      if (response.status === 'ok') {
        debugger
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    *myLogin({ payload }, { call, put }) {
      debugger
      const response = yield call(myFakeAccountLogin, payload);

      if (response.StatusCode === 200) {
        yield put({
          type: 'changeLoginStatus2',
          payload: response,
        }); // Login successfully
        // setToken(response.data.Detiel[0].access_token)
        debugger
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        history.replace(redirect || '/');
      }
    },

    logout() {
      const { redirect } = getPageQuery(); // Note: There may be security issues, please note

      if (window.location.pathname !== '/myuser/login' && !redirect) {
        history.replace({
          pathname: '/myuser/login',
          search: stringify({
            redirect: window.location.href,
          }),
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      debugger
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type };
    },
    changeLoginStatus2(state, { payload }) {
      debugger
      setToken(payload.Detiel[0].access_token);
      setUserID(payload.Message);
      return { ...state, access_token: payload.Detiel[0].access_token, uID: payload.Message };
    },
  },
};
export default Model;
