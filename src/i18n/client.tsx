'use client';

import {
  cloneElement,
  createContext,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
  useContext,
} from 'react';
import type { Locale } from './config';
import type { Messages, Namespace } from './messages';
import type { InterpolationValues, Path, PathValue, StringPath } from './types';

export type LoadedMessages = { [N in Namespace]?: Messages[N] };

interface I18nContextValue {
  locale: Locale;
  messages: LoadedMessages;
}

const I18nContext = createContext<I18nContextValue | null>(null);

let fallbackContext: I18nContextValue | null = null;

export function setFallbackI18n(value: I18nContextValue) {
  fallbackContext = value;
}

export function I18nProvider({
  locale,
  messages,
  children,
}: I18nContextValue & { children: ReactNode }) {
  return (
    <I18nContext.Provider value={{ locale, messages }}>
      {children}
    </I18nContext.Provider>
  );
}

function useI18nContext() {
  const value = useContext(I18nContext) ?? fallbackContext;
  if (!value) {
    throw new Error('useTranslation must be used inside <I18nProvider>.');
  }
  return value;
}

export function useLocale(): Locale {
  return useI18nContext().locale;
}

function lookup(source: unknown, key: string): unknown {
  let current = source;
  for (const part of key.split('.')) {
    if (current === null || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function interpolate(template: string, values?: InterpolationValues) {
  if (!values) return template;
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, name: string) =>
    name in values ? String(values[name]) : match,
  );
}

export type TFunction<N extends Namespace> = (
  key: StringPath<Messages[N]>,
  values?: InterpolationValues,
) => string;

export function useTranslation<N extends Namespace>(namespace: N) {
  const { locale, messages } = useI18nContext();
  const dictionary = messages[namespace];
  if (!dictionary) {
    throw new Error(`i18n namespace "${namespace}" is not loaded.`);
  }

  const t: TFunction<N> = (key, values) => {
    const value = lookup(dictionary, key);
    return typeof value === 'string' ? interpolate(value, values) : key;
  };

  const raw = <K extends Path<Messages[N]>>(
    key: K,
  ): PathValue<Messages[N], K> => {
    const value = lookup(dictionary, key);
    if (value === undefined) {
      throw new Error(`Missing i18n key "${namespace}:${key}".`);
    }
    return value as PathValue<Messages[N], K>;
  };

  return { t, raw, locale };
}

const BASIC_TAGS = new Set(['br', 'strong', 'b', 'i', 'em', 'code']);
const TAG_PATTERN = /<(\w+)\s*\/>|<(\w+)>([\s\S]*?)<\/\2>/g;

function renderRich(
  text: string,
  components: Record<string, ReactElement>,
  keyPrefix: string,
): ReactNode[] {
  const nodes: ReactNode[] = [];
  let cursor = 0;
  let index = 0;
  for (const match of text.matchAll(TAG_PATTERN)) {
    const [whole, selfClosing, tag, inner] = match;
    const name = selfClosing ?? tag;
    const component = components[name];
    if (!component && !BASIC_TAGS.has(name)) continue;

    const start = match.index ?? 0;
    if (start > cursor) nodes.push(text.slice(cursor, start));
    cursor = start + whole.length;

    const key = `${keyPrefix}-${index++}`;
    const children =
      inner === undefined ? undefined : renderRich(inner, components, key);
    if (component && isValidElement(component)) {
      nodes.push(cloneElement(component, { key }, children));
    } else {
      const Tag = name as 'strong';
      nodes.push(<Tag key={key}>{children}</Tag>);
    }
  }
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

interface TransProps<K extends string> {
  t: (key: K, values?: InterpolationValues) => string;
  i18nKey: NoInfer<K>;
  values?: InterpolationValues;
  components?: Record<string, ReactElement>;
}

export function Trans<K extends string>({
  t,
  i18nKey,
  values,
  components = {},
}: TransProps<K>) {
  return (
    <Fragment>{renderRich(t(i18nKey, values), components, i18nKey)}</Fragment>
  );
}
