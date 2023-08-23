"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pen } from "lucide-react";
import { useState } from "react";
import { EditPostModal } from "./edit-post-modal";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export type Post = {
  id: string;
  content: string;
  user: {
    name: string | null;
  };
  name: string;
  category: string;
  status: string;
  codeExamples: {
    id: string;
    name: string;
    code: string;
    postId: string;
  }[];
};

type PostsTableProps = {
  posts: Array<Post>;
};

export function PostsTable({ posts }: PostsTableProps) {
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Usuário</TableHead>
          <TableHead>Nome</TableHead>
          <TableHead>Categoria</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Conteúdo</TableHead>
          <TableHead>Qtd. de Exemplos</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post) => (
          <TableRow key={post.id}>
            <TableCell className="font-medium">{post.user.name}</TableCell>
            <TableCell>{post.name}</TableCell>
            <TableCell>{post.category}</TableCell>
            <TableCell>
              {post.status === "requested" ? "A ser aprovado" : "Aprovado"}
            </TableCell>
            <TableCell>{post.content.slice(0, 10)}...</TableCell>
            <TableCell>{post.codeExamples.length}</TableCell>
            <TableCell>
              <Button
                type="button"
                onClick={() => {
                  setOpenModal(true);
                  setSelectedPost(post)
                }}
                size="sm"
              >
                <Pen className="w-4 h-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {/* {posts.map((invoice) => (
        ))} */}
        <EditPostModal
          post={selectedPost}
          open={openModal}
          onOpenChange={setOpenModal}
        />
      </TableBody>
    </Table>
  );
}
