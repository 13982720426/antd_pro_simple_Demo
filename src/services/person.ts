import requset from '@/utils/request';

export const getPerson = async () => {
  return requset('/api/person');
};
