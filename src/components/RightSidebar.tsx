import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface RightSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function RightSidebar({ isOpen, onClose }: RightSidebarProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Details</SheetTitle>
        </SheetHeader>
        <div className="mt-4">
          {/* Add your right sidebar content here */}
          <p className="text-sm text-muted-foreground">
            Right sidebar content goes here
          </p>
        </div>
      </SheetContent>
    </Sheet>
  )
} 