import { Link } from 'react-router-dom';
import hero from '../assets/hero.png';

const Home = () => {
  return (
    <main className="min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_8%,rgba(88,101,242,0.28),transparent_26rem),linear-gradient(135deg,#111214_0%,#1c1f2a_44%,#202225_100%)] text-left text-[#f5f6fa]">
      <nav className="mx-auto flex w-[min(1120px,calc(100%_-_32px))] flex-col items-start gap-[18px] py-[22px] min-[620px]:flex-row min-[620px]:items-center min-[620px]:justify-between" aria-label="Primary navigation">
        <Link className="inline-flex items-center gap-2.5 font-extrabold text-white no-underline" to="/">
          <img className="h-[34px] w-[34px] object-contain" src={hero} alt="" />
          <span>ChatFlow</span>
        </Link>
        <div className="flex w-full items-center gap-2.5 min-[620px]:w-auto">
          <Link className="inline-flex min-h-[42px] flex-1 items-center justify-center rounded-lg px-[18px] text-[0.95rem] font-bold text-white no-underline transition hover:bg-white/8 min-[620px]:flex-none" to="/login">
            Log in
          </Link>
          <Link className="inline-flex min-h-[42px] flex-1 items-center justify-center rounded-lg bg-[#5865f2] px-[18px] text-[0.95rem] font-bold text-white no-underline shadow-[0_14px_34px_rgba(88,101,242,0.25)] transition hover:-translate-y-px min-[620px]:flex-none" to="/register">
            Sign up
          </Link>
        </div>
      </nav>

      <section className="mx-auto grid w-[min(1120px,calc(100%_-_32px))] grid-cols-1 items-center gap-[52px] pt-[34px] pb-[78px] min-[900px]:min-h-[calc(100vh_-_92px)] min-[900px]:grid-cols-[minmax(0,0.95fr)_minmax(360px,1.05fr)] min-[900px]:pt-[58px]">
        <div className="max-w-[580px]">
          <div className="mb-[18px] w-fit rounded-lg border border-white/16 bg-white/8 px-3 py-2 text-[0.78rem] font-extrabold tracking-[0.08em] text-[#cdd3ff] uppercase">Community chat for every crew</div>
          <h1 className="m-0 text-[clamp(2.6rem,6vw,5.4rem)] leading-[0.96] tracking-normal text-white">ChatFlow</h1>
          <p className="mt-[22px] max-w-[520px] text-[1.08rem] leading-[1.7] text-[#c6cbd7]">
            A sample Discord-style workspace where teams can gather in channels,
            keep conversations moving, and jump straight back into the room that matters.
          </p>
          <div className="mt-8 flex w-full flex-wrap gap-3.5">
            <Link className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-lg bg-white px-[22px] font-extrabold text-[#1e1f22] no-underline transition min-[620px]:flex-none" to="/register">
              Create account
            </Link>
            <Link className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-lg border border-white/18 px-[22px] font-extrabold text-white no-underline transition hover:-translate-y-px hover:border-white/34 hover:bg-white/8 min-[620px]:flex-none" to="/login">
              I already have one
            </Link>
          </div>
          <div className="mt-[34px] grid grid-cols-1 gap-3.5 min-[620px]:grid-cols-3" aria-label="Application highlights">
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
              <strong className="block text-[1.35rem] text-white">Live</strong>
              <span className="text-[0.88rem] text-[#aeb5c4]">Socket chat</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
              <strong className="block text-[1.35rem] text-white">3</strong>
              <span className="text-[0.88rem] text-[#aeb5c4]">Core routes</span>
            </div>
            <div className="rounded-lg border border-white/10 bg-white/[0.055] p-4">
              <strong className="block text-[1.35rem] text-white">24/7</strong>
              <span className="text-[0.88rem] text-[#aeb5c4]">Team spaces</span>
            </div>
          </div>
        </div>

        <div className="relative isolate max-w-[620px] before:absolute before:inset-[8%_-10%_-12%_8%] before:-z-10 before:rounded-lg before:bg-[linear-gradient(135deg,rgba(88,101,242,0.34),rgba(35,165,89,0.16))] before:blur-[42px] min-[900px]:max-w-none" aria-label="Chat application preview">
          <div className="overflow-hidden rounded-lg border border-white/12 bg-[#313338] shadow-[0_28px_80px_rgba(0,0,0,0.42)]">
            <div className="flex min-h-[52px] items-center justify-between border-b border-black/24 bg-[#2b2d31] px-[18px]">
              <div className="flex gap-[7px]" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#23a559]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f0b232]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#ed4245]" />
              </div>
              <strong className="text-[0.9rem] text-[#f5f6fa]"># launch-room</strong>
            </div>
            <div className="grid min-h-[438px] grid-cols-1 min-[620px]:grid-cols-[150px_minmax(0,1fr)]">
              <aside className="hidden bg-[#2b2d31] px-3 py-[18px] min-[620px]:block" aria-label="Preview channels">
                <div className="mb-5 grid h-[42px] w-[42px] place-items-center rounded-lg bg-[#5865f2] font-black text-white">C</div>
                <div className="mb-2 rounded-lg bg-[#404249] px-2.5 py-[9px] text-[0.82rem] text-white"># general</div>
                <div className="mb-2 rounded-lg px-2.5 py-[9px] text-[0.82rem] text-[#b5bac1]"># design</div>
                <div className="mb-2 rounded-lg px-2.5 py-[9px] text-[0.82rem] text-[#b5bac1]"># standup</div>
                <div className="mb-2 rounded-lg px-2.5 py-[9px] text-[0.82rem] text-[#b5bac1]"># deploys</div>
              </aside>
              <section className="min-w-0 p-5 min-[620px]:p-6">
                <h2 className="m-0 mb-1 text-[1.35rem] text-white"># general</h2>
                <p className="text-[0.9rem] text-[#aeb5c4]">Welcome to your team hub.</p>
                <article className="mt-6 grid grid-cols-[40px_minmax(0,1fr)] gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#23a559] font-extrabold text-white">A</div>
                  <div>
                    <strong className="text-[0.92rem] text-white">Avery</strong>
                    <p className="mt-[5px] leading-[1.45] text-[#dbdee1]">The new landing page is ready for review. Fresh route, clean hero, and auth links up top.</p>
                  </div>
                </article>
                <article className="mt-6 grid grid-cols-[40px_minmax(0,1fr)] gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-[#23a559] font-extrabold text-white">M</div>
                  <div>
                    <strong className="text-[0.92rem] text-white">Morgan</strong>
                    <p className="mt-[5px] leading-[1.45] text-[#dbdee1]">Nice. It feels like the app before you even log in.</p>
                  </div>
                </article>
                <div className="mt-[30px] rounded-lg bg-[#383a40] px-3.5 py-[13px] text-[0.92rem] text-[#949ba4]">Message #general</div>
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f6fa] text-[#202225]" aria-label="Feature summary">
        <div className="mx-auto grid w-[min(1120px,calc(100%_-_32px))] grid-cols-1 gap-[18px] py-[70px] min-[900px]:grid-cols-3">
          <article className="min-h-[190px] rounded-lg border border-[#d9dce5] bg-white p-[26px]">
            <span className="mb-[18px] grid h-[42px] w-[42px] place-items-center rounded-lg bg-[#eef1ff] font-black text-[#5865f2]">#</span>
            <h2 className="m-0 mb-2.5 text-[1.35rem] text-[#202225]">Organized channels</h2>
            <p className="leading-[1.6] text-[#596170]">Create focused places for project chatter, quick questions, and launch-day coordination.</p>
          </article>
          <article className="min-h-[190px] rounded-lg border border-[#d9dce5] bg-white p-[26px]">
            <span className="mb-[18px] grid h-[42px] w-[42px] place-items-center rounded-lg bg-[#eef1ff] font-black text-[#5865f2]">@</span>
            <h2 className="m-0 mb-2.5 text-[1.35rem] text-[#202225]">Simple identity</h2>
            <p className="leading-[1.6] text-[#596170]">Register, sign in, and bring people into the conversation with a lightweight account flow.</p>
          </article>
          <article className="min-h-[190px] rounded-lg border border-[#d9dce5] bg-white p-[26px]">
            <span className="mb-[18px] grid h-[42px] w-[42px] place-items-center rounded-lg bg-[#eef1ff] font-black text-[#5865f2]">+</span>
            <h2 className="m-0 mb-2.5 text-[1.35rem] text-[#202225]">Room to grow</h2>
            <p className="leading-[1.6] text-[#596170]">The sample layout leaves space for richer servers, members, notifications, and voice features.</p>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Home;
