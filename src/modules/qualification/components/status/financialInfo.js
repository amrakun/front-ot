import React from 'react';
import moment from 'moment';
import { dateFormat } from 'modules/common/constants';
import { renderFile } from './utils';

const generateItems = ({ companyInfo }) => {
  const financialInfo = companyInfo.financialInfo || {};

  let items = ['canProvideAccountsInfo'];

  if (financialInfo.canProvideAccountsInfo) {
    items = [
      ...items,
      'currency',
      'preTaxProfit',
      'annualTurnover',
      'totalAssets',
      'totalCurrentAssets',
      'totalShareholderEquity',
      'recordsInfo',
    ];
  }

  items = [...items, 'isUpToDateSSP', 'isUpToDateCTP'];

  return items;
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

  if (item === 'canProvideAccountsInfo') {
    description = 'false';

    if (financialInfo.canProvideAccountsInfo) {
      description = financialInfo.reasonToCannotNotProvide;
    }
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
    description = (value || []).map((v, i) => {
      return (
        <div key={i}>
          <span>date: {moment(new Date(v.date)).format(dateFormat)}</span>
          <br />
          {renderFile(v.file)}
          <br />
        </div>
      );
    });
  }

  return description;
};

export default {
  generateItems,
  renderDescription,
};
