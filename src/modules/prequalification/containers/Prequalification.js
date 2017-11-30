import React from 'react';
import { PrequalificationForms } from '../components';

const financial = {
  "canProvide": "0",
  "currency": "0",
  "turnoverYear1": "0",
  "turnoverData1": "10000",
  "pretaxYear1": "0",
  "pretaxData1": "15000",
  "assetsYear1": "1",
  "assetsData1": "13000",
  "currentAssetsYear1": "2",
  "currentAssetsData1": "18000",
  "shareholdersYear1": "0",
  "shareholdersData1": "55400",
  "recordDate1": "Thu Nov 30 2017 17:40:56 GMT+0800 (+08)",
  "recordDate2": "Thu Nov 30 2017 17:40:56 GMT+0800 (+08)",
  "recordDate3": "Thu Nov 30 2017 17:40:56 GMT+0800 (+08)",
  "toDateSSp": "0",
  "toDateCTp": "0"
};
const business = {
  "minimumStandards": "0",
  "inPlace": "1",
  "validContracts": "0",
  "canProvide": "15",
  "liability": "0",
  "ethics": "1",
  "socialResp": "0",
  "labourLaws": "0",
  "humanRights": "0",
  "businessInteg": "0",
  "stepsTaken": "Textarea",
  "isInvestigated": "0",
  // TODO: multiple
  "inv1": "Investigation name",
  "invStartDate1": "Thu Nov 30 2017 17:40:56 GMT+0800 (+08)",
  "invStatus1": "Status",
  "invCloseDate1": "Thu Nov 30 2017 17:40:56 GMT+0800 (+08)",
  // TODO: multiple ^
  "PEP": "0",
  "additional": "Textarea"
};
const environmental = {
  "plans": "0",
  "investigated": "0",
  "dateInvestigated": "2017-11-30T11:51:08.847Z",
  "reasons": "Lorem ipsum",
  "actionStatus": "0",
  "convicted": "0",
  "stepsTaken": "Lorem ipsum",
  "additional": "Lorem ipsum"
};
const health = {
  "system": "1",
  "identified": "0",
  "training": "0",
  "PPE": "0",
  "riskAssess": "1",
  "incident": "0",
  "FFW": "0",
  "comply": "1"
  // TODO: multiple project-specific inputs with unknown type, OT-s todruulah
};

class Prequalification extends React.Component {
  render() {
    return (
      <PrequalificationForms
        financialData={financial}
        businessData={business}
        environmentalData={environmental}
        healthData={health}
      />
    );
  }
}

export default Prequalification;
