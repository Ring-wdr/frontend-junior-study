import defaultMdxComponents from 'fumadocs-ui/mdx';
import { DocsBody } from 'fumadocs-ui/layouts/docs/page';
import type { MDXComponents } from 'mdx/types';
import { I18nProvider, type LoadedMessages } from '@/i18n/client';
import { MotionProvider } from '@/components/motion-provider';
import { toLocale } from '~/lib/locale';
import { ContentProvider, type ProviderProps } from '~/components/provider';
import { AdvancedDataStructureSection } from '@/weeks/week1/components/advanced-data-structure-section';
import { AsyncSection } from '@/weeks/week1/components/async-section';
import { DslSection } from '@/weeks/week1/components/dsl-section';
import { EventLoopSection } from '@/weeks/week1/components/event-loop-section';
import { OptimizationSection } from '@/weeks/week1/components/optimization-section';
import { ProxyMetaSection } from '@/weeks/week1/components/proxy-meta-section';
import { ScopeClosureSection } from '@/weeks/week1/components/scope-closure-section';
import { ThisBindingSection } from '@/weeks/week1/components/this-binding-section';
import { BehavioralPatternsSection } from '@/weeks/week2/components/behavioral-patterns-section';
import { CreationPatternsSection } from '@/weeks/week2/components/creation-patterns-section';
import { FpIntroductionSection } from '@/weeks/week2/components/fp-introduction-section';
import { OopSolidSection } from '@/weeks/week2/components/oop-solid-section';
import { StructuralPatternsSection } from '@/weeks/week2/components/structural-patterns-section';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components,
  } satisfies MDXComponents;
}

interface ContentProps extends ProviderProps {
  messages: LoadedMessages;
}

const sectionComponents = {
  AdvancedDataStructureSection,
  AsyncSection,
  DslSection,
  EventLoopSection,
  OptimizationSection,
  ProxyMetaSection,
  ScopeClosureSection,
  ThisBindingSection,
  BehavioralPatternsSection,
  CreationPatternsSection,
  FpIntroductionSection,
  OopSolidSection,
  StructuralPatternsSection,
};

export default getMDXComponents({
  ...sectionComponents,
  wrapper: ({ children, messages, ...props }: ContentProps) => (
    <ContentProvider {...props}>
      <I18nProvider locale={toLocale(props.lang)} messages={messages}>
        <MotionProvider>
          <DocsBody>{children}</DocsBody>
        </MotionProvider>
      </I18nProvider>
    </ContentProvider>
  ),
});
