import { useTranslation } from 'react-i18next';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

type Strategy = {
  name: string;
  desc: string;
};

export const CommunicationSection = () => {
  const { t } = useTranslation('week20');
  const strategies = t('communication.strategies', {
    returnObjects: true,
  }) as unknown as Strategy[];

  return (
    <SectionCard
      badge={{ label: t('communication.badge'), color: 'green' }}
      title={t('communication.title')}
      description={t('communication.description')}
    >
      <div className="space-y-8">
        <SubSection
          title={t('communication.strategyTitle')}
          icon
          iconColor="green"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {strategies.map((strategy) => (
              <div
                key={strategy.name}
                className="rounded-xl border border-green-100 bg-green-50 p-4"
              >
                <h4 className="text-sm font-semibold text-green-900 mb-2">
                  {strategy.name}
                </h4>
                <p className="text-xs text-green-800">{strategy.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>

        <SubSection title={t('communication.eventTitle')} icon iconColor="blue">
          <CodeBlock
            language="typescript"
            code={`export const MFE_EVENTS = {
  USER_LOGIN: 'mfe:user:login',
  CART_UPDATED: 'mfe:cart:updated',
} as const;

export function emitEvent<T>(eventName: string, detail: T) {
  window.dispatchEvent(new CustomEvent(eventName, { detail }));
}

export function subscribeEvent<T>(
  eventName: string,
  handler: (event: CustomEvent<T>) => void,
) {
  window.addEventListener(eventName, handler as EventListener);
  return () => window.removeEventListener(eventName, handler as EventListener);
}`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('communication.sharedStoreTitle')}
          icon
          iconColor="purple"
        >
          <CodeBlock
            language="typescript"
            code={`interface UserState {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

new ModuleFederationPlugin({
  shared: {
    'shared-store': { singleton: true },
    zustand: { singleton: true },
  },
});`}
            className="text-xs"
          />
        </SubSection>

        <InfoBox variant="blue" title={t('communication.ruleTitle')}>
          <p>{t('communication.rule')}</p>
        </InfoBox>
      </div>
    </SectionCard>
  );
};
