export default function AssumptionNode({ data }) {
  return (
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
      <div>
        <label>
          <input type="checkbox" /> 정규분포성 검증
        </label>
        <br />
        <label>
          <input type="checkbox" /> Q-Q 도표
        </label>
      </div>
    </div>
  );
}
