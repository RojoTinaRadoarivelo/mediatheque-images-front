import type { CSSProperties } from "react";
import { type ModalProps } from "../../utils/modals.type";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

function Modal({
  isOpen,
  onClose,
  children,
  width,
  height,
  className,
  contentClassName,
}: ModalProps) {
  const widthIsClass =
    width && (width.startsWith("max-w-") || width.startsWith("w-"));

  const widthClassName = widthIsClass ? width : undefined;
  const widthStyle: CSSProperties | undefined =
    width && !widthIsClass ? { width, maxWidth: width } : undefined;

  const defaultMaxWidth = width ? "max-w-none" : "max-w-lg sm:max-w-2xl";

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className={cn(
          "w-full p-0 overflow-x-hidden overflow-y-auto",
          defaultMaxWidth,
          widthClassName,
          "max-h-[calc(100dvh-2rem)]",
          className,
        )}
        style={{
          ...(height ? { height } : {}),
          ...(widthStyle ?? {}),
        }}
      >
        <div className={cn("p-6", contentClassName)}>{children}</div>
      </DialogContent>
    </Dialog>
  );
}

export default Modal;
