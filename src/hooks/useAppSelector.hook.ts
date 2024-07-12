import { useSelector } from 'react-redux';
import { RootStore } from '../store/store';

export const useAppSelector = useSelector.withTypes<RootStore>();
