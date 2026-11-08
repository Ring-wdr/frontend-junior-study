import 'server-only';
import type { Locale } from './config';
import type { Messages, Namespace } from './messages';

type Loaders = {
  [L in Locale]: { [N in Namespace]: () => Promise<Messages[N]> };
};

const loaders = {
  ko: {
    common: () =>
      import('./dictionaries/ko/common.json').then((m) => m.default),
    main: () => import('./dictionaries/ko/main.json').then((m) => m.default),
    week1: () => import('./dictionaries/ko/week1.json').then((m) => m.default),
    week2: () => import('./dictionaries/ko/week2.json').then((m) => m.default),
    week3: () => import('./dictionaries/ko/week3.json').then((m) => m.default),
    week4: () => import('./dictionaries/ko/week4.json').then((m) => m.default),
    week5: () => import('./dictionaries/ko/week5.json').then((m) => m.default),
    week6: () => import('./dictionaries/ko/week6.json').then((m) => m.default),
    week7: () => import('./dictionaries/ko/week7.json').then((m) => m.default),
    week8: () => import('./dictionaries/ko/week8.json').then((m) => m.default),
    week9: () => import('./dictionaries/ko/week9.json').then((m) => m.default),
    week10: () =>
      import('./dictionaries/ko/week10.json').then((m) => m.default),
    week11: () =>
      import('./dictionaries/ko/week11.json').then((m) => m.default),
    week12: () =>
      import('./dictionaries/ko/week12.json').then((m) => m.default),
    week13: () =>
      import('./dictionaries/ko/week13.json').then((m) => m.default),
    week14: () =>
      import('./dictionaries/ko/week14.json').then((m) => m.default),
    week15: () =>
      import('./dictionaries/ko/week15.json').then((m) => m.default),
    week16: () =>
      import('./dictionaries/ko/week16.json').then((m) => m.default),
    week17: () =>
      import('./dictionaries/ko/week17.json').then((m) => m.default),
    week18: () =>
      import('./dictionaries/ko/week18.json').then((m) => m.default),
    week19: () =>
      import('./dictionaries/ko/week19.json').then((m) => m.default),
    week20: () =>
      import('./dictionaries/ko/week20.json').then((m) => m.default),
    week21: () =>
      import('./dictionaries/ko/week21.json').then((m) => m.default),
    week22: () =>
      import('./dictionaries/ko/week22.json').then((m) => m.default),
  },
  en: {
    common: () =>
      import('./dictionaries/en/common.json').then((m) => m.default),
    main: () => import('./dictionaries/en/main.json').then((m) => m.default),
    week1: () => import('./dictionaries/en/week1.json').then((m) => m.default),
    week2: () => import('./dictionaries/en/week2.json').then((m) => m.default),
    week3: () => import('./dictionaries/en/week3.json').then((m) => m.default),
    week4: () => import('./dictionaries/en/week4.json').then((m) => m.default),
    week5: () => import('./dictionaries/en/week5.json').then((m) => m.default),
    week6: () => import('./dictionaries/en/week6.json').then((m) => m.default),
    week7: () => import('./dictionaries/en/week7.json').then((m) => m.default),
    week8: () => import('./dictionaries/en/week8.json').then((m) => m.default),
    week9: () => import('./dictionaries/en/week9.json').then((m) => m.default),
    week10: () =>
      import('./dictionaries/en/week10.json').then((m) => m.default),
    week11: () =>
      import('./dictionaries/en/week11.json').then((m) => m.default),
    week12: () =>
      import('./dictionaries/en/week12.json').then((m) => m.default),
    week13: () =>
      import('./dictionaries/en/week13.json').then((m) => m.default),
    week14: () =>
      import('./dictionaries/en/week14.json').then((m) => m.default),
    week15: () =>
      import('./dictionaries/en/week15.json').then((m) => m.default),
    week16: () =>
      import('./dictionaries/en/week16.json').then((m) => m.default),
    week17: () =>
      import('./dictionaries/en/week17.json').then((m) => m.default),
    week18: () =>
      import('./dictionaries/en/week18.json').then((m) => m.default),
    week19: () =>
      import('./dictionaries/en/week19.json').then((m) => m.default),
    week20: () =>
      import('./dictionaries/en/week20.json').then((m) => m.default),
    week21: () =>
      import('./dictionaries/en/week21.json').then((m) => m.default),
    week22: () =>
      import('./dictionaries/en/week22.json').then((m) => m.default),
  },
} satisfies Loaders;

export function getDictionary<N extends Namespace>(
  locale: Locale,
  namespace: N,
): Promise<Messages[N]> {
  return (loaders[locale][namespace] as () => Promise<Messages[N]>)();
}
