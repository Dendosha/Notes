import cn from 'classnames';
import { forwardRef, HTMLAttributes } from 'react';
import { OnlyAs, PolyRefFunction } from 'react-polymorphed';
import styles from './TextField.module.scss';

const polyRef = forwardRef as PolyRefFunction;

const TextField = polyRef<
	'input',
	HTMLAttributes<HTMLElement>,
	OnlyAs<'input' | 'textarea'>
>(function TextField({ as = 'input', className, ...props }, ref) {
	const Component = as || 'input';

	return (
		<Component
			{...props}
			ref={ref}
			className={cn(styles['text-field'], className)}
		></Component>
	);
});

export default TextField;
