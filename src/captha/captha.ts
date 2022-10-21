import { PythonShell } from "python-shell";
// @ts-ignore
import * as PNGImage from "pngjs-image"
import bot from "../bot";
import * as path from "path";
import * as fs from "fs";
import { getColor } from "../utils";


console.log("pid id: ", process.pid)

bot._client.once("map", async ({ data }) => {
  if (!data) return;

  const size = Math.sqrt(data.length);

  // @ts-ignore
  const image = PNGImage.createImage(size, size);

  for (let x = 0; x < size; x++) {
    for (let z = 0; z < size; z++) {
      const colorId = data[x + z * size];
      // @ts-ignore
      image.setAt(x, z, getColor(colorId));
    }
  }

  // @ts-ignore
  await image.writeImage(`${__dirname}/captha.png`, () => {
    console.log("Bot: решаю капчу...")
    PythonShell.run(path.resolve(__dirname, "./captha.py"), undefined, () => {
      fs.readFile(
        path.resolve(__dirname, "./result.txt"),
        "utf8",
        (err, result) => {
          if (err) return console.log(err);

          console.log("Результат капчи = ", result);

          bot.chat(result);
        }
      );
    });
  });
});
