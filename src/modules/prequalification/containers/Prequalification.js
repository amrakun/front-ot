import React from 'react'
import { PrequalificationForms } from '../components';

const financial = {

}
const business = {

}
const environmental = {

}
const health = {

}

class Prequalification extends React.Component {
  render() {
    return (
      <PrequalificationForms
        financialData={financial}
        businessData={business}
        environmentalData={environmental}
        healthData={health}
      />
    )
  }
}

export default Prequalification;
