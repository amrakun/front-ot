import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import gql from 'graphql-tag';

import client from 'apolloClient';
import queries from '../graphql';

export default class LogModalContent extends React.Component {
  constructor() {
    super();

    this.buildListFromObject = this.buildListFromObject.bind(this);

    this.state = {
      fieldNames: [],
    };
  }

  buildListFromArray(array = []) {
    const list = [];

    array.forEach((elem, index) => {
      if (typeof elem !== 'object') {
        list.push(<li key={Math.random()}>{elem.toString()}</li>);
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
    const { fieldNames } = this.state;
    const list = [];
    const names = obj ? Object.getOwnPropertyNames(obj) : [];

    for (const name of names) {
      const field = obj[name];
      const mappedName = fieldNames.find(fn => fn.name === name);
      let label = name;

      if (mappedName && mappedName.label) {
        label = mappedName.label;
      }

      // exclude package specific __v & _id & uid fields
      if (!(name === '__v' || name === '_id' || name === 'uid')) {
        let item = (
          <li key={name}>
            <span className="field-name">{label}:</span>
            <span className="field-value">{String(field)}</span>
          </li>
        );

        if (typeof field === 'object') {
          if (Array.isArray(field)) {
            item = this.buildListFromArray(field);

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
      } // end unnecessary atr checking
    } // end for loop

    return list;
  }
  /**
   * Reads a stringified json and builds a list using its attributes.
   * @param {string} jsonString A stringified JSON object
   */
  prettyJSON(jsonString) {
    let list = [];

    if (jsonString) {
      const clean = jsonString.replace('\n', '');
      const parsed = JSON.parse(clean);

      if (typeof parsed === 'object') {
        list = this.buildListFromObject(parsed);
      }

      if (Array.isArray(parsed)) {
        list = this.buildListFromArray(parsed);
      }
    }

    return <ul>{list}</ul>;
  }

  renderLeftSide(log) {
    let label = '';
    let content;

    if (log && log.action) {
      switch (log.action) {
        case 'create':
          return null;
        case 'update':
          label = 'Unchanged fields';
          break;
        case 'delete':
          label = 'Old data';
          break;
        default:
          break;
      }

      content = (
        <Col sm={12}>
          <span>{label}</span>
          <div>{this.prettyJSON(log.unchangedData)}</div>
        </Col>
      );
    }

    return content;
  }

  renderRightSide(log) {
    let label = '';
    let content;

    if (log && log.action) {
      switch (log.action) {
        case 'create':
          label = 'New data';
          break;
        case 'update':
          label = 'Changed fields';
          break;
        case 'delete':
          return null;
        default:
          break;
      }

      content = (
        <Col sm={12}>
          <span>{label}</span>
          {this.prettyJSON(log.newData)}
        </Col>
      );
    }

    return content;
  }

  /**
   * Renders changed, unchanged, added & removed data as html list.
   * @param {Object} data Data
   * @param {string} label Label to display
   */
  renderData(data, label) {
    return data ? (
      <>
        <span>{label}</span>
        {this.prettyJSON(data)}
      </>
    ) : null;
  }

  render() {
    const { log } = this.props;

    return log ? (
      <Row>
        {this.renderLeftSide(log)}
        <Col sm={12}>
          {this.renderData(log.changedData, 'Changed fields')}
          {this.renderData(log.addedData, 'Added fields')}
          {this.renderData(log.removedData, 'Removed fields')}
        </Col>
      </Row>
    ) : null;
  }

  componentDidMount() {
    const { log } = this.props;

    if (log && log.type) {
      client
        .query({
          query: gql(queries.getDbFieldLabels),
          variables: { type: log.type },
          fetchPolicy: 'network-only',
        })
        .then(({ data }) => {
          const result = data.getDbFieldLabels;

          this.setState({ fieldNames: result });
        });
    }
  }
}

LogModalContent.propTypes = {
  log: PropTypes.object,
};
