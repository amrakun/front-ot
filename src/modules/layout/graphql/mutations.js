const logsWrite = `
  mutation logsWrite($apiCall: String!) {
    logsWrite(apiCall: $apiCall)
  }
`;

export default {
  logsWrite
};
