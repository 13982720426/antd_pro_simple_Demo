import React, {useEffect, useState} from 'react';

import {PageContainer} from '@ant-design/pro-layout';
import {PlusOutlined} from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import {Button, Alert} from 'antd';
import {getTodoLists} from '@/services/todo';

const status = [
  <Alert message="待办" type="info" showIcon />,
  <Alert message="已完成" type="success" showIcon />,
  <Alert message="已取消" type="error" showIcon />,
];

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
    render: (_, record) => {
      return status[record.status];
    },
  },
  {
    title: '修改状态',
    render: () => [<a>待办 </a>, <a>完成 </a>, <a>取消</a>],
  },
];

// const data = [
//   {id: 1, title: 'TodoList列表', status: 0},
//   {id: 2, title: 'TodoList添加', status: 1},
//   {id: 3, title: 'TodoList编辑', status: 2},
//   {id: 4, title: 'TodoList修改状态', status: 0},
// ];

const Todo = () => {
  //   const [data, setData] = useState([]);
  //   useEffect(async () => {
  //     const resData = await getTodoLists();
  //     console.log(resData);
  //     setData(resData);
  //   }, []);

  return (
    <PageContainer>
      <ProTable
        columns={columns}
        rowKey="id"
        search={false}
        // dataSource={data}
        request={async () => ({data: await getTodoLists()})}
        dateFormatter="string"
        headerTitle="待办事项列表"
        toolBarRender={() => [
          <Button type="primary" key="primary">
            <PlusOutlined /> 新建
          </Button>,
        ]}
      />
    </PageContainer>
  );
};

export default Todo;
