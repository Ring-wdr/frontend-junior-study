import { uiTranslations } from 'fumadocs-ui/i18n';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { i18n } from '~/lib/i18n';

export const translations = i18n
  .translations()
  .extend(uiTranslations())
  .add({
    ko: {
      displayName: '한국어',
      'Choose a language(language switcher)': '언어 선택',
      'On this page(table of contents)': '이 페이지에서',
      'No Headings(table of contents)': '제목 없음',
      'Search(search trigger)': '검색',
      'Search(search dialog)': '문서 검색…',
      'No results found(search dialog)': '검색 결과가 없습니다.',
      'Search failed(search dialog)': '검색에 실패했습니다.',
      'Next Page(pagination)': '다음',
      'Previous Page(pagination)': '이전',
      'Edit on GitHub(edit page)': 'GitHub에서 수정',
      'Last updated on(page footer)': '마지막 업데이트',
      'Copy Text(code block)(aria-label)': '코드 복사',
      'Copied Text(code block)(aria-label)': '복사됨',
      'Toggle Menu(mobile menu)(aria-label)': '메뉴 열기/닫기',
      'Skip to Content(skip link)': '본문으로 건너뛰기',
    },
    en: { displayName: 'English' },
  });

export function baseOptions(locale: string): BaseLayoutProps {
  return {
    nav: {
      title: locale === 'ko' ? '프론트엔드 스터디' : 'Frontend Study',
      url: locale === i18n.defaultLanguage ? '/' : `/${locale}`,
    },
    themeSwitch: { enabled: false },
    githubUrl: 'https://github.com/ring-wdr/frontend-junior-study',
  };
}
