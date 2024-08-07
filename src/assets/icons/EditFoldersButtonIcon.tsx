import { SVGAttributes } from 'react';

function EditFoldersButtonIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			width='49'
			height='43'
			viewBox='0 0 49 43'
			fill='none'
			stroke='#FFBB00'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M47 36.6667C47 37.8159 46.5259 38.9181 45.682 39.7308C44.8381 40.5435 43.6935 41 42.5 41H6.5C5.30653 41 4.16193 40.5435 3.31802 39.7308C2.47411 38.9181 2 37.8159 2 36.6667V6.33333C2 5.18406 2.47411 4.08186 3.31802 3.2692C4.16193 2.45655 5.30653 2 6.5 2H17.75L22.25 8.5H42.5C43.6935 8.5 44.8381 8.95655 45.682 9.7692C46.5259 10.5819 47 11.6841 47 12.8333V36.6667Z'
				strokeWidth={4}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default EditFoldersButtonIcon;
