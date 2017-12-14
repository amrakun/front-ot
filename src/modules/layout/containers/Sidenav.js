import { Sidenav } from '../components';
import { withCurrentUser } from 'modules/auth/containers';

export default withCurrentUser(Sidenav);
