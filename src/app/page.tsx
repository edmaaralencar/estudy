export default function Page() {
  return (
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col text-center gap-2 max-w-2xl my-32">
        <h1 className="text-2xl">Você está na página inicial.</h1>
        <span className="text-sm">
          Selecione um conteúdo na aba da esquerda e comece seus estudos.
        </span>
        <span className="text-sm text-muted-foreground">
          Se você tem interesse em publicar algum resumo, clique no botão de
          postar, faça sua postagem e aguarde aprovacação.
        </span>
      </div>
    </div>
  );
}
