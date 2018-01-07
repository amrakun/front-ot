import React from 'react';
import { Card } from 'antd';

const MainInfo = data => {
  return (
    <Card title={data.name}>
      <div>
        <strong>Tender name: </strong>
        {data.name}
      </div>
      <div>
        <strong>Tender number: </strong>
        {data.number}
      </div>
      <div>
        <strong>Publish date: </strong>
        {data.publishDate}
      </div>
      <div>
        <strong>Close date: </strong>
        {data.closeDate}
      </div>
      <div>
        <strong>Document: </strong>
        {data.file ? data.file.url : ''}
      </div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </Card>
  );
};

export default MainInfo;
