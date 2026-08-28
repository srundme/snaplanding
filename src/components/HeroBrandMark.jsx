/**
 * Premium hero brand reveal — bars lock like a call connecting,
 * specular sheen, letter-timed wordmark, then a quiet rule settles.
 */
const SNAP = ["S", "n", "a", "p"];
const SERVE = ["S", "e", "r", "v", "e"];

export default function HeroBrandMark() {
  return (
    <div className="hbm" aria-label="SnapServe">
      <div className="hbm-stage">
        <div className="hbm-mark" aria-hidden="true">
          <span className="hbm-ring" />
          <svg
            className="hbm-bars"
            viewBox="0 0 600 600"
            width="72"
            height="72"
            fill="none"
          >
            <rect
              className="hbm-bar hbm-bar--1"
              x="60"
              y="40"
              width="421"
              height="121"
              rx="60.5"
            />
            <rect
              className="hbm-bar hbm-bar--2"
              x="120"
              y="200"
              width="421"
              height="121"
              rx="60.5"
            />
            <rect
              className="hbm-bar hbm-bar--3"
              x="180"
              y="360"
              width="421"
              height="122"
              rx="61"
            />
          </svg>
          <span className="hbm-sheen" />
        </div>

        <p className="hbm-word" aria-hidden="true">
          <span className="hbm-snap">
            {SNAP.map((ch, i) => (
              <span key={`s${ch}${i}`} className="hbm-ch" style={{ "--i": i }}>
                {ch}
              </span>
            ))}
          </span>
          <span className="hbm-serve">
            {SERVE.map((ch, i) => (
              <span
                key={`v${ch}${i}`}
                className="hbm-ch"
                style={{ "--i": i + SNAP.length }}
              >
                {ch}
              </span>
            ))}
          </span>
        </p>

        <span className="hbm-rule" aria-hidden="true" />
      </div>
    </div>
  );
}
