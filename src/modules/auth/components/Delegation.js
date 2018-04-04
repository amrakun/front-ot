import React from 'react';
import { withRouter } from 'react-router';
import { Form, Select, Card, Col, DatePicker, Icon, Input } from 'antd';
import { BaseForm } from 'modules/common/components';
import { dateTimeFormat } from 'modules/common/constants';

class Delegation extends BaseForm {
  constructor(props) {
    super(props);

    this.state = {
      selectedUser: null,
      searchValue: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.clearSearch = this.clearSearch.bind(this);

    this.props.searchUser();
  }

  handleSubmit(e) {
    e.preventDefault();

    const { form, delegate } = this.props;

    form.validateFields((err, values) => {
      if (!err) {
        delegate({
          userId: this.state.selectedUser._id,
          reason: values.reason,
          startDate: values.date[0],
          endDate: values.date[1]
        });
      }
    });
  }

  handleSearch(searchValue) {
    this.setState({ searchValue });
    this.props.searchUser(searchValue);
  }

  handleSelect(value) {
    const selectedUser = JSON.parse(value);

    this.setState({ selectedUser });
  }

  clearSearch() {
    this.setState({ selectedUser: null, searchValue: '' });
  }

  renderUserInfo() {
    const { selectedUser } = this.state;

    return (
      <div>
        <p>
          First name: <strong>{selectedUser.firstName}</strong>
        </p>
        <p>
          Email: <strong>{selectedUser.email}</strong>
          <a onClick={this.clearSearch}>
            <Icon type="close-circle" style={{ marginLeft: '5px' }} />
          </a>
        </p>
      </div>
    );
  }

  renderUserSearch() {
    const { usersResult } = this.props;
    const { searchValue } = this.state;

    return (
      <Select
        mode="combobox"
        placeholder="Search user by name"
        showArrow={false}
        value={searchValue}
        filterOption={false}
        onChange={this.handleSearch}
        onSelect={this.handleSelect}
        style={{ marginBottom: '24px' }}
      >
        {usersResult.map(
          user =>
            !user.isSupplier && (
              <Select.Option key={JSON.stringify(user)}>
                {user.firstName || user.email}
              </Select.Option>
            )
        )}
      </Select>
    );
  }

  render() {
    const { selectedUser } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Col lg={{ span: 12, offset: 6 }} xl={{ span: 10, offset: 7 }}>
          <Card>
            {selectedUser ? this.renderUserInfo() : this.renderUserSearch()}

            {this.renderField({
              label: 'Duration',
              name: 'date',
              control: (
                <DatePicker.RangePicker showTime format={dateTimeFormat} />
              )
            })}

            {this.renderField({
              label: 'Delegation reason',
              name: 'reason',
              control: <Input.TextArea />
            })}

            {this.renderSubmit('Delegate', this.handleSubmit)}
          </Card>
        </Col>
      </Form>
    );
  }
}

const DelegationForm = Form.create()(Delegation);

export default withRouter(DelegationForm);
