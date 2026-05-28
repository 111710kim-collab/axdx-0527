export function validateTravelInput(input) {
  const errors = []

  if (!input.destination || input.destination.trim().length === 0) {
    errors.push('목적지를 선택해주세요')
  }

  if (!input.date || input.date.trim().length === 0) {
    errors.push('여행 일정을 선택해주세요')
  }

  if (!input.concept || input.concept.trim().length === 0) {
    errors.push('여행 컨셉을 선택해주세요')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}