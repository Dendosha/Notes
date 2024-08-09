import { ReactNode, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../hooks/useAppDispatch.hook';
import { useAppSelector } from '../hooks/useAppSelector.hook';
import { foldersActions } from '../store/folders.slice';

function BaseRouteNavigate({ children }: { children: ReactNode }) {
	const dispatch = useAppDispatch();
	const folders = useAppSelector(state => state.folders);

	const location = useLocation();

	useEffect(() => {
		if (!folders.items.find(folder => folder.id === 1)) {
			dispatch(
				foldersActions.add({
					id: 1,
					name: 'Все',
					notes: []
				})
			);
		}
	}, []);

	if (location.pathname === '/' || location.pathname === '/notes') {
		return <Navigate to={'/notes/all'} replace={true} />;
	}

	return children;
}

export default BaseRouteNavigate;
