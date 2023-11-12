export default function Loader() {
  console.log("loading");
  return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Loading questions...</p>
    </div>
  );
}
