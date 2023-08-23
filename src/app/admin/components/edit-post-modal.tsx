import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Post } from "./posts-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FormEvent, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Editor } from "@/components/editor";

type EditPostModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  post: Post | null;
};

const statuses: any = {
  approved: "Aprovado",
  requested: "Requisitado",
  refused: "Recusado",
};

export function EditPostModal({
  post,
  open,
  onOpenChange,
}: EditPostModalProps) {
  const [status, setStatus] = useState(post?.status);
  const router = useRouter();

  console.log(post);

  if (!post) {
    return null;
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await axios({
        url: "/api/posts",
        method: "PUT",
        data: {
          postId: post?.id,
          status,
        },
      });

      toast.success("Status da Postagem alterada com sucesso.");
      router.refresh();
      onOpenChange(false);
    } catch (error) {
      console.log(error);
    }
  }

  console.log({ post });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] max-h-[768px] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar post {post.name}</DialogTitle>
          <DialogDescription>
            Aprove o post e veja outras informações do mesmo. Clique em salvar
            para fazer as alterações.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid grid-cols-2">
            <TabsTrigger value="form">Editar</TabsTrigger>
            <TabsTrigger value="info">Informações</TabsTrigger>
          </TabsList>
          <TabsContent value="form">
            <form onSubmit={onSubmit}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-right">
                    Status da Postagem
                  </Label>
                  <Select
                    onValueChange={(value) => setStatus(value)}
                    value={status}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione a linguagem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="approved">Aprovado</SelectItem>
                        <SelectItem value="requested">Requisitado</SelectItem>
                        <SelectItem value="refused">Recusado</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Salvar modificações</Button>
              </DialogFooter>
            </form>
          </TabsContent>
          <TabsContent value="info">
            <div className="py-4 flex flex-col gap-2">
              <div className="flex gap-2 items-center">
                <span className="text-muted-foreground">Nome da postagem:</span>
                <strong>{post.name}</strong>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-muted-foreground">
                  Categoria da postagem:
                </span>
                <strong>{post.category}</strong>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-muted-foreground">Autor:</span>
                <strong>{post.user.name}</strong>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-muted-foreground">
                  Status da postagem:
                </span>
                <strong>{statuses[post.status]}</strong>
              </div>

              <div className="space-y-2">
                <span className="text-muted-foreground">Conteúdo:</span>
                <div className="flex flex-col gap-2 p-3 border border-border rounded-md">
                  <Editor editable={false} content={post.content} />
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-muted-foreground">
                  Exemplos de código:
                </span>
                {post.codeExamples.map((example) => (
                  <div
                    key={example.id}
                    className="flex flex-col gap-2 p-3 border border-border rounded-md"
                  >
                    <span>{example.name}</span>
                    <span>{example.code}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
