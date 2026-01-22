import { Link } from 'react-router-dom';
import { userCategories } from '../data/translations';
import { TrendingUp, BookOpen, Sparkles } from 'lucide-react';

export default function Home() {
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
    <div className="space-y-12 fade-in">
      {/* Hero Section */}
      <section className="text-center py-12 px-4">
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
          <button className="px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-50 transition-colors">
            사용법 보기
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6 px-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-100"
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
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          당신에게 맞는 학습 방법을 선택하세요
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {userCategories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className={`bg-gradient-to-br from-${category.color}-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 border-2 border-${category.color}-200`}
            >
              <div className="text-6xl mb-4">{category.icon}</div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {category.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {category.description}
              </p>
              <div className={`mt-4 inline-block px-4 py-2 bg-${category.color}-500 text-white rounded-full text-sm font-semibold`}>
                시작하기 →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section className="bg-white rounded-2xl shadow-xl p-8 mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          💡 사용 팁: 텍스트를 드래그해보세요!
        </h2>
        
        {/* 판교어 예시 */}
        <div className="bg-gray-50 p-6 rounded-lg border-2 border-dashed border-blue-300 mb-4">
          <p className="text-sm text-blue-600 font-semibold mb-2">📊 판교어 예시</p>
          <p className="text-lg leading-relaxed text-gray-700">
            회의에서 팀장님이 "이번 프로젝트는 <span className="font-bold text-primary-600 cursor-pointer hover:bg-primary-100 px-1 rounded">린하게</span> 진행하고, 
            일단 <span className="font-bold text-primary-600 cursor-pointer hover:bg-primary-100 px-1 rounded">MVP</span>부터 만들어봅시다. 
            각자 맡은 부분 <span className="font-bold text-primary-600 cursor-pointer hover:bg-primary-100 px-1 rounded">어레인지</span>해서 
            금요일까지 <span className="font-bold text-primary-600 cursor-pointer hover:bg-primary-100 px-1 rounded">컨펌</span> 받아주세요"라고 말씀하셨습니다.
          </p>
        </div>

        {/* MZ 트렌드 예시 */}
        <div className="bg-pink-50 p-6 rounded-lg border-2 border-dashed border-pink-300">
          <p className="text-sm text-pink-600 font-semibold mb-2">✨ MZ 트렌드 예시</p>
          <p className="text-lg leading-relaxed text-gray-700">
            친구가 "게임 이겼다! <span className="font-bold text-pink-600 cursor-pointer hover:bg-pink-100 px-1 rounded">야르</span>! 
            자료 공유 <span className="font-bold text-pink-600 cursor-pointer hover:bg-pink-100 px-1 rounded">아자스</span>! 
            이 로고 색 조합 좀 <span className="font-bold text-pink-600 cursor-pointer hover:bg-pink-100 px-1 rounded">밤티</span>나는데? 
            저 옷 진짜 <span className="font-bold text-pink-600 cursor-pointer hover:bg-pink-100 px-1 rounded">도티낳는데</span>!"라고 말했습니다.
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-4 text-center">
          ↑ 색깔 있는 단어를 마우스로 드래그하면 즉시 번역됩니다!
        </p>
      </section>

      {/* Stats */}
      <section className="text-center py-8 px-4">
        <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-primary-600 mb-2">31+</div>
            <div className="text-sm text-gray-600">수록 용어</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-purple-600 mb-2">3</div>
            <div className="text-sm text-gray-600">사용자 레벨</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-3xl font-bold text-pink-600 mb-2">100%</div>
            <div className="text-sm text-gray-600">무료</div>
          </div>
        </div>
      </section>
    </div>
  );
}
