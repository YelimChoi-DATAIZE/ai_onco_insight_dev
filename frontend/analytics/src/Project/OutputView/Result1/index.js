const Result1 = ({ charts = [] }) => {
  return (
    <div style={{ padding: '20px' }}>
      {charts.length === 0 ? (
        <p>아직 추가된 차트가 없습니다.</p>
      ) : (
        charts.map((chart) => (
          <div key={chart.id} style={{ marginBottom: '30px' }}>
            {chart.component()}
          </div>
        ))
      )}
    </div>
  );
};

export default Result1;
