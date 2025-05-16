export default function VariableNode({ data }) {
  return (
    <div style={{ padding: 10, border: '1px solid #ccc', borderRadius: 6, background: '#fff' }}>
      <strong>{data.label}</strong>
      <div>
        <label>
          <input type="checkbox" /> A
        </label>
        <br />
        <label>
          <input type="checkbox" /> B
        </label>
        <br />
        <label>
          <input type="checkbox" /> C
        </label>
      </div>
    </div>
  );
}
