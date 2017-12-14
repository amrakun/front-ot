import { Header } from '../components';
import { withCurrentUser } from 'modules/auth/containers';

export default withCurrentUser(Header);
