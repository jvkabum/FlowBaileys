import { Message as WbotMessage } from "whiskeysockets/baileys";
import Message from "../../models/Message";

const isMessageExistsService = async (msg: WbotMessage): Promise<boolean> => {
  const message = await Message.findOne({
    where: { messageId: msg?.id?.id }
  });

  if (!message) {
    console.log("Mensagem não existe", msg.id.id);

    return false;
  }
  console.log("Mensagem existente", msg.id.id);

  return true;
};

export default isMessageExistsService;
