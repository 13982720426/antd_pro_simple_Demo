import {getTodoLists} from '@/services/todo';
import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {Avatar, Menu, Spin, Badge} from 'antd';
import React from 'react';
import {history, connect} from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

class AvatarDropdown extends React.Component {
  state = {todoName: 0};
  async componentDidMount() {
    //方法一：发送请求获取数据
    // //获取todoList数据
    // const todoList = await getTodoLists();
    // //筛选待完成的数据
    // const todoNum = todoList.filter(item => item.status === 0).length;
    // //修改状态
    // this.setState({todoNum});

    //方法二：使用model获取数据
    const {dispatch} = this.props;
    dispatch({
      type: 'todo/getTodoLists',
      payload: null,
    });
  }

  onMenuClick = event => {
    const {key} = event;

    if (key === 'todo') {
      history.push('/todo');
      return;
    }

    if (key === 'logout') {
      const {dispatch} = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }
      return;
    }
    history.push(`/account/${key}`);
  };

  render() {
    const {todoList} = this.props.todo;
    const todoNum = todoList.filter(item => item.status === 0).length;

    const {
      currentUser = {
        avatar: '',
        name: '',
      },
      menu,
    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}

        <Menu.Item key="todo">
          <UnorderedListOutlined />
          待办事项
          <Badge count={todoNum} offset={[10, 0]} />
        </Menu.Item>

        <Menu.Item key="logout">
          <LogoutOutlined />
          退出登录
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" />
          <span className={`${styles.name} anticon`}>
            {currentUser.name}
            <Badge count={todoNum} dot={true} />
          </span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({user, todo}) => ({
  currentUser: user.currentUser,
  todo,
}))(AvatarDropdown);
