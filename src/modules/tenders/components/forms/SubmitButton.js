import React from 'react';
import { Button, Popconfirm } from 'antd';

const button = ({ onConfirm, __ }) => {
  return (
    <Popconfirm title={__('Are you sure ?')} onConfirm={onConfirm}>
      <Button type="primary" size="large" className="margin">
        Send
      </Button>
    </Popconfirm>
  );
};

export default button;
