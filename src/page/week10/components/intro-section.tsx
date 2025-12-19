import { Cpu, Layers, Milestone, Zap } from 'lucide-react';

export function IntroSection() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-green-600 to-lime-600">
          왜 JS 애니메이션인가?
        </h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          CSS만으로 충분하지 않은 상황이 있습니다. 복잡한 타이밍 제어,
          순차적/병렬 움직임, SVG나 Canvas 영역 제어, 그리고 스크롤 기반
          인터랙션이 필요할 때 JS 애니메이션 라이브러리인 <b>GSAP</b>은 강력한
          도구가 됩니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
            <div className="p-2.5 rounded-lg bg-white shadow-sm text-green-600">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                정교한 타이밍 제어
              </h3>
              <p className="text-sm text-gray-500">
                CSS로는 어려운 복잡한 시퀀스와 딜레이, 속도 제어가 가능합니다.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
            <div className="p-2.5 rounded-lg bg-white shadow-sm text-blue-600">
              <Layers size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                복합적인 움직임
              </h3>
              <p className="text-sm text-gray-500">
                여러 요소가 서로 상호작용하며 순차적으로 움직이는 타임라인을
                구성할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
            <div className="p-2.5 rounded-lg bg-white shadow-sm text-purple-600">
              <Cpu size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                DOM 외 영역 제어
              </h3>
              <p className="text-sm text-gray-500">
                SVG, Canvas, Three.js 객체의 속성까지 애니메이션 할 수 있습니다.
              </p>
            </div>
          </div>

          <div className="p-5 rounded-xl bg-gray-50 border border-gray-100 flex gap-4 items-start">
            <div className="p-2.5 rounded-lg bg-white shadow-sm text-orange-600">
              <Milestone size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                스크롤 인터랙션
              </h3>
              <p className="text-sm text-gray-500">
                스크롤 진행도에 따라 UI가 변화하거나 고정(Pin)되는 효과를 쉽게
                구현합니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
