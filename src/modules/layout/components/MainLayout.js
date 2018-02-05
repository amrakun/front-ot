import React from 'react';
import Sidenav from './Sidenav';
import Header from './Header';
import Breadcrumb from './Breadcrumb';
import { Layout, BackTop } from 'antd';
import { PropTypes } from 'prop-types';
import { IntlProvider, addLocaleData } from 'react-intl';
import { _t } from '../../common/components';
import mn from 'react-intl/locale-data/mn';
import en from 'react-intl/locale-data/en';
import * as messages from 'modules/translations';
import { injectIntl } from 'react-intl';

addLocaleData([...mn, ...en]);
const { Content, Footer } = Layout;

const visitorPaths = [
  '/sign-in',
  '/register',
  '/expression-of-interest',
  '/confirm-registration',
  '/forgot-password',
  '/reset-password',
  '/'
];

const mergedMessages = {
  ...messages.Registration.CompanyInfo,
  ...messages.Registration.Contact,
  ...messages.Registration.Shareholder,
  ...messages.Registration.ManagementTeam,
  ...messages.Registration.Group,
  ...messages.Registration.Products,
  ...messages.CapacityBuilding,
  ...messages.Common,
  ...messages.Qualification,
  ...messages.Prequalification.BusinessIntegrity,
  ...messages.Prequalification.Enviroment,
  ...messages.Prequalification.Health,
  ...messages.Prequalification.FinancialInfo
};

const withSidebar = { marginLeft: 200 };
const withSidebarCollapsed = { marginLeft: 80 };

class Test extends React.Component {
  getChildContext() {
    const { intl } = this.props;
    const { formatMessage } = intl;

    return {
      formatMessage
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

Test.propTypes = {
  intl: PropTypes.object,
  children: PropTypes.object
};

Test.childContextTypes = {
  formatMessage: PropTypes.func
};

const InjectedTest = injectIntl(Test);

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: localStorage.getItem('collapsed') === 'true' ? true : false,
      toggleLang: false,
      locale: 'en',
      messages: mergedMessages
    };

    this.onCollapse = this.onCollapse.bind(this);
    this.toggleLang = this.toggleLang.bind(this);
  }

  onCollapse(collapsed) {
    localStorage.setItem('collapsed', collapsed);
    this.setState({ collapsed });
  }

  getLang() {
    let lang = localStorage.getItem('locale');
    if (lang !== 'mn') {
      this.setLang('en', {});
    } else {
      this.setLang('mn', mergedMessages);
    }
  }

  setLang(locale, messages) {
    localStorage.setItem('locale', locale);
    this.setState({ locale, messages });
  }

  onCollapse(collapsed) {
    localStorage.setItem('collapsed', collapsed);
    this.setState({ collapsed });
  }

  toggleLang() {
    this.setState(prevState => ({
      toggleLang: !prevState.toggleLang
    }));
    const { toggleLang } = this.state;
    toggleLang ? this.setLang('mn', mergedMessages) : this.setLang('en', {});
  }

  getChildContext() {
    return {
      currentUser: this.props.currentUser,
      systemConfig: this.props.systemConfig
    };
  }

  componentDidMount() {
    const { history, currentUser } = this.props;
    const path = history.location.pathname;

    this.getLang();
    if (!currentUser && !visitorPaths.includes(path)) {
      history.push('/sign-in?required');
    }
  }

  render() {
    const { currentUser, location } = this.props;
    const { collapsed, locale, messages } = this.state;

    const navProps = {
      collapsed: collapsed ? true : false,
      onCollapse: this.onCollapse,
      pathname: location.pathname
    };

    let layoutStyle = {};
    if (currentUser) {
      collapsed
        ? (layoutStyle = withSidebarCollapsed)
        : (layoutStyle = withSidebar);
    }

    return (
      <IntlProvider key={locale} locale={locale} messages={messages}>
        <Layout>
          {currentUser && <Sidenav {...navProps} />}
          <Layout className="main" style={layoutStyle}>
            <Header toggleLang={this.toggleLang} langLabel={locale} />
            <Content>
              {currentUser && <Breadcrumb {...location} />}
              <InjectedTest {...this.props} />
              <BackTop />
            </Content>
            <Footer>
              <_t id="footer">Oyu Tolgoi ©2018 All Rights Reserved</_t>
            </Footer>
          </Layout>
        </Layout>
      </IntlProvider>
    );
  }
}

MainLayout.propTypes = {
  currentUser: PropTypes.object,
  systemConfig: PropTypes.object,
  children: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object
};

MainLayout.childContextTypes = {
  currentUser: PropTypes.object,
  systemConfig: PropTypes.object
};

export default MainLayout;
