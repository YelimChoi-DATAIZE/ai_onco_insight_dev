export default function TestMethodNode({ data }) {
  return (
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
      <div>
        <label>
          <input type="radio" name="method" /> Student&apos;s t-test
        </label>
        <br />
        <label>
          <input type="radio" name="method" /> Wilcoxon rank
        </label>
      </div>
    </div>
  );
}
