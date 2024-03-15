declare module 'html-parse-stringify' {
  export type TagNode = {
    type: 'tag';
    name: string;
    voidElement: boolean;
    attrs: { [attr: string]: string };
    children: HTMLAstNode[];
  };

  export type TextNode = {
    type: 'text';
    content: string;
  };

  export type ComponentNode = {
    type: 'component';
    name: string;
    voidElement: boolean;
    attrs: { [attr: string]: string };
    children: HTMLAstNode[];
  };

  export type HTMLAstNode = ComponentNode | TagNode | TextNode;

  interface htmlParseStringify {
    parse(html: string, options?: IParseOptions): Array<HTMLAstNode>;
    stringify(ast: HTMLAstNode[]): string;
  }

  export interface IParseOptions {
    components: Record<string, any>;
  }

  const htmlParseStringify: htmlParseStringify;

  export = htmlParseStringify;
}
