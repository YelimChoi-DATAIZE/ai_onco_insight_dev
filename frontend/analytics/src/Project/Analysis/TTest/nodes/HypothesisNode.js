export default function HypothesisNode({ data }) {
  return (
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
      <div>
        <input type="text" placeholder="검증값 입력" style={{ width: '100%' }} />
        <br />
        <label>
          <input type="radio" name="hypo" /> ≠ 검증 값
        </label>
        <br />
        <label>
          <input type="radio" name="hypo" /> large 검증 값
        </label>
        <br />
        <label>
          <input type="radio" name="hypo" /> small 검증 값
        </label>
      </div>
    </div>
  );
}
