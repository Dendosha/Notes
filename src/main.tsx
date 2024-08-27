import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import BaseRouteNavigate from './helpers/BaseRouteNavigate.tsx';
import './index.scss';
import RootLayout from './layout/RootLayout/RootLayout.tsx';
import Folders from './pages/Folders/Folders.tsx';
import NoteUpsert from './pages/Notes/NoteUpsert/NoteUpsert.tsx';
import Notes from './pages/Notes/Notes.tsx';
import NotesFolder from './pages/Notes/NotesFolder/NotesFolder.tsx';
import Settings from './pages/Settings/Settings.tsx';
import TaskUpsert from './pages/Tasks/TaskUpsert/TaskUpsert.tsx';
import Tasks from './pages/Tasks/Tasks.tsx';
import { persistor, store } from './store/store.ts';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<BaseRouteNavigate>
				<RootLayout />
			</BaseRouteNavigate>
		),
		children: [
			{
				path: 'notes',
				element: <Notes />,
				children: [
					{
						path: ':folder',
						element: <NotesFolder />,
						children: [
							{
								path: ':note/edit',
								element: <NoteUpsert />
							}
						]
					}
				]
			},
			{
				path: 'tasks',
				element: <Tasks />,
				children: [
					{
						path: ':task/edit',
						element: <TaskUpsert />
					}
				]
			}
		]
	},
	{
		path: '/settings',
		element: <Settings />
	},
	{
		path: '/folders',
		element: <Folders />
	},
	{
		path: '*',
		element: <>Error</>
	}
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<RouterProvider router={router} />
			</PersistGate>
		</Provider>
	</React.StrictMode>
);
