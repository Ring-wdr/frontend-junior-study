import type { LoadedMessages } from '@/i18n/client';
import type { Locale } from '@/i18n/config';
import type { Namespace } from '@/i18n/messages';

const dictionaries = import.meta.glob<{ default: unknown }>(
  '../../../../src/i18n/dictionaries/*/*.json',
);

function isNamespace(value: unknown): value is Namespace {
  return typeof value === 'string' && /^(common|main|week\d+)$/.test(value);
}

export async function loadMessages(
  locale: Locale,
  namespace: unknown,
): Promise<LoadedMessages> {
  if (!isNamespace(namespace)) return {};
  const load =
    dictionaries[
      `../../../../src/i18n/dictionaries/${locale}/${namespace}.json`
    ];
  if (!load) throw new Error(`Missing dictionary ${locale}/${namespace}`);
  const { default: messages } = await load();
  return { [namespace]: messages } as LoadedMessages;
}
