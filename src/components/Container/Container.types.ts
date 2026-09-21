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
