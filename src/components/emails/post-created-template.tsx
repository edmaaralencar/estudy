import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  createdByName?: string;
  createdByEmail?: string;
  postName?: string;
  postCategory?: string;
  postLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const PostCreatedEmailTemplate = ({
  createdByName = "Edmar Alencar",
  createdByEmail = "edmar@gmail.com",
  postName = "Bubble Sort",
  postCategory = "Algoritmos",
  postLink = "http://localhost:3000/posts/id",
}: VercelInviteUserEmailProps) => {
  const previewText = `Veja a postagem de ${createdByName}!`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/static/vercel-logo.png`}
                width="40"
                height="37"
                alt="Vercel"
                className="my-0 mx-auto"
              />
            </Section>
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Visualize e aprove a postagem de {postName} feita por{" "}
              <strong>{createdByName}</strong> no <strong>EStudy</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Olá Administrador,
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{createdByName}</strong>
              <strong className="text-blue-600"> ({createdByEmail}) </strong>
              criou a postagem{" "}
              <strong>
                {postName} ({postCategory})
              </strong>{" "}
              no <strong>EStudy</strong>.
            </Text>

            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center"
                href={"http://localhost:3000/admin"}
              >
                Aprove
              </Button>
              <Button
                pX={20}
                pY={12}
                className="bg-[#000000] rounded ml-2 text-white text-[12px] font-semibold no-underline text-center"
                href={postLink}
              >
                Veja mais informações
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              ou copie e cole a seguinte URL no browser:{" "}
              <Link href={postLink} className="text-blue-600 no-underline">
                {postLink}
              </Link>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default PostCreatedEmailTemplate;
