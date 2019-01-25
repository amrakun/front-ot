import React from 'react';

const List = props => (
  <>
    <h1>logs</h1>
    <pre>{JSON.stringify(props.data, null, 4)}</pre>
  </>
);

export default List;
