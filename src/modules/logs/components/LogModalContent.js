import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import moment from 'moment';

/**
 * Removes null, undefined, empty attributes from given object
 * @param {Object} obj Object to check
 * @returns {Object} Flattened object
 */
const flattenObject = (obj = {}) => {
  const flatObject = { ...obj };
  const names = obj ? Object.getOwnPropertyNames(obj) : [];

  for (const name of names) {
    const field = obj[name];
    let empty = false;

    if (typeof field !== 'object') {
      if (field === null || field === undefined || field === '') {
        empty = true;
      }
    }

    if (Array.isArray(field) && field.length === 0) {
      empty = true;
    }

    // checked array above
    if (typeof field === 'object' && !Array.isArray(field)) {
      if (isObjectEmpty(field)) {
        empty = true;
      }
    }

    if (empty) {
      delete flatObject[name];
    }
  } // end for loop

  return flatObject;
};

/**
 * Shorthand empty object checker
 * @param {Object} obj Object to check
 */
const isObjectEmpty = (obj = {}) => {
  return (
    typeof obj === 'object' && obj && Object.keys(obj).length === 0 && obj.constructor === Object
  );
};

// field names used to show properly formatted date values
const DATE_FIELD_NAMES = [
  // company related
  'date',
  'dateOfInvestigation',
  'createdDate',
  'registrationInfoSentDate',
  'prequalificationInfoSentDate',
  'prequalifiedDate',
  'qualifiedDate',
  // tender related
  'updatedDate',
  'publishDate',
  'closeDate',
  'sentDate',
];

export default class LogModalContent extends React.Component {
  constructor(props) {
    super(props);

    this.buildListFromObject = this.buildListFromObject.bind(this);
    this.extraDesc = [];

    if (props.log && props.log.extraDesc) {
      this.extraDesc = JSON.parse(props.log.extraDesc);
    }
  }

  /**
   * Builds an html list from given array
   * @param {Object|string|number[]]} array List of values
   * @param {string} name Field name at database
   */
  buildListFromArray(array = [], name = '') {
    const list = [];

    array.forEach((elem, index) => {
      if (typeof elem !== 'object') {
        let value = elem.toString();

        // Finding mapped name behind id field
        if (this.extraDesc) {
          const found = this.extraDesc.find(item => item[name] === value);

          if (found) {
            value = found.name;
          }
        }

        list.push(<li key={Math.random()}>{value}</li>);
      }

      if (typeof elem === 'object') {
        const sub = this.buildListFromObject(elem);

        list.push(<li key={Math.random()}>{index + 1}:</li>);
        list.push(<ul key={Math.random()}>{sub}</ul>);
      }
    });

    if (list.length > 0) {
      return <ul key={Math.random()}>{list}</ul>;
    }

    return null;
  }

  buildListFromObject(obj = {}) {
    const { fieldLabelMaps } = this.props;
    const flatObject = flattenObject(obj);
    const names = flatObject ? Object.getOwnPropertyNames(flatObject) : [];
    let list = [];

    if (isObjectEmpty(flatObject)) {
      return null;
    }

    for (const name of names) {
      const field = flatObject[name];
      const mappedItem = fieldLabelMaps.find(fn => fn.name === name);

      if (!mappedItem) {
        continue;
      }

      let label = mappedItem.label;
      let value = String(field);

      if (DATE_FIELD_NAMES.includes(name)) {
        value = moment(field).format('YYYY-MM-DD HH:mm');
      }

      if (this.extraDesc) {
        const found = this.extraDesc.find(item => item[name] === value);

        if (found) {
          value = found.name;
        }
      }

      let item = (
        <li key={name}>
          <span className="field-name">{label}:</span>
          <span className="field-value">{value}</span>
        </li>
      );

      if (typeof field === 'object') {
        if (Array.isArray(field)) {
          item = this.buildListFromArray(field, name);

          list.push(
            <li className="field-name" key={Math.random()}>
              {label}:
            </li>
          );

          list.push(item);
        } else {
          const sub = this.buildListFromObject(field);

          item = <li key={Math.random()}>{name}:</li>;

          list.push(
            <li className="field-name" key={Math.random()}>
              {label}:
            </li>
          );

          list.push(<ul key={Math.random()}>{sub}</ul>);
        }
      } else {
        // primary types
        list.push(item);
      }
    } // end for loop

    return list;
  }

  /**
   * Reads a stringified json and builds a list using its attributes.
   * @param {string} jsonString A stringified JSON object
   */
  prettyJSON(jsonString = '') {
    let list = [];
    const clean = jsonString.replace('\n', '');
    const parsed = JSON.parse(clean);

    if (isObjectEmpty(parsed) || !jsonString) {
      return null;
    }

    if (jsonString) {
      if (typeof parsed === 'object' && !Array.isArray(parsed)) {
        list = this.buildListFromObject(parsed);
      }

      if (Array.isArray(parsed)) {
        list = this.buildListFromArray(parsed);
      }
    }

    return <ul>{list}</ul>;
  }

  /**
   * Renders changed, unchanged, added & removed data as html list.
   * @param {Object} data Data
   * @param {string} label Label to display
   * @param {string} cls Css class
   */
  renderData(data, label, cls) {
    return data ? (
      <Col sm={12}>
        <div className={`log-box ${cls}`}>
          <span className={`data-label ${cls}`}>{label}</span>
          {this.prettyJSON(data)}
        </div>
      </Col>
    ) : null;
  }

  render() {
    const { log } = this.props;

    return log ? (
      <>
        <Row>
          {this.renderData(log.oldData, 'Before any changes')}
          {this.renderData(log.addedData, 'Added fields', 'success')}
        </Row>
        <Row>
          {this.renderData(log.changedData, 'Changed fields', 'warning')}
          {this.renderData(log.removedData, 'Removed fields', 'danger')}
        </Row>
      </>
    ) : null;
  }

  componentWillUnmount() {
    this.extraDesc = null;
  }
}

LogModalContent.propTypes = {
  log: PropTypes.object,
  fieldLabelMaps: PropTypes.array,
};
