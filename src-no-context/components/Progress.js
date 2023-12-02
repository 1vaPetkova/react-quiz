function Progress({ index, count, points, maxPoints, answer }) {
  return (
    <header className="progress">
      <progress max={count} value={index + Number(answer !== null)} />
      <p>
        Question{" "}
        <strong>
          {index + 1}/{count}
        </strong>
      </p>
      <p>
        <strong>
          {points}/{maxPoints} points
        </strong>
      </p>
    </header>
  );
}

export default Progress;
