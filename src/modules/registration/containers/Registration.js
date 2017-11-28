import React from 'react'
import { RegistrationForms } from '../components';

const companyInfoMockData = {
  "isExisting": "1",
  "companyName": "NMMA",
  "address": "BGD, 7-r Khoroo",
  "city": "Ulaanbaatar",
  "state": "Ulaanbaatar",
  "zipcode": "97678",
  "country": "mongolia",
  "countryRegistered": "mongolia",
  "aimag": "0",
  "soum": "0",
  "isChinese": "1",
  "sactionsCountry": "2",
  "structure": "1",
  "registrationNumber": "8989898",
  "upload": [
    {
      "name": "gerege_58_4.sql",
      "size": 183485,
      "type": "application/sql",
      "thumbUrl": "thumburl"
    }
  ],
  "website": "www.nmma.co",
  "email": "khangarid.d@nmma.co",
  "foreignPercentage": "2",
  "employees": "1",
  "employeesMongolian": "2",
  "employeesUmnugovi": "1"
}

class Registration extends React.Component {
  render() {
    return (
      <RegistrationForms data={companyInfoMockData} />
    )
  }
}

export default Registration;
