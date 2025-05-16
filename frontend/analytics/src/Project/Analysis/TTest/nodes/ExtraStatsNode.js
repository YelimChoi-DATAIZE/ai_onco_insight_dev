export default function ExtraStatsNode({ data }) {
  return (
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
      <div>
        <label>
          <input type="checkbox" /> 평균 차이
        </label>
        <br />
        <label>
          <input type="checkbox" /> 효과 크기
        </label>
        <br />
        <label>
          <input type="checkbox" /> 기술 통계
        </label>
        <br />
        <label>
          <input type="checkbox" /> 기술 통계 도표
        </label>
      </div>
    </div>
  );
}
