export type StyleUpdates =
    | Partial<CSSStyleDeclaration>
    | {
          [key: string]: string | number | null | undefined;
      };
