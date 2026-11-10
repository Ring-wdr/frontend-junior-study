'use client';

import {
  Bot,
  Brain,
  GitBranch,
  type LucideIcon,
  User,
  Wrench,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { StablePanels } from '../../../components/ui/stable-panels';
import { Chip, PrevNext } from './ai-agents-section-controls';

const iconMap: Record<string, LucideIcon> = {
  bot: Bot,
  zap: Zap,
  brain: Brain,
  'git-branch': GitBranch,
  wrench: Wrench,
  user: User,
};

interface PickerItem {
  name: string;
  desc: string;
  icon?: string;
}

interface AiAgentsSectionPickerProps {
  items: PickerItem[];
  pickLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export const AiAgentsSectionPicker = ({
  items,
  pickLabel,
  prevLabel,
  nextLabel,
}: AiAgentsSectionPickerProps) => {
  const [index, setIndex] = useState(0);

  return (
    <div>
      <p className="text-sm font-semibold text-gray-700">{pickLabel}</p>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3">
        {items.map((entry, i) => (
          <Chip
            key={entry.name}
            selected={i === index}
            onSelect={() => setIndex(i)}
          >
            {entry.name}
          </Chip>
        ))}
      </div>
      <PrevNext
        index={index}
        total={items.length}
        onChange={setIndex}
        prevLabel={prevLabel}
        nextLabel={nextLabel}
      />
      <StablePanels index={index} className="mt-3">
        {items.map((item) => {
          const Icon = item.icon ? iconMap[item.icon] : undefined;
          return (
            <div
              key={item.name}
              className="h-full rounded-xl border border-purple-200 bg-white p-3 sm:p-4"
            >
              <h4 className="flex items-center gap-2 text-sm font-bold text-purple-900 break-words">
                {Icon && (
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                )}
                {item.name}
              </h4>
              <p className="mt-2 text-sm leading-relaxed text-gray-700 break-words">
                {item.desc}
              </p>
            </div>
          );
        })}
      </StablePanels>
    </div>
  );
};
