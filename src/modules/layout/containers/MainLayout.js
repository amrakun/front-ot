import { MainLayout } from '../components';
import { withCurrentUser } from 'modules/auth/containers';
import { withRouter } from 'react-router-dom';

export default withRouter(withCurrentUser(MainLayout));
