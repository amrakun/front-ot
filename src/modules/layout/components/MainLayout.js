import React from 'react';
import Sidenav from './Sidenav';
import Header from './Header';
import { LocaleProvider, Layout, BackTop } from 'antd';
import { PropTypes } from 'prop-types';
import { IntlProvider, addLocaleData, injectIntl } from 'react-intl';
import { T } from 'modules/common/components';
import mn from 'react-intl/locale-data/mn';
import en from 'react-intl/locale-data/en';
import enUS from 'rc-pagination/lib/locale/en_US';
import * as messages from 'modules/translations';

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
  ...messages.Prequalification.BusinessIntegrity,
  ...messages.Prequalification.Enviroment,
  ...messages.Prequalification.Health,
  ...messages.Prequalification.FinancialInfo,
  ...messages.CapacityBuilding,
  ...messages.Common,
  ...messages.Options,
  ...messages.Feedback,
  ...messages.Qualification,
  ...messages.SupplierQualification,
  ...messages.RfqAndEoi.Tenders,
  ...messages.Auth.Profile,
  ...messages.Auth.ChangePassword,
  ...messages.Auth.SignIn
};

// antd custom component text
const mn_Mn = {
  locale: 'mn-MN',
  Pagination: {
    jump_to: 'Үсрэх',
    items_per_page: '/ хуудас'
  },
  Table: {
    filterConfirm: 'Тийм',
    filterReset: 'Цуцлах',
    emptyText: 'Мэдээлэл алга'
  }
};

const withSidebar = { marginLeft: 230 };
const withSidebarCollapsed = { marginLeft: 80 };

class InjectInstance extends React.Component {
  getChildContext() {
    const { intl, currentUser } = this.props;
    const { formatMessage } = intl;
    const isSupplier = (currentUser && currentUser.isSupplier) || false;

    return {
      __: msg =>
        !currentUser || isSupplier
          ? formatMessage({ id: msg, defaultMessage: msg })
          : msg
    };
  }

  render() {
    return <div>{this.props.children}</div>;
  }
}

InjectInstance.propTypes = {
  intl: PropTypes.object,
  children: PropTypes.object,
  currentUser: PropTypes.object
};

InjectInstance.childContextTypes = {
  __: PropTypes.func
};

const InjectedComponent = injectIntl(InjectInstance);

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: localStorage.getItem('collapsed') === 'true' ? true : false,
      toggleLang: false,
      locale: '',
      messages: mergedMessages
    };

    this.onCollapse = this.onCollapse.bind(this);
    this.toggleLang = this.toggleLang.bind(this);
  }

  componentDidMount() {
    const { history, currentUser } = this.props;
    const path = history.location.pathname;

    if (!currentUser && !visitorPaths.includes(path)) {
      history.push('/sign-in?required');
    }

    this.getLang();

    // erxes script
    if (currentUser && currentUser.isSupplier) {
      window.erxesSettings = {
        messenger: {
          brand_id: 'ta4ukM'
        }
      };

      (() => {
        const script = document.createElement('script');
        script.src =
          'http://erxeswidgets.ot.mn/build/messengerWidget.bundle.js';
        script.async = true;

        const entry = document.getElementsByTagName('script')[0];
        entry.parentNode.insertBefore(script, entry);
      })();
    }
  }

  componentDidUpdate() {
    const path = this.props.location.pathname;

    if (path !== '/' && path !== '/sign-in') {
      this.props.logsWriteMutation({
        variables: { apiCall: path }
      });
    }
  }

  toggleLang() {
    this.setState({ toggleLang: !this.state.toggleLang });
    const { toggleLang } = this.state;
    toggleLang ? this.setLang('mn', mergedMessages) : this.setLang('en', {});
  }

  getLang() {
    const lang = localStorage.getItem('locale');
    const messages = lang === 'mn' ? mergedMessages : {};

    this.setLang(lang || 'en', messages);
  }

  setLang(locale, messages) {
    localStorage.setItem('locale', locale);
    this.setState({ locale, messages });
  }

  onCollapse(collapsed) {
    localStorage.setItem('collapsed', collapsed);
    this.setState({ collapsed });
  }

  getChildContext() {
    return {
      toggleLang: this.toggleLang,
      currentUser: this.props.currentUser,
      systemConfig: this.props.systemConfig,
      locale: this.state.locale
    };
  }

  render() {
    const { currentUser, location } = this.props;
    const { collapsed, locale, messages } = this.state;
    const antdLocale = locale === 'en' ? enUS : mn_Mn;

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
      <LocaleProvider locale={antdLocale}>
        <IntlProvider locale={locale || 'en'} messages={messages}>
          <Layout className={`main-wrapper ${locale}`}>
            {currentUser && <Sidenav {...navProps} />}
            <Layout className="main" style={layoutStyle}>
              {currentUser && <Header location={location} />}
              <Content>
                <InjectedComponent {...this.props} />
                <BackTop />
              </Content>
              {currentUser && (
                <Footer>
                  <T id="Oyu Tolgoi ©2018 All Rights Reserved">
                    Oyu Tolgoi 2018 All Rights Reserved
                  </T>
                </Footer>
              )}
            </Layout>
          </Layout>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

MainLayout.propTypes = {
  currentUser: PropTypes.object,
  systemConfig: PropTypes.object,
  children: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  logsWriteMutation: PropTypes.func.isRequired
};

MainLayout.childContextTypes = {
  toggleLang: PropTypes.func,
  currentUser: PropTypes.object,
  systemConfig: PropTypes.object,
  locale: PropTypes.string
};

export default MainLayout;
