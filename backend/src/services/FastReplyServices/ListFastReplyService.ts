import AppError from "../../errors/AppError";
import FastReply from "../../models/FastReply";

interface FastReplyData {
  key: string;
  message: string;
  userId: number;
  tenantId: number | string;
  attachment?: string; // Adicionando a opção de anexo
}

interface Request {
  tenantId: string | number;
}

const ListFastReplyService = async ({
  tenantId
}: Request): Promise<FastReplyData[]> => {
  const fastReplyData = await FastReply.findAll({
    where: {
      tenantId
    },
    order: [["key", "ASC"]],
    attributes: ["id", "key", "message", "userId", "attachment"] // Incluindo o atributo de anexo na consulta
  });

  return fastReplyData;
};

export default ListFastReplyService;