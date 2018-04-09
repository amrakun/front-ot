/* eslint-disable max-len, react/no-unescaped-entities*/

import React from 'react';

export function agreementOptions(__) {
  if (!__) __ = () => {};

  const data = [
    {
      label: (
        <span>
          {__(
            '1. We have read and agreed to Oyu Tolgoi\'s (I) "Way we work" and "Supplier Code of conduct". You can visit'
          )}
          <a
            href="http://ot.mn/useful-documents/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            {__('here ')}
          </a>{' '}
          {__('to view these documents and more')}
        </span>
      ),
      value: 0,
      key: 0
    },
    {
      label: __(
        '2. We understand that the Company reserves the right to refuse any document(s) which is incomplete and/or submitted after the specified date.'
      ),
      value: 1,
      key: 1
    },
    {
      label: __(
        '3. We understand the Company will not be responsible for any costs associated with preparing and submitting an Expression of Interest to the Company.'
      ),
      value: 2,
      key: 2
    },
    {
      label: __(
        '4. We understand the Company is only seeking Expression of Interest from potential suppliers and makes no representation or promise in relation to procuring work from a supplier or suppliers.'
      ),
      value: 3,
      key: 3
    },
    {
      label: __(
        "5. Hereby we confirm the submitted information and document(s) are true and authentic and that we understand any false and illegal information and document(s) will result in corrective actions as per related Mongolian laws and Company's policies"
      ),
      value: 4,
      key: 4
    }
  ];

  return data;
}
