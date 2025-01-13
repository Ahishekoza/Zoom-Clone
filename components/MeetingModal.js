import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

const MeetingModal = ({
  onOpen,
  onClose,
  title,
  className,
  handleClick,
  buttonText,
  buttonIcon,
  image,
  children
}) => {
  return (
    <Dialog open={onOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[520px] bg-dark-1 text-white px-6 py-9">
        <div className="flex flex-col gap-6">
          {image && (
            <div className={"flex justify-center"}>
              <Image src={image} height={72} width={72} alt="image" />
            </div>
          )}
          <h1 className={cn("text-3xl font-bold leading-[42px] text-center", className)}>
            {title}
          </h1>
          {children}
          <Button
            className="bg-blue-1 focus-visible:right-0 focus-visible:ring-offset-0"
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image src={buttonIcon} width={13} height={13} alt="buttonIcon" />
            )}
            &nbsp;
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
