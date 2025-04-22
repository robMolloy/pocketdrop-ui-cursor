import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModalStore } from "@/stores/modalStore";

import { ReactNode } from "react";
import { Button } from "./ui/button";

export const Modal = () => {
  const modalStore = useModalStore();

  return (
    <Dialog open={!!modalStore.data} onOpenChange={() => modalStore.setData(null)}>
      {modalStore.data}
    </Dialog>
  );
};

export const ModalContent = (p: { title: string; description: string; buttons: ReactNode }) => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{p.title}</DialogTitle>
        <DialogDescription>{p.description}</DialogDescription>
      </DialogHeader>
      <DialogFooter>{p.buttons}</DialogFooter>
    </DialogContent>
  );
};

export const ConfirmationModalContent = (p: {
  title: string;
  description: string;
  onConfirm: () => void;
}) => {
  const modalStore = useModalStore();
  return (
    <ModalContent
      title={p.title}
      description={p.description}
      buttons={
        <>
          <Button variant="destructive" onClick={() => modalStore.close()}>
            Cancel
          </Button>
          <Button
            onClick={async () => {
              await p.onConfirm();
              modalStore.close();
            }}
          >
            Confirm
          </Button>
        </>
      }
    />
  );
};
