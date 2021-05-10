import request from '@/utils/request';

/**
 * 获取所有TodoList
 */
export const getTodoLists = async () => {
  return request('/api/todolists');
};
/**
 * 添加TodoList
 */
export const add = async data => {
  const url = '/api/todo';
  const options = {data};
  return request.post(url, options);
};
