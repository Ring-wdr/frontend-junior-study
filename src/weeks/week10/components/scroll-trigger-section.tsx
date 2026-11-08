'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import { useTranslation } from '@/i18n/client';
import { SectionCard } from '../../../components/section-card';

gsap.registerPlugin(ScrollTrigger);

const NAVBAR_FALLBACK_HEIGHT = 64;

function getNavbarHeight() {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue('--nextra-navbar-height')
    .trim();
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return NAVBAR_FALLBACK_HEIGHT;
  if (value.endsWith('rem')) {
    return (
      parsed *
      Number.parseFloat(getComputedStyle(document.documentElement).fontSize)
    );
  }
  return parsed;
}

export function ScrollTriggerSection() {
  const { t } = useTranslation('week10');
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const mm = gsap.matchMedia();
    mm.add(
      '(prefers-reduced-motion: no-preference)',
      () => {
        gsap.from('.fade-item', {
          opacity: 0,
          y: 30,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.fade-section',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });

        gsap.to('.scrub-box', {
          x: () => {
            const track = container.querySelector<HTMLElement>('.scrub-track');
            const box = container.querySelector<HTMLElement>('.scrub-box');
            if (!track || !box) return 0;
            return Math.max(0, track.clientWidth - box.offsetWidth);
          },
          rotation: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: '.scrub-section',
            start: 'top center',
            end: 'bottom center',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });

        ScrollTrigger.create({
          trigger: '.pin-section',
          start: () => `top top+=${getNavbarHeight()}`,
          end: '+=300',
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
        });
      },
      container,
    );

    let frame = 0;
    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    observer.observe(document.body);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      mm.revert();
    };
  }, []);

  return (
    <SectionCard description={t('scrollTrigger.description')}>
      <div ref={containerRef} className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-gray-50">
          <div className="flex items-center justify-center gap-2 rounded-t-xl bg-linear-to-br from-blue-500 to-cyan-400 py-4 text-sm font-medium text-white">
            <span className="opacity-90">{t('scrollTrigger.scrollDown')}</span>
            <span aria-hidden="true">↓</span>
          </div>

          <div className="fade-section space-y-3 p-3 sm:p-4">
            <h3 className="text-base font-bold text-gray-800">
              {t('scrollTrigger.triggerAnimation')}
            </h3>
            <div className="fade-item p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              Item 1
            </div>
            <div className="fade-item p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              Item 2
            </div>
            <div className="fade-item p-3 bg-white rounded-xl shadow-sm border border-gray-100">
              Item 3
            </div>
          </div>

          <div className="scrub-section overflow-hidden bg-gray-100 p-3 py-10 sm:p-4 sm:py-12">
            <h3 className="mb-6 text-base font-bold text-gray-800">
              {t('scrollTrigger.scrubAnimation')}
            </h3>
            <div className="scrub-track">
              <div className="scrub-box w-14 h-14 bg-orange-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold text-xs">
                SCRUB
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              {t('scrollTrigger.scrubDescription')}
            </p>
          </div>

          <div className="pin-section flex h-64 items-center justify-center bg-indigo-600 text-white">
            <div className="text-center p-4">
              <h3 className="text-xl font-bold mb-2">
                {t('scrollTrigger.pinnedSection')}
              </h3>
              <p className="text-sm opacity-80">
                {t('scrollTrigger.pinnedDescription')}
              </p>
            </div>
          </div>

          <div className="flex h-24 items-center justify-center rounded-b-xl bg-white text-sm text-gray-400">
            {t('scrollTrigger.endOfContent')}
          </div>
        </div>

        <div className="p-3 sm:p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
          <h4 className="font-semibold text-gray-900 mb-2">
            {t('scrollTrigger.codeSnippet')}
          </h4>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg text-xs overflow-x-auto">
            {`gsap.to(".box", {
  scrollTrigger: {
    trigger: ".section", // 애니메이션 시작 기준 요소
    start: "top center", // [트리거 기준, 뷰포트 기준]
    end: "bottom center",
    scrub: true, // 스크롤 동기화
    pin: true // 화면 고정
  },
  x: 500
});`}
          </pre>
        </div>
      </div>
    </SectionCard>
  );
}
