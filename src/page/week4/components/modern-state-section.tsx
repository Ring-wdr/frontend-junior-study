import { InfoBox, SectionCard } from '../../../components';
import { ModernStateVisualizer } from './modern-state-visualizer';

export const ModernStateSection = () => {
  return (
    <SectionCard
      badge={{ label: 'Modern Libraries', color: 'pink' }}
      title="Modern State Management"
      description="Exploring lighter, more reactive alternatives to Redux: MobX, Recoil, and Zustand."
    >
      <div className="space-y-6">
        <InfoBox variant="blue" title="Evolution">
          <p className="text-sm text-gray-700">
            While Redux is powerful, its boilerplate led to the rise of
            libraries focusing on developer experience, less code, and better
            React integration.
          </p>
        </InfoBox>

        <ul className="space-y-4">
          <li>
            <h4 className="font-semibold text-gray-900 mb-1">MobX</h4>
            <p className="text-sm text-gray-600">
              Uses observable state and decorators (<code>@observable</code>,{' '}
              <code>@observer</code>). It embraces mutable state and updates
              components automatically when observed data changes.
            </p>
          </li>
          <li>
            <h4 className="font-semibold text-gray-900 mb-1">Recoil</h4>
            <p className="text-sm text-gray-600">
              Created by Facebook. Introduces <strong>Atoms</strong> (shared
              state) and <strong>Selectors</strong> (derived state). Designed
              for Concurrent Mode compatibility and efficient rendering.
            </p>
          </li>
          <li>
            <h4 className="font-semibold text-gray-900 mb-1">Zustand</h4>
            <p className="text-sm text-gray-600">
              A small, fast, and scalable bearbones state-management solution.
              It uses a hook-based API without a Provider, making it extremely
              simple to set up and use.
            </p>
          </li>
        </ul>
      </div>
    </SectionCard>
  );
};
