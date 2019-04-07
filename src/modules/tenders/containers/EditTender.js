import React from 'react';
import PropTypes from 'prop-types';
import { compose, gql, graphql } from 'react-apollo';
import { RfqForm, EoiForm } from '../components';
import { queries, mutations } from '../graphql';
import { Loading } from 'modules/common/components';
import { alert } from 'modules/common/utils';

class EditContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isSubmitted: false,
    }
  }

  save = doc => {
    const { history, tendersEdit, tenderDetailQuery } = this.props;
    const [publishDate, closeDate] = doc.dateRange;

    const tenderDetail = tenderDetailQuery.tenderDetail || {};
    const { type } = tenderDetail;

    this.setState({ isSubmitted: true });

    tendersEdit({
      variables: {
        ...doc,
        _id: tenderDetail._id,
        publishDate,
        closeDate
      }
    })
      .then(() => {
        this.setState({ isSubmitted: false });
        alert.success('Saved');
        history.push(`/${type}?refetch`);
      })
      .catch(error => {
        this.setState({ isSubmitted: false });
        alert.error(error.message);
      });
  }

  render() {
    const { tenderDetailQuery, buyersQuery } = this.props;

    if (tenderDetailQuery.error) {
      return null;
    }

    if (tenderDetailQuery.loading) {
      return <Loading />;
    }

    const tenderDetail = tenderDetailQuery.tenderDetail || {};
    const { type } = tenderDetail;

    const updatedProps = {
      ...this.props,
      type,
      save: this.save,
      data: tenderDetail,
      buyers: buyersQuery.users || [],
      isSubmitted: this.state.isSubmitted,
    };

    if (type === 'eoi') {
      return <EoiForm {...updatedProps} />;
    }

    return <RfqForm {...updatedProps} />;
  }
};

EditContainer.propTypes = {
  tenderDetailQuery: PropTypes.object,
  buyersQuery: PropTypes.object,
  tendersEdit: PropTypes.func
};

export default compose(
  graphql(gql(queries.tenderUpdateDetail), {
    name: 'tenderDetailQuery',
    options: ({ match }) => {
      return {
        variables: { _id: match.params.id },
        fetchPolicy: 'network-only'
      };
    }
  }),

  graphql(gql(queries.buyers), {
    name: 'buyersQuery',
  }),

  graphql(gql(mutations.tendersEdit), {
    name: 'tendersEdit'
  })
)(EditContainer);
