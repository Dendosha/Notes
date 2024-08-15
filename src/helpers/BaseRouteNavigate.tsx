import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

function BaseRouteNavigate({ children }: { children: ReactNode }) {
	const location = useLocation();

	if (location.pathname === '/' || location.pathname === '/notes') {
		return <Navigate to={'/notes/all'} replace={true} />;
	}

	return children;
}

export default BaseRouteNavigate;
