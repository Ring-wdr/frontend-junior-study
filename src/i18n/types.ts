type Index = `${number}`;

export type Path<T> = T extends readonly (infer E)[]
  ? Index | `${Index}.${Path<E>}`
  : T extends object
    ? {
        [K in keyof T & string]: K | `${K}.${Path<T[K]>}`;
      }[keyof T & string]
    : never;

export type StringPath<T> = T extends readonly (infer E)[]
  ? (E extends string ? Index : never) | `${Index}.${StringPath<E>}`
  : T extends object
    ? {
        [K in keyof T & string]: T[K] extends string
          ? K
          : `${K}.${StringPath<T[K]>}`;
      }[keyof T & string]
    : never;

type Segment<T, K extends string> = T extends readonly (infer E)[]
  ? K extends Index
    ? E
    : never
  : K extends keyof T
    ? T[K]
    : never;

export type PathValue<T, P extends string> = P extends `${infer H}.${infer R}`
  ? PathValue<Segment<T, H>, R>
  : Segment<T, P>;

export type InterpolationValues = Record<string, string | number>;
