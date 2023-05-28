import React from "react";
import { useParams } from "react-router-dom";
import NotFound from "./components/global/NotFound";
import { IParams } from "./utils/TypeScript";

const generatePage = (name: string) => {
  const component = () => require(`./pages/${name}`).default;

  try {
    return React.createElement(component());
  } catch (err) {
    return <NotFound />;
  }
};

const PageRender = () => {
  const { page, slug, action }: IParams = useParams<keyof IParams>() as IParams;

  let name = "";

  if (page) {
    if (action) {
      name = `${page}/[slug]/[action]`;
    } else {
      name = slug ? `${page}/[slug]` : `${page}`;
    }
  }
  return generatePage(name);
};

export default PageRender;
