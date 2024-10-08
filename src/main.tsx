import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import BaseRouteNavigate from './helpers/BaseRouteNavigate.tsx';
import './index.scss';
import RootLayout from './layout/RootLayout/RootLayout.tsx';
import Error from './pages/Error/Error.tsx';
import Loading from './pages/Loading/Loading.tsx';
import { persistor, store } from './store/store.ts';

const Notes = lazy(() => import('./pages/Notes/Notes.tsx'));
const NotesFolder = lazy(
	() => import('./pages/Notes/NotesFolder/NotesFolder.tsx')
);
const NoteUpsert = lazy(
	() => import('./pages/Notes/NoteUpsert/NoteUpsert.tsx')
);
const Folders = lazy(() => import('./pages/Folders/Folders.tsx'));

const Tasks = lazy(() => import('./pages/Tasks/Tasks.tsx'));
const TaskUpsert = lazy(
	() => import('./pages/Tasks/TaskUpsert/TaskUpsert.tsx')
);

const Settings = lazy(() => import('./pages/Settings/Settings.tsx'));

const router = createBrowserRouter(
	[
		{
			path: '/',
			element: (
				<BaseRouteNavigate>
					<RootLayout />
				</BaseRouteNavigate>
			),
			errorElement: <Error />,
			children: [
				{
					path: 'notes',
					element: (
						<Suspense fallback={<Loading />}>
							<Notes />
						</Suspense>
					),
					errorElement: <Error />,
					children: [
						{
							path: ':folder',
							element: (
								<Suspense fallback={<Loading />}>
									<NotesFolder />
								</Suspense>
							),
							errorElement: <Error />,
							children: [
								{
									path: ':note/edit',
									element: (
										<Suspense fallback={<Loading />}>
											<NoteUpsert />
										</Suspense>
									),
									errorElement: <Error />
								}
							]
						}
					]
				},
				{
					path: 'tasks',
					element: (
						<Suspense fallback={<Loading />}>
							<Tasks />
						</Suspense>
					),
					errorElement: <Error />,
					children: [
						{
							path: ':task/edit',
							element: (
								<Suspense fallback={<Loading />}>
									<TaskUpsert />
								</Suspense>
							),
							errorElement: <Error />
						}
					]
				}
			]
		},
		{
			path: '/settings',
			element: (
				<Suspense fallback={<Loading />}>
					<Settings />
				</Suspense>
			),
			errorElement: <Error />
		},
		{
			path: '/folders',
			element: (
				<Suspense fallback={<Loading />}>
					<Folders />
				</Suspense>
			),
			errorElement: <Error />
		},
		{
			path: '*',
			element: <Error />
		}
	],
	{
		basename: import.meta.env.BASE_URL
	}
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
