import type { BaseBadgeType } from "./constant";
import fs from "fs";
import path from "path";

export const formatBadgeConstant = (badges: BaseBadgeType[]) => {
  return badges.map((item) => ({
    ...item,
    logo: item.title,
  }));
};

export const makeImg = (url: string) => {
  return `<img src="${url}" />`;
};

export const saveContent = (content: string, fileName: string) => {
  fs.writeFile(`./${fileName}.md`, content, (err) => {
    if (err) {
      //sd
      console.error(err);
      return;
    }
    //文件写入成功。
    console.log(path.join(__dirname, `${fileName}.md`));
  });
};
