import { Link } from 'react-router-dom';
import hero from '../assets/hero.png';
import './Home.css';

const Home = () => {
  return (
    <main className="landing-page">
      <nav className="landing-nav" aria-label="Primary navigation">
        <Link className="landing-brand" to="/">
          <img src={hero} alt="" />
          <span>ChatFlow</span>
        </Link>
        <div className="landing-nav-actions">
          <Link className="landing-link" to="/login">
            Log in
          </Link>
          <Link className="landing-button" to="/register">
            Sign up
          </Link>
        </div>
      </nav>

      <section className="landing-hero">
        <div className="landing-copy">
          <div className="landing-kicker">Community chat for every crew</div>
          <h1>ChatFlow</h1>
          <p>
            A sample Discord-style workspace where teams can gather in channels,
            keep conversations moving, and jump straight back into the room that matters.
          </p>
          <div className="landing-cta-row">
            <Link className="landing-primary" to="/register">
              Create account
            </Link>
            <Link className="landing-secondary" to="/login">
              I already have one
            </Link>
          </div>
          <div className="landing-stats" aria-label="Application highlights">
            <div className="landing-stat">
              <strong>Live</strong>
              <span>Socket chat</span>
            </div>
            <div className="landing-stat">
              <strong>3</strong>
              <span>Core routes</span>
            </div>
            <div className="landing-stat">
              <strong>24/7</strong>
              <span>Team spaces</span>
            </div>
          </div>
        </div>

        <div className="landing-preview" aria-label="Chat application preview">
          <div className="mock-window">
            <div className="mock-topbar">
              <div className="mock-dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <strong># launch-room</strong>
            </div>
            <div className="mock-body">
              <aside className="mock-sidebar" aria-label="Preview channels">
                <div className="mock-server">C</div>
                <div className="mock-channel active"># general</div>
                <div className="mock-channel"># design</div>
                <div className="mock-channel"># standup</div>
                <div className="mock-channel"># deploys</div>
              </aside>
              <section className="mock-chat">
                <h2># general</h2>
                <p>Welcome to your team hub.</p>
                <article className="mock-message">
                  <div className="mock-avatar">A</div>
                  <div>
                    <strong>Avery</strong>
                    <p>The new landing page is ready for review. Fresh route, clean hero, and auth links up top.</p>
                  </div>
                </article>
                <article className="mock-message">
                  <div className="mock-avatar">M</div>
                  <div>
                    <strong>Morgan</strong>
                    <p>Nice. It feels like the app before you even log in.</p>
                  </div>
                </article>
                <div className="mock-composer">Message #general</div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-sections" aria-label="Feature summary">
        <div className="landing-section-inner">
          <article className="feature-card">
            <span>#</span>
            <h2>Organized channels</h2>
            <p>Create focused places for project chatter, quick questions, and launch-day coordination.</p>
          </article>
          <article className="feature-card">
            <span>@</span>
            <h2>Simple identity</h2>
            <p>Register, sign in, and bring people into the conversation with a lightweight account flow.</p>
          </article>
          <article className="feature-card">
            <span>+</span>
            <h2>Room to grow</h2>
            <p>The sample layout leaves space for richer servers, members, notifications, and voice features.</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
