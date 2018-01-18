/*eslint-disable max-len, react/no-unescaped-entities*/
import React from 'react';

const labels = {
  //supplier profile
  type: {
    title: 'Type',
    desc: 'Specify if the company Southgobi, National or International (Tier 1)'
  },
  ownership: {
    title: 'Ownership',
    desc: 'Specify legal owner/owners of the business'
  },
  shareholder: {
    title: 'Shareholder',
    desc:
      'Specify number shareholders, names, percentages, attach company charter'
  },
  numberOfEmployees: {
    title: 'Number of employees',
    desc: 'Specify number of employees verified by social insurance report '
  },
  otExperience: {
    title: 'OT experience',
    desc:
      'Year of cooperation, supplied products & services, recognition by OT if any'
  },
  sqaResult: {
    title: 'SQA result',
    desc: 'If audited by OT, audit results etc.'
  },
  sotri: {
    title: 'Share of OT related income in total income (SOTRI)',
    desc: 'SOTRI= (Income from OT/Total income)*100'
  },
  sotie: {
    title: 'Specify legal owner/owners of the business',
    desc: 'SOTIE= (OT induced employment/Total employment)*100'
  },

  //Core HSEQ
  doesHaveHealthSafety: {
    title:
      '1. Does the organisation have a Health Safety & Environment management system? ',
    desc: (
      <div>
        <ol>
          <li>
            The system is maintained and is reviewed by management on a regular
            basis (min Annual review)
          </li>
          <li>The CEO has signed off the system.</li>
        </ol>
        <strong>The System should include policies committing to:</strong>
        <ol>
          <li>
            The prevention of incidents that may lead to: injuries, illnesses,
            pollution, property and environmental damage, security threats,
            process losses and product quality impacts.
          </li>
          <li>
            Compliance with legal and other requirements, including
            international accords, standards and external requirements to which
            Rio Tinto (Oyu Tolgoi) subscribes.
          </li>
          <li>The effective management of HSE[Q] risks.</li>
          <li>Adopting continual improvement practices in key HSE[Q] areas</li>
          <li>
            Establishing measurable objectives and targets for improving HSE[Q]
            performance.
          </li>
          <li>
            Providing the resources needed to meet performance objectives.
          </li>
          <li>
            Encouraging employee consultation, participation and promoting
            employee awareness of HSE[Q] threats and opportunities.
          </li>
          <li>Meeting customer requirements.</li>
          <li>
            Respecting the standards of conduct defined in the The way we work
            (copy to be provided to contractor).
          </li>
        </ol>
      </div>
    )
  },
  doesHaveDocumentedPolicy: {
    title:
      '2. Does the organisation have a documented drug and alcohol policy?',
    desc:
      'The policy must prohibit affected persons from conducting work at sites. It is to include prescribed limits, which can if required, be aligned to the site/s requirement. Commitment to meet site requirements. The policy is published and included in the induction process. '
  },
  doesPerformPreemployment: {
    title:
      '3. Does the organisation perform pre-employment medical screening, fitness for work evaluations, background checks and verification of competence for employees, contractors and sub-contractors?',
    desc: `There must be a procedure that requires pre-employment medicals and re-assessment in accordance with legislation prior to the commencement of the contractor performing work. The frequency of ongoing assessments/ surveillance medicals must be inline with regional legislation. `
  },
  doWorkProceduresConform: {
    title: `4. Do the organisations work procedures conform to local statutory, legislative or regulatory codes and standards?`,
    desc: (
      <div>
        <p>
          Legislative and regulatory codes are product/region specific. if yes,
          confirm through the provision of examples of procedures pertaining to
          the work you are completing. Preferably commentary to outline how they
          ensure they are compliant with regulatory codes and standards.
        </p>
        <strong>
          Within Rio Tinto (Oyu Tolgoi) where the supplier performs hazardous
          work they are to provide a copy of their procedures. Hazardous work
          includes but is not limited to:
        </strong>
        <ol>
          <li>Works at height</li>
          <li>Works in confined spaces</li>
          <li>Works on electrical installations</li>
          <li>Works in explosion risks areas</li>
          <li>Hot Work</li>
          <li>Work with or testing high pressure equipment</li>
          <li>Work with cranes and lifting equipment</li>
          <li>Excavations/Penetrations</li>
          <li>Works conducted by isolated workers</li>
          <li>Mobile equipment's/fixed plant</li>
          <li>Vehicle and driving</li>
          <li>Work with hazardous substances/materials</li>
          <li>Working over or near water</li>
          <li>Working near a roadway or railway.</li>
        </ol>
      </div>
    )
  },
  // TODO: add new field
  doesHaveFormalProcessForHse: {
    title:
      '5. Does the organisation have a formal process for HSE induction and orientation of new hire employees, contractors and sub-contractors?',
    desc: `The induction is presented to sub-contractors, contractors and employees and includes an overview of the HSE policy, advising of HSE hazards and controls. Induction must be executed prior to the resource commencing active work.`
  },
  doesHaveTrackingSystem: {
    title: `6. Does the organisation have a system or process for tracking current employee, contractor and sub-contractor qualifications and competencies?`,
    desc: `There must be a documented process describing where and how training is recorded and maintained. Procedures ensuring personnel working on site are aware and trained, prior to commencing work.`
  },
  doesHaveValidIndustry: {
    title:
      '7. Does the organisation have valid industry certifications and/or licenses if required by the type of services provided?',
    desc: `Procedures in place to ensure the organisations certifications and licenses remain current. Company is required to provide a  current copy of the appropriate  licenses.`
  },
  doesHaveFormalProcessForReporting: {
    title:
      '8. Does the organisation have a formal process for reporting and investigating incidents (including near-hits/near misses)?',
    desc: (
      <div>
        <p>
          The companies formal process includes identification of the root
          cause.
        </p>
        <p>
          The company monitors key operational parameters in order to anticipate
          and reduce the likelihood and consequences of HSE incidents and upsets
          - including (Material accidents; near-misses, incidents)
        </p>
        <p>The company has a procedure for accident analysis.</p>
        <p>
          The company has a process for reporting and following up on the
          corrective actions and reporting on level of closure for each
          corrective action identified.
        </p>
        <strong>
          Definition of Incident (As per HSE Glossary on HSEC Community Page):
        </strong>
        An incident is a single event or continuous / repetitive series of
        events that results in, or could have resulted in, one or more of the
        following impacts: >an occupational injury or illness; >damage to
        physical assets (eg plant & equipment), the environment, process,
        product or reputation; >disruption to a community; >exposure to legal
        liability; >security threat. It is evaluated both by its Acutal
        Consequence, and its Maximum Reasonable Outcome for each area of impact.
      </div>
    )
  },
  doesHaveLiabilityInsurance: {
    title:
      '9. Does the organisation have Liability insurance which meets Oyu Tolgoi’s minimum requirements and valid worker compensation insurance or enrolment in an applicable occupational injury/illness insurance programme? ',
    desc: `Review Oyu Tolgoi's insurance requirements. Ensure a current certificate is attached. `
  },

  doesHaveFormalProcessForHealth: {
    title: `10. Does the organisation have a formal process for Health Safety and Environmental risk management `,
    desc: `The company has a procedure for HSE risk management. The process references Environmental and Heath risk management as well as safety risk management.`
  },

  //Human resource management
  workContractManagement: {
    title: '1. Work Contract Management',
    desc: `Is there a current signed work contract for all types of employees (Skilled/unskilled manufacturing employees, Temporary employees, Young workers)?`,
    options: [
      { value: 0, text: `No contract signed.` },
      { value: 1, text: `Contract signed according to local requirements.` },
      {
        value: 2,
        text: `No work occurs before a contract is in place. Evidence for at least 3 years.`
      }
    ]
  },
  jobDescriptionProcedure: {
    title: '2. Job Description Procedure',
    desc: `Does the Company have a job description procedure in place? Does this take HSE into consideration?`,
    options: [
      { value: 0, text: `No approach in place` },
      {
        value: 1,
        text: `The defined approach is running for all of the jobs and includes HSE capabilities`
      },
      {
        value: 2,
        text: `The approach mirrors RT (OT) standards (any new role to be benchmarked against other roles within the organisation) or data/documentation for at least the last 3 years exists. An improvement process is in place.`
      }
    ]
  },
  trainingDevelopment: {
    title: '3. Training and Development Policy',
    desc: `Does the Company have a training & development policy to improve their employee's skills (in line with their job descriptions)?`,
    options: [
      { value: 0, text: `No system` },
      { value: 1, text: `A defined system is running` },
      {
        value: 2,
        text: `The system mirrors the RT system (i.e. specific and dedicated budget per employee, followed and monitored). The system is in place for at least 3 years and has been improved.`
      }
    ]
  },
  employeePerformanceManagement: {
    title: '4. Employee Performance Management',
    desc: `Is there a procedure related to employee performance evaluation criteria? Please provide at least one example relative to HSE criteria`,
    options: [
      {
        value: 0,
        text: `No evaluation criteria set for the assessment of employee performance (only subjective assessment)`
      },
      {
        value: 1,
        text: `Assessment of employees implemented with pre-determined criteria on a regular basis`
      },
      {
        value: 2,
        text: `Results are formally captured once a year and informally as required within the year. There is a follow up across the year of the employee performance.`
      }
    ]
  },
  timeKeepingManagement: {
    title: '5. Time-Keeping Management',
    desc: `Does the company have a time-keeping management system (including overtime), a procedure to ensure employees are compensated and record-keeping requirements meet local legislation?`,
    options: [
      { value: 0, text: `No process to capture working time` },
      {
        value: 1,
        text: `Existing process and monthly employee confirmation in place`
      },
      {
        value: 2,
        text: `Existing process automated to capture working time, wied for at least 3 years to ensure improvements.`
      }
    ]
  },
  managementOfPractises: {
    title: '6. Management of Practices related to conduct',
    desc: `Are there any policies that relate to performance and employee conduct practices? (Incl. disciplinary, anti-discrimination process, etc.)?`,
    options: [
      { value: 0, text: `No company policy` },
      {
        value: 1,
        text: `Policy exists regarding performance and conduct with systematic monitoring.`
      },
      {
        value: 2,
        text: `Training materials exist for all employees. Training of employees carried out regarding performance and expected conduct practices. At least for the last 3 years to ensure improvements`
      }
    ]
  },
  managementOfWorkforce: {
    title: '7. Management of workforce engagement',
    desc: `Does the company have a process or framework to support the active engagement (feedback, up and down communication) of their workforce, for example a procedure/tool which covers awards, collective agreements and contracts.`,
    options: [
      { value: 0, text: `No process or framework` },
      { value: 1, text: `Existing process or framework.` },
      {
        value: 2,
        text: `Evidence of regular communication (quarterly). And for at least 3 years to ensure improvements.`
      }
    ]
  },
  employeeAwareness: {
    title: '8. Employee Awareness of their rights to association',
    desc: `Are employees made aware of their rights to association and representation?`,
    options: [
      {
        value: 0,
        text: `No union or alternate means of employee representation / Worker representatives are not allowed to carry out their duties within working hours without losing pay.`
      },
      {
        value: 1,
        text: `Regular meetings with trade unions or their worker's committees representative are held`
      },
      {
        value: 2,
        text: `Employee representation is authorised and organisations for worker representation exist (eg independent trade union, workers committee, health and safety committees). This is in place for at least the last 3 years`
      }
    ]
  },
  employeeSelection: {
    title: '9. Employee selection and  recruitment process',
    desc: `Are there any policies and procedures that relate to employee selection and recruitment process? `,
    options: [
      { value: 0, text: `No written policy/procedure` },
      {
        value: 1,
        text: `Written procedure/process exists regarding employee recruitment and selection`
      },
      {
        value: 2,
        text: `The procedure/process mirrors the OT (RT) system. The system is in place for at least 3 years and has been improved`
      }
    ]
  },
  employeeExitManagement: {
    title: '10. Employee exit management',
    desc: `Does the company have a procedure related to employee labor contract termination and retrenchment (including collective redundancy case) `,
    options: [
      { value: 0, text: `No system` },
      {
        value: 1,
        text: `Evidence that systems are in place to ensure all proper processes occur to exit an employee`
      },
      {
        value: 2,
        text: `Evidence that in the event of redundancies efforts have been made to redeploy employees. The system mirrors the OT (RT) system.`
      }
    ]
  },
  grievanceAndFairTreatment: {
    title: '11. Grievance and Fair treatment ',
    desc: `Does the company have employee grievance/complaint and fair treatment policy and procedure?  (OT SPEAK-OUT programme etc.)`,
    options: [
      { value: 0, text: `No system` },
      { value: 1, text: `Existing policy and procedure.` },
      {
        value: 2,
        text: `Evidence that raised issues have been investigated and closed with employees. The system mirrors the OT (RT) system and is inducted to employees. And that is in place for at least 3 years and has been improved.`
      }
    ]
  },

  //Business integrity
  doesHavePolicyStatement: {
    title: `1. Does your company have in place a policy statement or code of conduct relating to the Business Integrity and Ethics?`,
    desc: `If yes, please send us a copy of your Business Integrity policy or code of conduct. The policy must be approved by a senior management and introduced to the employees at least annually.`
  },
  ensureThroughoutCompany: {
    title: `2. Are there processes and procedures in place to ensure that your policies or codes of conduct are effectively implemented throughout your company?`,
    desc: `Please list all that apply to your company in the supplier answer column. If you have included 'others' then please specify. `
  },
  ensureThroughoutSupplyChain: {
    title: `3. Are there processes and procedures in place to ensure that your policies or codes of conduct are effectively implemented throughout your Supply Chain?`,
    desc: `Please list all that apply to your company in the supplier answer column. If you have included 'others' then please specify. Please provide examples of your standard supplier contracts. `
  },
  haveBeenSubjectToInvestigation: {
    title: `4. Has your company been subject to any external investigation regarding corruption within the past five years?`,
    desc: (
      <div>
        <strong>"Corruption" includes but is not limited to: </strong>
        <ul>
          <li>Bribery of government officials</li>
          <li>Bribery of public officials, Commercial bribery</li>
          <li>Falsification of the company books and records</li>
          <li>Dealing with government intermediaries</li>
          <li>Improper charitable contributions</li>
          <li>Improper travels and hospitality</li>
          <li>Improper gifts and entertainment</li>
          <li>Improper resolution of conflicts of interest</li>
          <li>Involvement in any Cartel or other form of market rigging</li>
        </ul>
        If yes, please provide details, including key dates and outcomes in
        supplier comment column.
      </div>
    )
  },
  //
  doesHaveDocumentedPolicyToCorruption: {
    title: `5. Does your company have a documented policy in place to prevent corruption? `,
    desc: `If yes, please provide a copy of your Anti-Corruption Management policy.`
  },
  whoIsResponsibleForPolicy: {
    title: `6. If yes to above question, who is responsible person/function for the compliance/anti-corruption program`,
    desc: `Please write down the responsible person/function name in supplier answer column.`
  }
};

export { labels };
