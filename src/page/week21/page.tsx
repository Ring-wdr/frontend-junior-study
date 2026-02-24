import { useTranslation } from 'react-i18next';
import { PageLayout } from '../../components';
import { CiCdCapstoneSection } from './components/capstone-section';
import { CdDeploymentSection } from './components/cd-pipeline-section';
import { CiPipelineSection } from './components/ci-pipeline-section';
import { DockerSection } from './components/docker-orchestration-section';
import { CiCdFoundationSection } from './components/foundations-section';
import { GitHubActionsSection } from './components/github-actions-section';
import { CiCdGovernanceSection } from './components/governance-section';

const tabs = [
  'all',
  'foundations',
  'github-actions',
  'ci-pipeline',
  'cd-pipeline',
  'docker',
  'governance',
  'capstone',
] as const;

type Tab = (typeof tabs)[number];

const sections = [
  { id: 'foundations', component: <CiCdFoundationSection /> },
  { id: 'github-actions', component: <GitHubActionsSection /> },
  { id: 'ci-pipeline', component: <CiPipelineSection /> },
  { id: 'cd-pipeline', component: <CdDeploymentSection /> },
  { id: 'docker', component: <DockerSection /> },
  { id: 'governance', component: <CiCdGovernanceSection /> },
  { id: 'capstone', component: <CiCdCapstoneSection /> },
];

export default function Week21Page() {
  const { t } = useTranslation('week21');
  const tabLabelMap: Record<Tab, string> = {
    all: t('tabs.all'),
    foundations: t('tabs.foundations'),
    'github-actions': t('tabs.github-actions'),
    'ci-pipeline': t('tabs.ci-pipeline'),
    'cd-pipeline': t('tabs.cd-pipeline'),
    docker: t('tabs.docker'),
    governance: t('tabs.governance'),
    capstone: t('tabs.capstone'),
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
