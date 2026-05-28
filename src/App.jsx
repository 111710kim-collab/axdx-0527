import { useMemo, useState } from 'react'
import TravelForm from './components/TravelForm'
import RecommendationList from './components/RecommendationList'
import { createRecommendations } from './lib/recommendation'
import { calculateRecommendationMatchRate } from './lib/kpi'
import './App.css'

function App() {
  const [recommendations, setRecommendations] = useState([])
  const [addedCourseIds, setAddedCourseIds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const matchRate = useMemo(() => {
    return calculateRecommendationMatchRate(
      addedCourseIds.length,
      recommendations.length,
    )
  }, [addedCourseIds.length, recommendations.length])

  const matchRatePercent = Math.round(matchRate * 100)

  const handleGenerate = (input) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const result = createRecommendations(input)
      setRecommendations(result)
      setAddedCourseIds([])
    } catch {
      setErrorMessage('추천 코스를 불러오지 못했습니다. 다시 시도해주세요')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddCourse = (courseId) => {
    setAddedCourseIds((prev) => {
      if (prev.includes(courseId)) {
        return prev
      }

      return [...prev, courseId]
    })
  }

  return (
    <main className="app">
      <section className="hero">
        <p className="eyebrow">AX Travel Curation</p>
        <h1>AX 기반 초개인화 여행 큐레이션 플랫폼</h1>
        <p>
          목적지, 일정, 동반자, 여행 컨셉을 입력하면 5초 이내에 3가지
          테마별 맞춤 여행 일정표와 지도 동선을 확인할 수 있습니다.
        </p>
      </section>

      <section className="dashboard">
        <div className="metric-card">
          <span>추천 코스</span>
          <strong>{recommendations.length}개</strong>
        </div>

        <div className="metric-card">
          <span>내 일정 추가</span>
          <strong>{addedCourseIds.length}개</strong>
        </div>

        <div className="metric-card">
          <span>추천 저장률</span>
          <strong>{matchRatePercent}%</strong>
        </div>
      </section>

      <section className="planner-card">
        <div className="section-heading">
          <p className="eyebrow dark">Travel Input</p>
          <h2>여행 조건 입력</h2>
          <p>
            필수 항목을 입력하면 Mock AI가 3가지 테마별 추천 코스를 생성합니다.
          </p>
        </div>

        <TravelForm onGenerate={handleGenerate} isLoading={isLoading} />

        {errorMessage && (
          <p className="form-errors" role="alert">
            {errorMessage}
          </p>
        )}
      </section>

      <RecommendationList
        recommendations={recommendations}
        addedCourseIds={addedCourseIds}
        onAddCourse={handleAddCourse}
      />
    </main>
  )
}

export default App