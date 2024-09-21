import { Client } from "whiskeysockets/baileys";

import HandleMessage from "./helpers/HandleMessage";
import HandleMsgAck from "./helpers/HandleMsgAck";
import VerifyCall from "./VerifyCall";
import handleMsgEdit from "./helpers/handleMsgEdit";

interface Session extends Client {
  id: number;
}

const wbotMessageListener = (wbot: Session): void => {
  wbot.on("message_create", async msg => {
    if (msg.isStatus) {
      return;
    }
    HandleMessage(msg, wbot);
  });

  wbot.on("media_uploaded", async msg => {
    HandleMessage(msg, wbot);
  });

  wbot.on("message_ack", async (msg, ack) => {
    HandleMsgAck(msg, ack);
  });
  
  wbot.on("message_edit", async (msg, newBody, oldBody) => {
    handleMsgEdit(msg, newBody as string);
  });

  wbot.on("call", async call => {
    VerifyCall(call, wbot);
  });
};

export { wbotMessageListener, HandleMessage };
