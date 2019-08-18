const logs = `
query logs(
  $start: String,
  $end: String,
  $userId: String,
  $action: String,
  $page: Int,
  $perPage: Int,
  $type: String,
  $desc: String
) {
  logs(
    start: $start,
    end: $end,
    userId: $userId,
    action: $action,
    page: $page,
    perPage: $perPage,
    type: $type,
    desc: $desc
  ) {
    totalCount

    logs {
      _id
      createdAt
      createdBy
      type
      action
      objectId
      unicode
      description
      addedData
      removedData
      changedData
      unchangedData
      oldData
    }
  }
}
`;

const getDbFieldLabels = `
  query getDbFieldLabels($type: String) {
    getDbFieldLabels(type: $type) {
      name
      label
    }
  }
`;

export default { logs, getDbFieldLabels };
