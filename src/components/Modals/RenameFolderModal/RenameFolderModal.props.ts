export interface RenameFolderModalProps {
	id: number;
	name: string;
	modalState: boolean;
	setModalState: (state: React.SetStateAction<boolean>) => void;
}
