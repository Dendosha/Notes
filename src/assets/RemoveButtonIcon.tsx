import { SVGAttributes } from 'react';

function RemoveButtonIcon(props: SVGAttributes<SVGElement>) {
	return (
		<svg
			width='70'
			height='80'
			viewBox='0 0 70 80'
			fill='white'
			xmlns='http://www.w3.org/2000/svg'
			{...props}
		>
			<path d='M67.5 12.5H54.6281L49.3156 3.63281C47.8281 1.37922 45.5312 0 42.9062 0H27.0938C24.4688 0 22.0312 1.37922 20.6875 3.63281L15.3719 12.5H2.5C1.11328 12.5 0 13.6141 0 15V17.5C0 18.8906 1.11328 20 2.5 20H5V70C5 75.5234 9.47656 80 15 80H55C60.5234 80 65 75.5234 65 70V20H67.5C68.8906 20 70 18.8906 70 17.5V15C70 13.6141 68.8906 12.5 67.5 12.5ZM26.8594 7.95C27.0156 7.67656 27.3281 7.5 27.6562 7.5H42.3438C42.6758 7.5 42.9883 7.67578 43.1445 7.94922L45.875 12.5H24.125L26.8594 7.95ZM55 72.5H15C13.6192 72.5 12.5 71.3808 12.5 70V20H57.5V70C57.5 71.375 56.375 72.5 55 72.5ZM35 65C36.3819 65 37.5 63.8819 37.5 62.5V30C37.5 28.6181 36.3819 27.5 35 27.5C33.6181 27.5 32.5 28.625 32.5 30V62.5C32.5 63.875 33.625 65 35 65ZM22.5 65C23.875 65 25 63.875 25 62.5V30C25 28.6181 23.8819 27.5 22.5 27.5C21.1181 27.5 20 28.625 20 30V62.5C20 63.875 21.125 65 22.5 65ZM47.5 65C48.8819 65 50 63.8819 50 62.5V30C50 28.6181 48.8819 27.5 47.5 27.5C46.1181 27.5 45 28.625 45 30V62.5C45 63.875 46.125 65 47.5 65Z' />
		</svg>
	);
}

export default RemoveButtonIcon;
