export function Preloader() {
  return (
    <div className="preloader">
      <div className="loading-container">
        <div className="loading" />
        <div id="loading-icon">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/theme/assets/images/loader.svg" alt="Preloader" />
        </div>
      </div>
    </div>
  );
}
