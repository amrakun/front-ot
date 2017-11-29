import React from 'react'
import { RegistrationForms } from '../components';

const company = {
  "isExisting": "1",
  "companyName": "NMMA",
  "address": "BGD, 7-r Khoroo",
  "city": "Ulaanbaatar",
  "state": "Ulaanbaatar",
  "zipcode": "97678",
  "country": "0",
  "countryRegistered": "0",
  "aimag": "0",
  "soum": "0",
  "isChinese": "1",
  "sactionsCountry": "0",
  "structure": "1",
  "registrationNumber": "8989898",
  // "upload": [
  //   {
  //     "name": "gerege_58_4.sql",
  //     "size": 183485,
  //     "type": "application/sql",
  //     "thumbUrl": "thumburl"
  //   }
  // ],
  "website": "www.nmma.co",
  "email": "khangarid.d@nmma.co",
  "foreignPercentage": "2",
  "employees": "1",
  "employeesMongolian": "2",
  "employeesUmnugovi": "1"
}

const contact = {
  "name": "Khangarid",
  "jobTitle": "Director",
  "address": "BGD 7-r khoroo",
  "city": "Ulaanbaatar",
  "state": "Ulaanbaatar",
  "zipcode": "97678",
  "country": "0",
  "phone": "97699997878",
  "email": "khangarid.d@nmma.co"
}

const management = {
  "managingName": "Manager",
  "managingJob": "Numquam quae assumenda voluptas est nobis veritatis cumque ut placeat nihil tempora",
  "managingPhone": "+824-53-6742342",
  "managingEmail": "zuqi@hotmail.com",
  "executiveName": "Fulton Hampton",
  "executiveJob": "Non officiis pariatur Commodi consequatur Repellendus Laborum et dolorem sint rem architecto",
  "executivePhone": "+436-26-1575271",
  "executiveEmail": "fykube@yahoo.com",
  "salesName": "Ifeoma Vinson",
  "salesJob": "Duis et ut rerum in Nam",
  "salesPhone": "+996-74-5801572",
  "salesEmail": "jizal@hotmail.com",
  "financialName": "Brian Sutton",
  "financialJob": "Reprehenderit rerum enim amet soluta sint maxime asperiores sit necessitatibus exercitationem fugit fuga Autem aute enim",
  "financialPhone": "+255-69-5198329",
  "financialEmail": "tawydog@yahoo.com",
  "member1Name": "Justin Bates",
  "member1Job": "Sed tempora in do enim sint rem sed sint",
  "member1Phone": "+168-44-9410275",
  "member1Email": "quvucase@yahoo.com"
}

const shareholder = {
  "keys": [
    1
  ],
  // "upload": [
  //   {
  //     "name": "gerege_58_4.sql",
  //     "size": 183485,
  //     "type": "application/sql",
  //     "thumbUrl": "thumburl"
  //   }
  // ],
  "name1": "Yuli Carrillo",
  "title1": "Ab pariatur Ea assumenda est magni lorem quam aut velit",
  "share1": "70"
}

const group = {

}

const product = {
  "products": [
    "a10",
    "c12"
  ]
}

const certificate = {
  "isReceived": "1",
  "upload": "",
  "isExisting": "0",
  "cwNumber": "CW49108"
}

class Registration extends React.Component {
  render() {
    return (
      <RegistrationForms
        companyData={company}
        contactData={contact}
        managementData={management}
        shareholderData={shareholder}
        groupData={group}
        productData={product}
        certificateData={certificate}
      />
    )
  }
}

export default Registration;
