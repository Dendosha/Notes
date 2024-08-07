import { SVGAttributes } from 'react';

function ChangeFolderButtonIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			width='81'
			height='71'
			viewBox='0 0 81 71'
			fill='none'
			stroke='#FFBB00'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path
				d='M78 60.7778C78 62.6932 77.2098 64.5302 75.8033 65.8847C74.3968 67.2391 72.4891 68 70.5 68H10.5C8.51088 68 6.60322 67.2391 5.1967 65.8847C3.79018 64.5302 3 62.6932 3 60.7778V10.2222C3 8.30677 3.79018 6.46977 5.1967 5.11534C6.60322 3.76091 8.51088 3 10.5 3H29.25L36.75 13.8333H70.5C72.4891 13.8333 74.3968 14.5942 75.8033 15.9487C77.2098 17.3031 78 19.1401 78 21.0556V60.7778Z'
				strokeWidth={6}
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

export default ChangeFolderButtonIcon;
