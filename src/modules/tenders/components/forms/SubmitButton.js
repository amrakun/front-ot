import React from 'react';
import { Button, Popconfirm } from 'antd';

const button = ({ onConfirm, __, isSubmitted }) => {
  return (
    <Popconfirm title={__('Are you sure ?')} onConfirm={onConfirm}>
      <Button type="primary" size="large" className="margin" disabled={isSubmitted}>
        Send
      </Button>
    </Popconfirm>
  );
};

export default button;
