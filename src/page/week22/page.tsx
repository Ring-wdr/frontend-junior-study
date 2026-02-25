import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components';
import { AlertsSection } from './components/alerts-section';
import { AnalyticsSection } from './components/analytics-section';
import { BestPracticesSection } from './components/best-practices-section';
import { MonitoringIntroSection } from './components/monitoring-intro-section';
import { PrivacySection } from './components/privacy-section';
import { RumSection } from './components/rum-section';
import { SentrySection } from './components/sentry-section';
import { SessionReplaySection } from './components/session-replay-section';

const tabs = [
  'all',
  'monitoring-intro',
  'sentry',
  'session-replay',
  'rum',
  'analytics',
  'alerts',
  'best-practices',
  'privacy',
] as const;

type Tab = (typeof tabs)[number];

const sections = [
  { id: 'monitoring-intro', component: <MonitoringIntroSection /> },
  { id: 'sentry', component: <SentrySection /> },
  { id: 'session-replay', component: <SessionReplaySection /> },
  { id: 'rum', component: <RumSection /> },
  { id: 'analytics', component: <AnalyticsSection /> },
  { id: 'alerts', component: <AlertsSection /> },
  { id: 'best-practices', component: <BestPracticesSection /> },
  { id: 'privacy', component: <PrivacySection /> },
];

export default function Week22Page() {
  const { t } = useTranslation('week22');
  const tabLabelMap: Record<Tab, string> = {
    all: t('tabs.all'),
    'monitoring-intro': t('tabs.monitoring-intro'),
    sentry: t('tabs.sentry'),
    'session-replay': t('tabs.session-replay'),
    rum: t('tabs.rum'),
    analytics: t('tabs.analytics'),
    alerts: t('tabs.alerts'),
    'best-practices': t('tabs.best-practices'),
    privacy: t('tabs.privacy'),
  };

  return (
    <PageLayout
      title={t('header.title')}
      description={t('header.description')}
      tabs={tabs}
      sections={sections}
      tabLabelMap={tabLabelMap}
    />
  );
}
