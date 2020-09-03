import request from '@/utils/request';
import qs from 'querystring'

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function getOrganization() {
  return request('/api/Organization');
}
export async function postPerson(params) {
  return request('/api/Person', {
    method: 'POST',
    data: params,
    // requestType: 'form' //表单的形式
  });
}
export async function getPerson(params) {
  return request(`/api/Person?${qs.stringify(params)}`);
}

//
export async function queryList() {
  return request('/api/list');
}