import { MainLayout } from '../components';
import { withSystemConfig, withCurrentUser } from 'modules/auth/containers';
import { withRouter } from 'react-router-dom';

export default withRouter(withSystemConfig(withCurrentUser(MainLayout)));
