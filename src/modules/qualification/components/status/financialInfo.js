import React from 'react';
import moment from 'moment';
import { readFileUrl } from 'modules/common/utils';
import { dateFormat } from 'modules/common/constants';

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
  const { item, companyInfo, data } = props;
  const financialInfo = companyInfo.financialInfo || {};
  const value = financialInfo[item];

  let description;

  if (typeof value === 'string') {
    description = value;
  }

  if (typeof value === 'boolean') {
    description = value.toString();
  }

  if (item === 'canProvideAccountsInfo' && !data.canProvideAccountsInfo) {
    description = financialInfo.reasonToCannotNotProvide;
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
      let file;

      if (v.file) {
        file = (
          <span>
            file:
            <a href={readFileUrl(v.file.url)} target="__blank">
              {v.file.name}
            </a>
          </span>
        );
      }

      return (
        <div key={i}>
          <span>date: {moment(new Date(v.date)).format(dateFormat)}</span>
          <br />
          {file}
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
