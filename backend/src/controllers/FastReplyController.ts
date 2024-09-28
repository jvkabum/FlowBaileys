import * as Yup from "yup";
import { Request, Response } from "express";
import multer from "multer";
import path from "path";

const upload = multer({ dest: 'uploads/' });
import AppError from "../errors/AppError";

import CreateFastReplyService from "../services/FastReplyServices/CreateFastReplyService";
import ListFastReplyService from "../services/FastReplyServices/ListFastReplyService";
import DeleteFastReplyService from "../services/FastReplyServices/DeleteFastReplyService";
import UpdateFastReplyService from "../services/FastReplyServices/UpdateFastReplyService";

// Definição da interface FastReplyData
interface FastReplyData {
  key: string;
  message: string;
  userId: number;
  tenantId: number;
  file: string | null; // Certificar-se de que o campo file é opcional ou null
}

// Controller para criação de FastReply
export const store = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;

  // Verificar se o usuário tem permissões de administrador
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  // Criar novo objeto de resposta rápida
  const newReply: FastReplyData = {
    ...req.body,
    userId: req.user.id,
    tenantId,
    file: req.file ? req.file.filename : null // Verificar se há arquivo anexado
  };

  // Validação de dados usando Yup
  const schema = Yup.object().shape({
    key: Yup.string().required(),
    message: Yup.string().required(),
    userId: Yup.number().required(),
    tenantId: Yup.number().required()
  });

  try {
    await schema.validate(newReply);
  } catch (error) {
    throw new AppError(error.message);
  }

  // Chamar serviço para criar a resposta rápida
  const reply = await CreateFastReplyService(newReply);

  return res.status(200).json(reply);
};

// Controller para listar as FastReplies
export const index = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;

  // Listar todas as respostas rápidas associadas ao tenantId
  const queues = await ListFastReplyService({ tenantId });
  return res.status(200).json(queues);
};

// Controller para atualização de FastReply
export const update = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;

  // Verificar se o usuário tem permissões de administrador
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  // Atualizar dados da resposta rápida
  const fastReplyData: FastReplyData = {
    ...req.body,
    userId: req.user.id,
    tenantId,
    file: req.file ? req.file.filename : null // Verificar se há arquivo anexado
  };

  // Validação de dados usando Yup
  const schema = Yup.object().shape({
    key: Yup.string().required(),
    message: Yup.string().required(),
    userId: Yup.number().required()
  });

  try {
    await schema.validate(fastReplyData);
  } catch (error) {
    throw new AppError(error.message);
  }

  // Recuperar o ID da resposta rápida a ser atualizada
  const { fastReplyId } = req.params;

  // Chamar serviço de atualização
  const queueObj = await UpdateFastReplyService({
    fastReplyData,
    fastReplyId
  });

  return res.status(200).json(queueObj);
};

// Controller para remover FastReply
export const remove = async (req: Request, res: Response): Promise<Response> => {
  const { tenantId } = req.user;

  // Verificar se o usuário tem permissões de administrador
  if (req.user.profile !== "admin") {
    throw new AppError("ERR_NO_PERMISSION", 403);
  }

  // Recuperar o ID da resposta rápida a ser deletada
  const { fastReplyId } = req.params;

  // Chamar serviço de exclusão
  await DeleteFastReplyService({ id: fastReplyId, tenantId });
  
  return res.status(200).json({ message: "Fast Reply deleted" });
};

