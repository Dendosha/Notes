import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function BaseRouteNavigate({ children }: { children: ReactNode }) {
	const location = useLocation();

	if (location.pathname === '/') {
		return <Navigate to={'/notes'} replace={true} />;
	}

	return children;
}

export default BaseRouteNavigate;
