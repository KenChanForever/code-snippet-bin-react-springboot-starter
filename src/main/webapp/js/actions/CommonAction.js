const server = '.';

const defaultHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const get = function (url) {
  return fetch(`${server}/${url}`, {
    method: 'get',
    headers: defaultHeaders,
  });
};

export const post = function (url, postData) {
  return fetch(`${server}/${url}`, {
    method: 'post',
    headers: defaultHeaders,
    body: JSON.stringify(postData),
  });
};

export const deleteMethod = function (url) {
  return fetch(`${server}/${url}`, {
    method: 'DELETE',
    headers: defaultHeaders,
  });
};

