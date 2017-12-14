import { Breadcrumb } from '../components';
import { withCurrentUser } from 'modules/auth/containers';

export default withCurrentUser(Breadcrumb);
