import React from 'react';
import { Input, Select } from 'antd';
import { countryData } from '../constants';

const addressCard = (renderField, renderOptions) => {
  const countryOptions = renderOptions(countryData);

  return (
    <div>
      {renderField({
        label: 'Address line',
        name: 'address',
        control: <Input />
      })}

      {renderField({
        label: 'Address line 2 / Soum',
        name: 'address2',
        optional: true,
        control: <Input />
      })}

      {renderField({
        label: 'Address line 3',
        name: 'address3',
        optional: true,
        control: <Input />
      })}

      {renderField({
        label: 'Postcode or zipcode',
        name: 'zipCode',
        optional: true,
        control: <Input type="number" />
      })}

      {renderField({
        label: 'Town/City/Aimag',
        name: 'townOrCity',
        control: <Input />
      })}

      {renderField({
        label: 'County/state/province',
        name: 'province',
        control: <Input />
      })}

      {renderField({
        label: 'Country',
        name: 'country',
        control: (
          <Select
            showSearch
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {countryOptions}
          </Select>
        )
      })}
    </div>
  );
};

export default addressCard;
