import queryString from "query-string";

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

const makeBadge = ({
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

export default makeBadge;