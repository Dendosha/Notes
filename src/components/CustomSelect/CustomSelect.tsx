import {
	CssTransition,
	Option,
	Select,
	SelectListboxSlotProps,
	SelectRootSlotProps
} from '@mui/base';
import cn from 'classnames';
import { forwardRef } from 'react';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import styles from './CustomSelect.module.scss';
import { CustomSelectProps } from './CustomSelect.props';

const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps<any>>(
	function CustomSelect(
		{ items, defaultValue = items[0].value, setValue, className, ...props },
		ref
	) {
		return (
			<div className={cn(styles['custom-select-wrapper'], className)}>
				<Select
					ref={ref}
					className={styles['custom-select']}
					slots={{ root: Button, listbox: AnimatedListbox }}
					slotProps={{
						root: { className: styles['custom-select__button'] },
						popup: {
							className: styles['custom-select__popup'],
							disablePortal: true
						},
						listbox: { className: styles['custom-select__listbox'] }
					}}
					defaultValue={defaultValue}
					{...props}
				>
					{items.map(item => (
						<Option
							key={item.value}
							value={item.value}
							onClick={() => setValue(item.value)}
							className={styles['custom-select__option']}
						>
							{item.label}
						</Option>
					))}
				</Select>
			</div>
		);
	}
);

const Button = forwardRef(function Button<
	TValue extends object,
	Multiple extends boolean
>(
	props: SelectRootSlotProps<TValue, Multiple>,
	ref: React.ForwardedRef<HTMLButtonElement>
) {
	const { ownerState, ...others } = props;
	return (
		<button type='button' {...others} ref={ref}>
			{others.children}
			<ArrowIcon
				className={cn(styles['custom-select__icon'], {
					[styles['custom-select__icon_open']]: ownerState.open
				})}
			/>
		</button>
	);
});

const AnimatedListbox = forwardRef(function AnimatedListbox<
	TValue extends object,
	Multiple extends boolean
>(
	props: SelectListboxSlotProps<TValue, Multiple>,
	ref: React.ForwardedRef<HTMLUListElement>
) {
	const { ownerState, ...others } = props;

	return (
		<CssTransition
			className={cn(styles['custom-select__listbox-wrapper'], {
				[styles['custom-select__listbox-wrapper_open']]: ownerState.open
			})}
		>
			<ul {...others} ref={ref} />
		</CssTransition>
	);
});

export default CustomSelect;
