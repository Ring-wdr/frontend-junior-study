import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export function ScrollTriggerSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade in on enter
      gsap.from('.fade-item', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
          trigger: '.fade-section',
          scroller: scrollerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      // 2. Scrub animation (Box moves with scroll)
      gsap.to('.scrub-box', {
        x: 250,
        rotation: 360,
        scrollTrigger: {
          trigger: '.scrub-section',
          scroller: scrollerRef.current,
          start: 'top center',
          end: 'bottom center',
          scrub: 1, // smooth scrubbing
        },
      });

      // 3. Pinning section
      ScrollTrigger.create({
        trigger: '.pin-section',
        scroller: scrollerRef.current,
        start: 'top top',
        end: '+=300', // pin for 300px
        pin: true,
        pinSpacing: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="space-y-6" ref={containerRef}>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">ScrollTrigger</h2>
        <p className="text-gray-600">
          스크롤 위치에 따라 애니메이션을 제어합니다. 아래 박스 내부를
          스크롤해보세요.
        </p>

        {/* Mock Window/Phone Frame */}
        <div className="mx-auto max-w-md border-8 border-gray-800 rounded-4xl overflow-hidden shadow-2xl bg-white relative">
          {/* Camera bump */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-800 rounded-b-xl z-20"></div>

          {/* Scrollable Screen */}
          <div
            ref={scrollerRef}
            className="h-[400px] overflow-y-auto bg-gray-50 scrollbar-hide scroll-smooth relative"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Hero */}
            <div className="h-[300px] flex items-center justify-center bg-linear-to-br from-blue-500 to-cyan-400 text-white flex-col gap-2">
              <span className="text-sm font-medium opacity-80">
                Scroll Down
              </span>
              <div className="animate-bounce">↓</div>
            </div>

            {/* Section 1: Fade In */}
            <div className="fade-section py-20 px-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-800 mb-6">
                Trigger Animation
              </h3>
              <div className="fade-item p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                Item 1
              </div>
              <div className="fade-item p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                Item 2
              </div>
              <div className="fade-item p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                Item 3
              </div>
            </div>

            {/* Section 2: Scrub */}
            <div className="scrub-section py-20 px-6 bg-gray-100 overflow-hidden">
              <h3 className="text-xl font-bold text-gray-800 mb-12">
                Scrub Animation
              </h3>
              <div className="scrub-box w-16 h-16 bg-orange-500 rounded-lg shadow-md flex items-center justify-center text-white font-bold text-xs">
                SCRUB
              </div>
              <p className="text-xs text-gray-500 mt-4">
                스크롤 속도에 맞춰 움직입니다.
              </p>
            </div>

            {/* Section 3: Pin */}
            <div className="pin-section h-[400px] bg-indigo-600 flex items-center justify-center text-white">
              <div className="text-center p-6">
                <h3 className="text-2xl font-bold mb-2">Pinned Section</h3>
                <p className="opacity-80">이 섹션은 잠시 고정됩니다.</p>
              </div>
            </div>

            <div className="h-[300px] bg-white flex items-center justify-center text-gray-400">
              End of Content
            </div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg text-sm text-gray-500">
          <h4 className="font-semibold text-gray-900 mb-2">Code Snippet</h4>
          <pre className="bg-gray-900 text-gray-100 p-3 rounded-lg overflow-x-auto whitespace-pre-wrap">
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
    </div>
  );
}
