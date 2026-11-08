import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generateStaticParamsFor, importPage } from 'nextra/pages';
import { I18nProvider, type LoadedMessages } from '@/i18n/client';
import { isLocale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import type { Namespace } from '@/i18n/messages';
import { useMDXComponents as getMDXComponents } from '@/mdx-components';

export const generateStaticParams = generateStaticParamsFor('mdxPath');

interface PageProps {
  params: Promise<{ lang: string; mdxPath?: string[] }>;
}

const Wrapper = getMDXComponents().wrapper;

function isNamespace(value: unknown): value is Namespace {
  return typeof value === 'string' && /^(common|main|week\d+)$/.test(value);
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, mdxPath } = await props.params;
  const { metadata } = await importPage(mdxPath, lang);
  return metadata;
}

export default async function Page(props: PageProps) {
  const params = await props.params;
  const { lang, mdxPath } = params;
  if (!isLocale(lang)) notFound();

  const {
    default: MDXContent,
    toc,
    metadata,
    sourceCode,
  } = await importPage(mdxPath, lang);

  const namespace = 'namespace' in metadata ? metadata.namespace : undefined;
  const messages: LoadedMessages = isNamespace(namespace)
    ? { [namespace]: await getDictionary(lang, namespace) }
    : {};

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <I18nProvider locale={lang} messages={messages}>
        <MDXContent {...props} params={params} />
      </I18nProvider>
    </Wrapper>
  );
}
