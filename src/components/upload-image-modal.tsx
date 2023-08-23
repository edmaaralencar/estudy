import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { UploadButton, UploadDropzone, Uploader } from "@/lib/upload-thing";
import { Editor } from "@tiptap/react";
import { FormEvent } from "react";
import { toast } from "react-toastify";

type UploadImageModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editor: Editor;
};

export function UploadImageModal({
  open,
  onOpenChange,
  editor,
}: UploadImageModalProps) {
  async function onSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[768px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Upload de Imagem</DialogTitle>
          <DialogDescription>Faça o upload de uma imagem.</DialogDescription>
        </DialogHeader>
        <UploadDropzone
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            if (res) {
              editor.chain().focus().setImage({ src: res[0].url }).run();
              toast.success("Imagem adicionada com sucesso.");
              onOpenChange(false);
            }
          }}
          onUploadError={(error: Error) => {
            // Do something with the error.
            alert(`ERROR! ${error.message}`);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
