import { defaultLocale, locales } from '@/i18n/config';

const BASE_PATH = '/frontend-junior-study';

const redirectScript = `(() => {
  const locales = ${JSON.stringify(locales)};
  const cookie = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]+)/);
  const preferred = (cookie && cookie[1]) || (navigator.language || '').slice(0, 2);
  const locale = locales.includes(preferred) ? preferred : '${defaultLocale}';
  const legacy = location.hash.match(/^#\\/(week-\\d+)/);
  location.replace('${BASE_PATH}/' + locale + '/' + (legacy ? legacy[1] + '/' : ''));
})();`;

export default function RootRedirectPage() {
  return (
    <>
      <script
        // biome-ignore lint/security/noDangerouslySetInnerHtml: static, build-time redirect script for the static export
        dangerouslySetInnerHTML={{ __html: redirectScript }}
      />
      <noscript>
        <meta
          httpEquiv="refresh"
          content={`0; url=${BASE_PATH}/${defaultLocale}/`}
        />
      </noscript>
      <p>
        <a href={`${BASE_PATH}/${defaultLocale}/`}>Frontend Study</a>
      </p>
    </>
  );
}
