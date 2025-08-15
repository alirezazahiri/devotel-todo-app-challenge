import { useState } from "react";

type ConfirmationData<T> = {
  isOpen: boolean;
  data: T | null;
};

type UseConfirmationProps<T> = {
  initialData: T | null;
  onConfirm: (data: T) => void | Promise<void>;
};

export const useConfirmation = <T>({
  initialData,
  onConfirm,
}: UseConfirmationProps<T>) => {
  const [confirmationData, setConfirmationData] = useState<ConfirmationData<T>>(
    {
      isOpen: false,
      data: initialData,
    }
  );

  const handleOpen = (data: T) => {
    setConfirmationData({
      isOpen: true,
      data,
    });
  };

  const handleClose = () => {
    setConfirmationData({
      isOpen: false,
      data: null,
    });
  };

  const handleConfirm = async () => {
    if (!confirmationData.data) return;
    await onConfirm(confirmationData.data);
    handleClose();
  };

  return {
    open: handleOpen,
    close: handleClose,
    confirm: handleConfirm,
    data: confirmationData.data,
    isOpen: confirmationData.isOpen,
  };
};
