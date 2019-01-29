import React from 'react';
import moment from 'moment';
import { readFileUrl } from 'modules/common/utils';
import { dateFormat } from 'modules/common/constants';

const generateItems = () => {
  return [
    'canProvideAccountsInfo',
    'reasonToCannotNotProvide',
    'currency',
    'annualTurnover',
    'preTaxProfit',
    'totalAssets',
    'totalCurrentAssets',
    'totalShareholderEquity',
    'recordsInfo',
    'isUpToDateSSP',
    'isUpToDateCTP',
  ];
};

const renderYearAmount = value => {
  return (value || []).map((v, i) => (
    <div key={i}>
      <span>year: {v.year}</span>
      <br />
      <span>amount: {v.amount}</span>
      <br />
    </div>
  ));
};

const renderDescription = props => {
  const { item, companyInfo } = props;
  const financialInfo = companyInfo.financialInfo || {};
  const value = financialInfo[item];

  let description;

  if (typeof value === 'string') {
    description = value;
  }

  if (typeof value === 'boolean') {
    description = value.toString();
  }

  if (
    [
      'annualTurnover',
      'preTaxProfit',
      'totalAssets',
      'totalCurrentAssets',
      'totalShareholderEquity',
    ].includes(item)
  ) {
    description = renderYearAmount(value);
  }

  if (item === 'recordsInfo') {
    description = (value || []).map((v, i) => (
      <div key={i}>
        <span>date: {moment(new Date(v.date)).format(dateFormat)}</span>
        <br />

        <span>
          file:
          <a href={readFileUrl(v.file.url)} target="__blank">
            {v.file.name}
          </a>
        </span>
        <br />
      </div>
    ));
  }

  return description;
};

export default {
  generateItems,
  renderDescription,
};
