'use client';

import { ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';
import { useTranslation } from '@/i18n/client';
import { cn } from '../../../lib/utils';

interface StepControlsProps {
  step: number;
  total: number;
  onChange: (step: number) => void;
  testId: string;
}

const buttonClass =
  'flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500';

export const StepControls = ({
  step,
  total,
  onChange,
  testId,
}: StepControlsProps) => {
  const { t } = useTranslation('week1');
  const atStart = step === 0;
  const atEnd = step === total - 1;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(step - 1)}
        disabled={atStart}
        data-testid={`${testId}-prev`}
        className={cn(
          buttonClass,
          atStart
            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
        )}
      >
        <ChevronLeft className="h-4 w-4" />
        {t('stepper.prev')}
      </button>
      <button
        type="button"
        onClick={() => onChange(step + 1)}
        disabled={atEnd}
        data-testid={`${testId}-next`}
        className={cn(
          buttonClass,
          atEnd
            ? 'cursor-not-allowed bg-gray-100 text-gray-400'
            : 'bg-blue-600 text-white hover:bg-blue-700',
        )}
      >
        {t('stepper.next')}
        <ChevronRight className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => onChange(0)}
        data-testid={`${testId}-reset`}
        className={cn(buttonClass, 'bg-gray-600 text-white hover:bg-gray-700')}
      >
        <RotateCcw className="h-4 w-4" />
        {t('stepper.reset')}
      </button>
      <span
        className="ml-auto text-xs font-medium text-gray-500"
        data-testid={`${testId}-progress`}
      >
        {t('stepper.progress', { step: step + 1, total })}
      </span>
    </div>
  );
};
