import * as mineflayer from "mineflayer";
import { pathfinder } from "mineflayer-pathfinder";
import { SocksClient } from "socks";
import * as ProxyAgent from "proxy-agent";
import config from "./config";
import { SocksProxyAgent } from "socks-proxy-agent";

const bot = mineflayer.createBot({
  skipValidation: true,
  username: "bot_name",
  password: "bot_password",
  host: "127.0.0.1",
  port: 54018,
  version: "1.12.2",
  // @ts-ignore
  agent: new ProxyAgent({ protocol: 'socks5:', host: config.proxyHOST, port: config.proxyPORT }),
  connect: (client) => {
    SocksClient.createConnection(
      {
        proxy: {
          host: config.proxyHOST,
          port: Number(config.proxyPORT),
          type: 5,
          userId: config.proxyUSER,
          password: config.proxyPAS,
        },
        command: "connect",
        destination: {
          host: "127.0.0.1",
          port: 54018,
        },
      },
      (err: any, info: any) => {
        if (err) {
          console.log(err);
          return;
        }
        client.setSocket(info.socket);
        client.emit("connect");
      }
    );
  },
});
// mc.holyworld.ru
// 31.184.215.54:25565 // eternal
bot.loadPlugin(pathfinder);

export default bot;
