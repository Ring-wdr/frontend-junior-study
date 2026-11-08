export type Messages = {
  common: typeof import('./dictionaries/ko/common.json');
  main: typeof import('./dictionaries/ko/main.json');
  week1: typeof import('./dictionaries/ko/week1.json');
  week2: typeof import('./dictionaries/ko/week2.json');
  week3: typeof import('./dictionaries/ko/week3.json');
  week4: typeof import('./dictionaries/ko/week4.json');
  week5: typeof import('./dictionaries/ko/week5.json');
  week6: typeof import('./dictionaries/ko/week6.json');
  week7: typeof import('./dictionaries/ko/week7.json');
  week8: typeof import('./dictionaries/ko/week8.json');
  week9: typeof import('./dictionaries/ko/week9.json');
  week10: typeof import('./dictionaries/ko/week10.json');
  week11: typeof import('./dictionaries/ko/week11.json');
  week12: typeof import('./dictionaries/ko/week12.json');
  week13: typeof import('./dictionaries/ko/week13.json');
  week14: typeof import('./dictionaries/ko/week14.json');
  week15: typeof import('./dictionaries/ko/week15.json');
  week16: typeof import('./dictionaries/ko/week16.json');
  week17: typeof import('./dictionaries/ko/week17.json');
  week18: typeof import('./dictionaries/ko/week18.json');
  week19: typeof import('./dictionaries/ko/week19.json');
  week20: typeof import('./dictionaries/ko/week20.json');
  week21: typeof import('./dictionaries/ko/week21.json');
  week22: typeof import('./dictionaries/ko/week22.json');
};

export type Namespace = keyof Messages;
