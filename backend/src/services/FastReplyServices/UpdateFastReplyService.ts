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
  fastReplyData: FastReplyData;
  fastReplyId: string;
  attachmentFile: File; // Adicionando o arquivo de anexo à requisição
}

const UpdateFastReplyService = async ({
  fastReplyData,
  fastReplyId,
  attachmentFile
}: Request): Promise<FastReply> => {
  const { key, message, userId, tenantId, attachment } = fastReplyData;

  // Lógica para lidar com o upload do arquivo de anexo
  const handleAttachmentUpload = async (file: File) => {
    // Implemente a lógica para fazer o upload do arquivo para o servidor
    // Retorne o URL do arquivo após o upload
    const uploadedFileUrl = "URL_do_arquivo_apos_upload";
    return uploadedFileUrl;
  };

  if (attachmentFile) {
    const uploadedFileUrl = await handleAttachmentUpload(attachmentFile);
    fastReplyData.attachment = uploadedFileUrl;
  }

  const fastReplyModel = await FastReply.findOne({
    where: { id: fastReplyId, tenantId },
    attributes: ["id", "key", "message", "userId"]
  });

  if (!fastReplyModel) {
    throw new AppError("ERR_NO_FAST_REPLY_FOUND", 404);
  }

  await fastReplyModel.update({
    key,
    message,
    userId,
    attachment: fastReplyData.attachment // Salvar o URL do anexo no modelo
  });

  await fastReplyModel.reload({
    attributes: ["id", "key", "message", "userId", "attachment"]
  });

  return fastReplyModel;
};

export { UpdateFastReplyService };
