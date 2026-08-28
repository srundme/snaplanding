import { GoogleMeetMark } from "../PlatformLogos";

export default function MacBookMeetFrame({ children }) {
  return (
    <figure className="meet-macbook">
      <div className="meet-macbook-lid">
        <div className="meet-macbook-bezel">
          <span className="meet-macbook-camera" />
          <div className="meet-macbook-screen">
            <div className="meet-chrome">
              <div className="meet-chrome-bar">
                <div className="meet-chrome-lights" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="meet-chrome-tabs">
                  <div className="meet-chrome-tab is-active">
                    <GoogleMeetMark size={13} />
                    <span>Meet</span>
                  </div>
                  <div className="meet-chrome-tab">
                    <span>Gmail</span>
                  </div>
                </div>
              </div>
              <div className="meet-chrome-url">
                <span className="meet-chrome-nav" aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
                  </svg>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
                  </svg>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.65 6.35A7.96 7.96 0 0 0 12 4V1L7 6l5 5V7c2.76 0 5 2.24 5 5a5 5 0 0 1-8.9 3.1L6.7 16.5A8 8 0 1 0 17.65 6.35z" />
                  </svg>
                </span>
                <span className="meet-chrome-omnibox">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1s3.1 1.39 3.1 3.1v2z" />
                  </svg>
                  <span>meet.google.com/kdx-mfvz-qta</span>
                </span>
                <span className="meet-chrome-trail" aria-hidden="true">
                  <span className="meet-chrome-ext" />
                  <span className="meet-chrome-ext" />
                  <span className="meet-chrome-face">S</span>
                </span>
              </div>
            </div>
            <div className="meet-chrome-viewport">{children}</div>
          </div>
        </div>
      </div>
      <div className="meet-macbook-chin">
        <span />
      </div>
    </figure>
  );
}
