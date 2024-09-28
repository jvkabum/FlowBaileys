// import AppError from "../../errors/AppError";
import FastReply from "../../models/FastReply";

interface Request {
  key: string;
  message: string;
  userId: number;
  tenantId: number | string;
}

const CreateFastReplyService = async ({
  key,
  message,
  userId,
  tenantId,
  file  // Adicionar o campo file
}: Request): Promise<FastReply> => {
  const fastReplyData = await FastReply.create({
    key,
    message,
    userId,
    tenantId,
    file  // Incluir o campo file na criação do registro
  });

  return fastReplyData;
};

export default CreateFastReplyService;
