import request from '@/utils/request';

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function myFakeAccountLogin(params) {
  return request('/api/Home/Login', {
    method: 'POST',
    data: params,
    // requestType: 'form' // 后端请求token需要表单的形式
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
//获取菜单列表
export async function getMenuListByUID(params) {
  // return request('/api/User/GetMenuListByUID', params)
  return request(`/api/User/GetMenuListByUID?uID=${params}`);
  // debugger
  // return request('/api/User/GetMenuListByUID', {
  //   method: 'GET',
  //   data: params
  // });
}
