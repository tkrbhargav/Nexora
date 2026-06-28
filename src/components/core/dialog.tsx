import * as DialogPrimitives from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export const DialogFooter = ({
	className,
	...props
}: React.ComponentProps<"div">) => {
	return (
		<div
			className={cn("flex items-center justify-end gap-2", className)}
			{...props}
		/>
	);
};

export const Dialog = DialogPrimitives.Dialog;
export const DialogClose = DialogPrimitives.DialogClose;
export const DialogContent = DialogPrimitives.DialogContent;
export const DialogDescription = DialogPrimitives.DialogDescription;
export const DialogHeader = DialogPrimitives.DialogHeader;
export const DialogOverlay = DialogPrimitives.DialogOverlay;
export const DialogPortal = DialogPrimitives.DialogPortal;
export const DialogTitle = DialogPrimitives.DialogTitle;
export const DialogTrigger = DialogPrimitives.DialogTrigger;
