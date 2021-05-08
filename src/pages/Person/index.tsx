import React, {useRef} from 'react';
import {PlusOutlined, EllipsisOutlined} from '@ant-design/icons';
import {Button, Tag, Space, Menu, Dropdown} from 'antd';
import type {ProColumns, ActionType} from '@ant-design/pro-table';
import ProTable, {TableDropdown} from '@ant-design/pro-table';
import request from 'umi-request';
import {PageContainer} from '@ant-design/pro-layout';
import {getPerson} from '@/services/person';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    hideInSearch: true,
  },
];

const personList = async () => {
  //发起请求获取数据
  const data = await getPerson();
  return {data};
};

const Person = () => {
  const actionRef = useRef();

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        actionRef={actionRef}
        request={async (params = {}) => personList()}
        editable={{
          type: 'multiple',
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
        }}
      />
    </PageContainer>
  );
};

export default Person;
