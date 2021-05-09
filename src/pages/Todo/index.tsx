import {PageContainer} from '@ant-design/pro-layout';
import React from 'react';
import ProTable from '@ant-design/pro-table';

import {Button} from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '标题',
    dataIndex: 'title',
  },
  {
    title: '状态',
    dataIndex: 'status',
  },
  {
    title: '修改状态',
    render: () => [<a>代办</a>, <a>完成</a>, <a>取消</a>],
  },
];
const Todo = () => {
  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        search={false}
        dateFormatter="string"
        headerTitle="待办事项列表"
        toolBarRender={() => [
          <Button type="primary" key="primary">
            新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Todo;
