const logsWriteTenderLog = `
mutation logsWriteTenderLog($tenderId: String!, $action: String!, $description: String) {
  logsWriteTenderLog(tenderId: $tenderId, action: $action, description: $description) {
    _id
  }
}
`;

export default { logsWriteTenderLog };
