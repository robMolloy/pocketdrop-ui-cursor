import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useRightSidebarStore } from "@/stores/rightSidebarStore";
import { ReactNode } from "react";

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RightSidebarContent = (p: { title: string; children: ReactNode }) => {
  return (
    <>
      <SheetHeader>
        <SheetTitle>{p.title}</SheetTitle>
      </SheetHeader>
      <div className="mt-4">{p.children}</div>
    </>
  );
};

export function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  const rightSidebarStore = useRightSidebarStore();
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        {rightSidebarStore.data}
        {/* <SheetHeader>
          <SheetTitle>Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {rightSidebarStore.data}
          <p className="text-sm text-muted-foreground">Right sidebar content goes here</p>
        </div> */}
      </SheetContent>
    </Sheet>
  );
}
