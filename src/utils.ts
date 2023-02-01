import fs from 'fs';
import path from 'path';
import queryString from 'query-string';
import { fileURLToPath } from 'url';
import type { BaseBadgeType } from './constant.js';
import { baseUrl, baseBadges } from './constant.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type BadgeType = {
  title: string;
  /** https://simpleicons.org/ */
  logo: string;
  backgroundColor: string;
  label?: string;
  logoColor?: string;
  style?: string;
};

const makeBadgeUrl = ({
  title,
  logo,
  backgroundColor,
  label = '',
  logoColor = 'white',
  style = 'flat',
}: BadgeType) => {
  const lastRouter = { label, title, backgroundColor };

  const params = { style, logo, logoColor };

  return queryString.stringifyUrl({
    url: encodeURI(`${baseUrl}/${Object.values(lastRouter).join('-')}`),
    query: params,
  });
};

const formatBackgroundColorParam = (color: string) => {
  return color.startsWith('#') ? color.slice(1) : color;
};

const formatBadgeConstant = (badges: BaseBadgeType[]) => {
  return badges.map((item) => ({
    title: item.title,
    logo: item?.logo ? item.logo : item.title,
    backgroundColor: formatBackgroundColorParam(item.backgroundColor),
  }));
};

const makeImg = (url: string) => {
  return `<img src="${url}" />`;
};

const makeMdImgTag = (url: string, title?: string) => {
  return `![${title ?? url}](${url})`;
};

const saveContent = (content: string, fileName: string) => {
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

export const makeBadge = (
  badges: BaseBadgeType[] = baseBadges,
  fileName: string,
  tagType: 'md' | 'img' = 'md'
) => {
  const fullBadgeImgs = formatBadgeConstant(badges).map((item) => {
    return tagType === 'md'
      ? makeMdImgTag(makeBadgeUrl(item), item.title)
      : makeImg(makeBadgeUrl(item));
  });

  saveContent(fullBadgeImgs.join('\n'), fileName);
};
