import { expect } from '@rstest/core';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { setFallbackI18n } from './src/i18n/client';
import { enMessages } from './tests/en-messages';

expect.extend(jestDomMatchers);

setFallbackI18n({ locale: 'en', messages: enMessages });
