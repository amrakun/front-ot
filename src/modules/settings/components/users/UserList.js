import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {
  Table,
  Card,
  Row,
  Col,
  Icon,
  Input,
  Divider,
  Button,
  Form,
  Popconfirm
} from 'antd';
import { Paginator } from 'modules/common/components';
import { UserForm } from '../../containers';

const propTypes = {
  form: PropTypes.object.isRequired,
  users: PropTypes.array,
  history: PropTypes.object,
  user: PropTypes.object,
  addUser: PropTypes.func,
  totalCount: PropTypes.number,
  removeUser: PropTypes.func,
  resetPassword: PropTypes.func,
  refetchUsers: PropTypes.func,
  numbering: PropTypes.number.isRequired
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);
    const searchQuery = query.search;

    this.state = {
      search: searchQuery || '',
      users: this.props.users,
      currentUser: null,
      showPopup: false,
      showResetPopup: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkConfirm = this.checkConfirm.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.onClose = this.onClose.bind(this);
    this.emitEmpty = this.emitEmpty.bind(this);
    this.removeUser = this.removeUser.bind(this);

    this.columns = [
      {
        title: 'Num',
        key: '_id',
        render: (value, row, index) => (
          <span>{this.props.numbering + index}</span>
        )
      },
      {
        title: 'First Name',
        dataIndex: 'firstName',
        key: 'firstName'
      },
      {
        title: 'Last name',
        dataIndex: 'lastName',
        key: 'lastName'
      },
      {
        title: 'Username',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: 'Email address',
        dataIndex: 'email',
        key: 'email'
      },
      {
        title: 'Phone number',
        dataIndex: 'phone',
        key: 'phone'
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="#edit" onClick={this.editUser.bind(this, record)}>
              Edit
            </a>
            <Divider type="vertical" />
            <Popconfirm
              key={3}
              title="Are you sure you want to remove this user？"
              placement="bottomRight"
              okText="Yes"
              cancelText="No"
              onConfirm={() => this.removeUser(record._id)}
            >
              <a href="#remove">Remove</a>
            </Popconfirm>
          </span>
        )
      }
    ];
  }

  removeUser(id) {
    this.props.removeUser(id);
  }

  handleSearch(value) {
    const { history } = this.props;

    let query = queryString.parse(history.location.search);

    query.search = value;

    history.push({
      search: queryString.stringify(query)
    });
  }

  handleChange(e) {
    this.setState({ search: e.target.value });
  }

  checkPassword(rule, value, callback) {
    const form = this.props.form;

    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }

  editUser(user) {
    this.setState({ showPopup: true, currentUser: user });
  }

  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }

  onSuccess() {
    this.setState({ showPopup: false });
    this.props.refetchUsers();
  }

  onClose() {
    this.setState({ showPopup: false });
  }

  emitEmpty() {
    this.searchInput.focus();
    this.handleSearch('');
    this.setState({ search: '' });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ users: nextProps.users });
  }

  render() {
    const { users, search } = this.state;
    const { totalCount } = this.props;

    const suffix = search ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;

    return (
      <Row gutter={16}>
        <Col span={24}>
          <Card title="Manage Users">
            <div className="table-operations">
              <Input
                value={search}
                prefix={
                  <Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                style={{ width: 200, float: 'left' }}
                placeholder="Search by username"
                onPressEnter={e => this.handleSearch(e.target.value)}
                onChange={this.handleChange}
                suffix={suffix}
                ref={node => (this.searchInput = node)}
                className="users-search"
              />

              <Button onClick={this.editUser.bind(this, null)}>Add User</Button>
              {this.state.showPopup ? (
                <UserForm
                  user={this.state.currentUser}
                  onSuccess={this.onSuccess}
                  onClose={this.onClose}
                />
              ) : null}
            </div>

            <Table
              columns={this.columns}
              rowKey={record => record._id}
              dataSource={users}
            />

            <Paginator total={totalCount} />
          </Card>
        </Col>
      </Row>
    );
  }
}

UserList.propTypes = propTypes;

export default Form.create()(withRouter(UserList));
