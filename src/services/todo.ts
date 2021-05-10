import request from '@/utils/request';

/**
 * 获取所以TodoLists
 */
export const getTodoLists = async () => {
  return request('/api/todolists');
};
