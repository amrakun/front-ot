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
import messages from 'modules/locales/translation';

addLocaleData([...mn, ...en]);
const { Content, Footer } = Layout;

const visitorPaths = [
  '/sign-in',
  '/register',
  '/expression-of-interest',
  '/confirm-registration',
  '/'
];

const withSidebar = { marginLeft: 200 };
const withSidebarCollapsed = { marginLeft: 80 };

class MainLayout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: localStorage.getItem('collapsed') === 'true' ? true : false,
      toggleLang: false,
      locale: 'en',
      messages: messages
    };

    this.onCollapse = this.onCollapse.bind(this);
    this.toggleLang = this.toggleLang.bind(this);
  }

  onCollapse(collapsed) {
    localStorage.setItem('collapsed', collapsed);
    this.setState({ collapsed });
  }

  toggleLang() {
    this.setState(prevState => ({
      toggleLang: !prevState.toggleLang
    }));
    switch (this.state.toggleLang) {
      case true:
        this.setState({
          locale: 'mn',
          messages: messages
        });
        break;
      case false:
        this.setState({
          locale: 'en',
          messages: {}
        });
        break;
    }
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

    if (!currentUser && !visitorPaths.includes(path)) {
      history.push('/sign-in?required');
    }
  }

  render() {
    const { currentUser, children, location } = this.props;
    const { collapsed, locale, messages, toggleLang } = this.state;

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
            <Header toggleLang={this.toggleLang} langLabel={toggleLang} />
            <Content>
              {currentUser && <Breadcrumb {...location} />}
              {children}
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
