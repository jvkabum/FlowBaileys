import FastReply from "../../models/FastReply"; // Supondo que FastReply seja um modelo válido do seu ORM

// Interface da requisição, com 'file' sendo opcional
interface FastReplyRequest {
  key: string;
  message: string;
  userId: number;
  tenantId: number | string;
  file?: string | null;  // O campo 'file' é opcional
}

const CreateFastReplyService = async ({
  key,
  message,
  userId,
  tenantId,
  file  // Campo opcional
}: FastReplyRequest): Promise<FastReply> => {
  // Criação do registro de FastReply
  const fastReplyData = await FastReply.create({
    key,
    message,
    userId,
    tenantId,
    file  // Adicionar o campo 'file' à criação do registro, se houver
  });

  return fastReplyData;
};

export default CreateFastReplyService;

