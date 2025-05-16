export default function MissingValueNode({ data }) {
  return (
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
      <div>
        <label>
          <input type="radio" name="missing" /> pairwise
        </label>
        <br />
        <label>
          <input type="radio" name="missing" /> listwise
        </label>
      </div>
    </div>
  );
}
