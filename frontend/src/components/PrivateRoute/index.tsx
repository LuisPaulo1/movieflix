import { Redirect, Route } from 'react-router-dom';
import { isAuthenticated } from 'util/auth';

type Props = {
    children: React.ReactNode;
    path: string;
    exact?: boolean;
};

const PrivateRoute = ({ children, path, exact}: Props) => {

    return (
        <Route
            exact={exact}            
            path={path}
            render={({ location }) =>
                isAuthenticated() ? children : <Redirect to={{
                        pathname: '/',                        
                        state: { from: location },
                    }}
                />
            }
        />
    );
};

export default PrivateRoute;