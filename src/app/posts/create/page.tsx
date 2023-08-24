"use client";

import { Editor } from "@/components/editor";
import { Button } from "@/components/ui/button";
import { FormEvent, useState } from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [type, setType] = useState<"text" | "code" | "info">("text");
  const [codeName, setCodeName] = useState("");
  const [codeExample, setCodeExample] = useState("");
  const [language, setLanguage] = useState<string | undefined>(undefined);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [codeExamples, setCodeExamples] = useState<
    { name: string; example: string }[]
  >([]);

  function handleChangeContent(content: string) {
    setContent(content);
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);

    if (codeExamples.length === 0) {
      return toast.error("Adicione um exemplo de código.");
    }

    if (name.length === 0 || !category) {
      return toast.error("Preencha as informações do post.");
    }

    try {
      await axios.request({
        method: "POST",
        url: "/api/posts",
        data: {
          name,
          category,
          content,
          codeExamples,
        },
      });

      toast.success("O post foi enviado para adminstradores aprovarem.");

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  function handleCreateCodeExample() {
    if (codeName.length === 0 || codeExample.length === 0 || !language) {
      return toast.error("Preencha todos os campos.");
    }
    setCodeExamples((state) => [
      ...state,
      { name: `${codeName} - ${language}`, example: codeExample },
    ]);

    setCodeName("");
    setCodeExample("");
    setLanguage(undefined);
  }

  console.log({ language });

  return (
    <div className="mx-auto max-w-3xl flex flex-col">
      <form onSubmit={onSubmit}>
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
            onChange={handleChangeContent}
          />
        </div>

        <div className={cn(type !== "code" ? "hidden" : "block")}>
          <div className="flex flex-col gap-2 my-4">
            <div className="flex flex-col gap-4">
              <span className="text-lg">
                Crie os exemplos de código que vão ter na página.
              </span>

              <div className="space-y-2">
                <Label>Nome</Label>
                <Input
                  placeholder="Nome do exemplo"
                  onChange={(event) => setCodeName(event.target.value)}
                  value={codeName}
                />
              </div>
              <div className="space-y-2">
                <Label>Linguagem</Label>
                <Select
                  onValueChange={(value) => setLanguage(value)}
                  value={language}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a linguagem" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Javascript">Javascript</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Exemplo</Label>
                <Textarea
                  rows={18}
                  value={codeExample}
                  className="resize-none"
                  placeholder="Nome do exemplo"
                  onChange={(event) => setCodeExample(event.target.value)}
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
          className={cn("space-y-2 my-4", type !== "info" ? "hidden" : "block")}
        >
          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Nome"
            />
          </div>

          <div className="space-y-2">
            <Label>Categoria</Label>
            <Select
              onValueChange={(value) => setCategory(value)}
              value={category}
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
          </div>
        </div>

        <div className="flex w-full justify-end mt-12">
          <Button isLoading={loading} disabled={loading} type="submit" className="max-w-xs w-full">
            Criar Post
          </Button>
        </div>
      </form>
    </div>
  );
}
