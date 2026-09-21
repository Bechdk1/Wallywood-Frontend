import type React from "react";

export type ContainerTag =
  | "div"
  | "section"
  | "fieldset"
  | "figure"
  | "main"
  | "article";

export type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
  innerHTML?: ContainerTag;
  color?: string;
  title?: string;
};

export type ContainerStyleProps = { $color?: string };

export type Flag = {
  /** ISO 3166-1 alpha-2, små bogstaver. */
  code: string;
  name: string;
  message?: string;
};
