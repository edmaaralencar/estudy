"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { FormEventHandler, use, useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";

const schema = z.object({
  content: z.string(),
  name: z.string().min(1, { message: "Nome da post obrigatório." }),
  category: z.string().min(1, { message: "Categoria do post obrigatório." }),
});

export default function Page() {
  const [content, setContent] = useState("");
  const [type, setType] = useState<"text" | "code" | "info">("text");
  const [name, setName] = useState("");
  const [example, setExample] = useState("");
  const [codeExamples, setCodeExamples] = useState<
    { name: string; example: string }[]
  >([]);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: "",
      name: "",
    },
  });

  function handleChangeContent(content: string) {
    setContent(content);
  }

  async function onSubmit(values: z.infer<typeof schema>) {
    if (codeExamples.length === 0) {
      return toast.error("Adicione um exemplo de código.");
    }
    console.log({ values, codeExamples, content });
  }

  function handleCreateCodeExample() {
    if (name.length === 0 || example.length === 0) {
      return toast.error("Preencha todos os campos.");
    }
    setCodeExamples((state) => [...state, { name, example }]);

    setName("");
    setExample("");
  }

  return (
    <div className="mx-auto max-w-3xl flex flex-col">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full mb-4">
            <div className="grid grid-cols-3 h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <button
                onClick={() => setType("text")}
                type="button"
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  type === "text" && "bg-background text-foreground shadow-sm"
                )}
              >
                Texto
              </button>
              <button
                onClick={() => setType("code")}
                type="button"
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  type === "code" && "bg-background text-foreground shadow-sm"
                )}
              >
                Código
              </button>
              <button
                onClick={() => setType("info")}
                type="button"
                className={cn(
                  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                  type === "info" && "bg-background text-foreground shadow-sm"
                )}
              >
                Informações
              </button>
            </div>
          </div>

          <div className={cn(type !== "text" ? "hidden" : "block")}>
            <Editor
              editable={true}
              content="Escreva aqui..."
              onChange={
                handleChangeContent as unknown as
                  | FormEventHandler<HTMLDivElement>
                  | undefined
              }
            />
          </div>

          <div className={cn(type !== "code" ? "hidden" : "block")}>
            <div className="flex flex-col gap-2 my-4">
              <div className="flex flex-col gap-4">
                <span className="text-lg">
                  Crie os exemplos de código que vão ter na página.
                </span>

                <div className="space-y-2">
                  <FormLabel
                    className={cn(name.length === 0 && "text-destructive")}
                  >
                    Nome
                  </FormLabel>
                  <Input
                    placeholder="Nome do exemplo"
                    onChange={(event) => setName(event.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <FormLabel>Exemplo</FormLabel>
                  <Textarea
                    rows={20}
                    className="resize-none"
                    placeholder="Nome do exemplo"
                    onChange={(event) => setExample(event.target.value)}
                  />
                </div>

                <Button type="button" onClick={handleCreateCodeExample}>
                  Salvar exemplo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {codeExamples.map((codeExample, index) => (
                <Card className="max-h-56 overflow-auto" key={index}>
                  <CardHeader>Exemplo: {codeExample.name}</CardHeader>
                  <CardContent>{codeExample.example}</CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div
            className={cn(
              "space-y-2 my-4",
              type !== "info" ? "hidden" : "block"
            )}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="Algoritmos">Algoritmos</SelectItem>
                          <SelectItem value="Estrutura de Dados">
                            Estrutura de Dados
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex w-full justify-end mt-12">
            <Button className="max-w-xs w-full">Criar Post</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
