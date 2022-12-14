import queryString from "query-string";
import fs from "fs";

type BadgeType = {
  title: string;
  /** https://simpleicons.org/ */
  logo: string;
  backgroundColor: string;
  label?: string;
  logoColor?: string;
  style?: string;
};

const baseUrl = "https://img.shields.io/badge";

const makeBadgeUrl = ({
  title,
  logo,
  backgroundColor,
  label = "",
  logoColor = "white",
  style = "flat",
}: BadgeType) => {
  const lastRouter = { label, title, backgroundColor };

  const params = { style, logo, logoColor };

  return queryString.stringifyUrl({
    url: `${baseUrl}/${Object.values(lastRouter).join("-")}`,
    query: params,
  });
};

export default makeBadgeUrl;

const saveResult = () => {
  fs.writeFile(`./${fileName}.md`, md, (err) => {
    if (err) {
      //sd
      console.error(err);
      return;
    }
    //文件写入成功。
    console.log(path.join(__dirname, `${fileName}.md`));
  });
};
