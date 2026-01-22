import { Link } from 'react-router-dom';
import { userCategories } from '../data/translations';
import { TrendingUp, BookOpen, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function Home() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) {
          observer.unobserve(section);
        }
      });
    };
  }, []);

  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: '실시간 번역',
      description: '텍스트를 드래그하면 즉시 쉬운 말로 번역해드려요'
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: '풍부한 사전',
      description: '판교어부터 디지털 기초까지 다양한 용어 수록'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: '맞춤형 학습',
      description: '내 수준에 맞는 설명과 예시 제공'
    }
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section - 항상 표시 */}
      <section className="text-center py-12 px-4 fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
          모르는 단어, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">
            이제 쉽게 이해하세요
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          디지털 문맹 탈출부터 판교어 번역까지, 
          모두를 위한 친절한 번역 플랫폼
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/search"
            className="px-8 py-3 bg-primary-600 text-white rounded-full font-semibold hover:bg-primary-700 transition-colors shadow-lg hover:shadow-xl"
          >
            지금 시작하기
          </Link>
          <Link
            to="/guide"
            className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors"
          >
            사용법 보기
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            ref={(el) => (sectionsRef.current[index] = el)}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100 scroll-reveal"
            style={{ transitionDelay: `${index * 0.2}s` }}
          >
            <div className="text-primary-600 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </section>

      {/* Categories */}
      <section className="px-4">
        <h2 
          ref={(el) => (sectionsRef.current[3] = el)}
          className="text-3xl font-bold text-center text-gray-800 mb-8 scroll-reveal"
        >
          당신에게 맞는 학습 방법을 선택하세요
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {userCategories.map((category, index) => {
            // 카테고리별 색상 매핑
            const colorMap: Record<string, { from: string; to: string; border: string; button: string }> = {
              senior: {
                from: 'from-green-50',
                to: 'to-emerald-50',
                border: 'border-green-200',
                button: 'bg-green-500'
              },
              mz: {
                from: 'from-pink-50',
                to: 'to-rose-50',
                border: 'border-pink-200',
                button: 'bg-pink-500'
              },
              newbie: {
                from: 'from-blue-50',
                to: 'to-indigo-50',
                border: 'border-blue-200',
                button: 'bg-blue-500'
              }
            };
            
            const colors = colorMap[category.id] || colorMap.newbie;
            
            return (
              <Link
                key={category.id}
                ref={(el) => (sectionsRef.current[4 + index] = el)}
                to={`/category/${category.id}`}
                className={`bg-gradient-to-br ${colors.from} ${colors.to} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 ${colors.border} scroll-reveal`}
                style={{ transitionDelay: `${index * 0.5}s` }}
              >
                <div className="mb-4">
                  {/* Lucide Icon 렌더링 */}
                  <category.icon className="w-16 h-16 text-gray-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {category.name}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {category.description}
                </p>
                <div className={`mt-4 inline-block px-4 py-2 ${colors.button} text-white rounded-full text-sm font-semibold`}>
                  시작하기 →
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Demo Section */}
      <section className="px-4">
        <h2 
          ref={(el) => (sectionsRef.current[7] = el)}
          className="text-2xl font-bold text-gray-800 mb-6 text-center scroll-reveal"
        >
          💡 사용 팁: 텍스트를 드래그해보세요!
        </h2>
        
        <div 
          ref={(el) => (sectionsRef.current[8] = el)}
          className="bg-white rounded-2xl shadow-xl p-8 scroll-reveal"
        >
          <div className="space-y-4">
            {/* 판교어 예시 */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-lg border-2 border-orange-200">
              <p className="text-sm text-orange-600 font-semibold mb-2">🏢 판교어 예시</p>
              <p className="text-lg leading-relaxed text-gray-700">
                회의에서 팀장님이 "이번 프로젝트는 <span className="font-bold text-orange-600 cursor-pointer hover:bg-orange-100 px-1 rounded">린하게</span> 진행하고, 
                일단 <span className="font-bold text-orange-600 cursor-pointer hover:bg-orange-100 px-1 rounded">MVP</span>부터 만들어봅시다. 
                각자 맡은 부분 <span className="font-bold text-orange-600 cursor-pointer hover:bg-orange-100 px-1 rounded">어레인지</span>해서 
                금요일까지 <span className="font-bold text-orange-600 cursor-pointer hover:bg-orange-100 px-1 rounded">컨펌</span> 받아주세요"라고 말씀하셨습니다.
              </p>
            </div>

            {/* MZ 트렌드 예시 */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-lg border-2 border-pink-200">
              <p className="text-sm text-pink-600 font-semibold mb-2">✨ MZ 트렌드 예시</p>
              <p className="text-lg leading-relaxed text-gray-700">
                친구가 "게임 이겼다! <span className="font-bold text-pink-600 cursor-pointer hover:bg-pink-100 px-1 rounded">야르</span>! 
                자료 공유 <span className="font-bold text-pink-600 cursor-pointer hover:bg-pink-100 px-1 rounded">아자스</span>! 
                이 로고 색 조합 좀 <span className="font-bold text-pink-600 cursor-pointer hover:bg-pink-100 px-1 rounded">밤티</span>나는데? 
                저 옷 진짜 <span className="font-bold text-pink-600 cursor-pointer hover:bg-pink-100 px-1 rounded">도티낳는데</span>!"라고 말했습니다.
              </p>
            </div>
          </div>

          <p className="text-sm text-gray-500 mt-4 text-center">
            ↑ 색깔 있는 단어를 마우스로 드래그하면 즉시 번역됩니다!
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="text-center py-8 px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div 
            ref={(el) => (sectionsRef.current[9] = el)}
            className="bg-gradient-to-br from-orange-50 to-amber-50 p-6 rounded-xl border-2 border-orange-200 scroll-reveal"
          >
            <div className="text-3xl font-bold text-orange-600 mb-2">31+</div>
            <div className="text-sm text-gray-600">판교어</div>
          </div>
          <div 
            ref={(el) => (sectionsRef.current[10] = el)}
            className="bg-gradient-to-br from-blue-50 to-sky-50 p-6 rounded-xl border-2 border-blue-200 scroll-reveal"
            style={{ transitionDelay: '0.2s' }}
          >
            <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
            <div className="text-sm text-gray-600">디지털 기초</div>
          </div>
          <div 
            ref={(el) => (sectionsRef.current[11] = el)}
            className="bg-gradient-to-br from-pink-50 to-rose-50 p-6 rounded-xl border-2 border-pink-200 scroll-reveal"
            style={{ transitionDelay: '0.4s' }}
          >
            <div className="text-3xl font-bold text-pink-600 mb-2">6+</div>
            <div className="text-sm text-gray-600">MZ 트렌드</div>
          </div>
          <div 
            ref={(el) => (sectionsRef.current[12] = el)}
            className="bg-gradient-to-br from-purple-50 to-violet-50 p-6 rounded-xl border-2 border-purple-200 scroll-reveal"
            style={{ transitionDelay: '0.6s' }}
          >
            <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
            <div className="text-sm text-gray-600">AI 번역</div>
          </div>
        </div>
      </section>
    </div>
  );
}
