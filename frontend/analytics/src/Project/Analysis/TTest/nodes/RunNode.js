export default function RunNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        border: '2px solid #4caf50',
        borderRadius: 6,
        background: '#e8f5e9',
        textAlign: 'center',
      }}
    >
      <strong>{data.label}</strong>
      <div>
        <button
          style={{
            marginTop: 10,
            padding: '6px 12px',
            backgroundColor: '#4caf50',
            color: '#fff',
            border: 'none',
            borderRadius: 4,
          }}
        >
          분석 실행
        </button>
      </div>
    </div>
  );
}
