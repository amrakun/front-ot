import React from 'react';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { UserForm } from '../../containers';
import {
  Table,
  Card,
  Row,
  Col,
  Icon,
  Input,
  Divider,
  Button,
  Form
} from 'antd';

const propTypes = {
  form: PropTypes.object.isRequired,
  users: PropTypes.array,
  history: PropTypes.object,
  user: PropTypes.object,
  addUser: PropTypes.func,
  removeUser: PropTypes.func,
  resetPassword: PropTypes.func
};

class UserList extends React.Component {
  constructor(props) {
    super(props);

    const { history } = props;

    const query = queryString.parse(history.location.search);
    const searchQuery = query.search;

    this.state = {
      search: searchQuery || '',
      users: props.users,
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

    this.columns = [
      {
        title: 'First Name',
        dataIndex: 'firstname',
        key: 'firstname'
      },
      {
        title: 'Last name',
        dataIndex: 'lastname',
        key: 'lastname'
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
            <a onClick={this.editUser.bind(this, record)}>Edit</a>
            <Divider type="vertical" />
            <a onClick={props.removeUser.bind(this, record._id)}>Remove</a>
          </span>
        )
      }
    ];
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
  }

  onClose() {
    this.setState({ showPopup: false });
  }

  render() {
    const { users } = this.props;
    const { search } = this.state;
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
          </Card>
        </Col>
      </Row>
    );
  }
}

UserList.propTypes = propTypes;

export default Form.create()(withRouter(UserList));
