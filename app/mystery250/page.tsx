import Link from "next/link";

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ns-card">
      <h3 className="ns-h3">{title}</h3>
      <div className="ns-p" style={{ marginBottom: 0 }}>
        {children}
      </div>
    </div>
  );
}

export default function Mystery250Page() {
  return (
    <div className="ns-page">
      <section style={{ padding: "10px 0 8px" }}>
        <h1 className="ns-h1">Mystery250</h1>
        <p className="ns-subtitle" style={{ maxWidth: 980 }}>
          Mystery250 is a quiet place inside NextScenes where people come to
          think, reflect, and gently exercise the mind. It is not about speed.
          It is not about points. It is not about showing off. It is about
          attention, patience, and the pleasure of understanding.
        </p>

        <div className="ns-hero-cta">
          <a className="ns-btn ns-btn-primary" href="https://app.nextscenes.org">
            Explore Mystery250
          </a>
          <Link className="ns-btn ns-btn-ghost" href="/about">
            About NextScenes
          </Link>
        </div>

        <div className="ns-trust-strip" style={{ marginTop: 10 }}>
          <span>For all ages</span>
          <span>No noise</span>
          <span>No pressure</span>
          <span>Just thinking</span>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">What is Mystery250?</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Mystery250 is a collection of short mysteries, riddles, and logic
          problems designed to train attention, reasoning, and patience. Some
          are simple. Some are challenging. All are meant to be solved slowly
          and thoughtfully.
        </p>

        <div className="ns-grid-3">
          <Card title="Not a game">
            There are no leaderboards shouting at you. No pressure to perform.
            You solve for your own satisfaction.
          </Card>
          <Card title="Not a test">
            You are not being measured. You are being invited to think.
          </Card>
          <Card title="A daily mental walk">
            Like a quiet walk in the evening, Mystery250 is a small, healthy
            exercise for the mind.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Who is it for?</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Mystery250 is for everyone who enjoys thinking.
        </p>

        <div className="ns-grid-3">
          <Card title="Children and students">
            To learn to observe, reason, and not rush to answers.
          </Card>
          <Card title="Adults and working people">
            A calm intellectual pause in a noisy day.
          </Card>
          <Card title="Retirees and lifelong learners">
            A gentle way to keep the mind active and curious.
          </Card>
        </div>

        <div className="ns-grid-3" style={{ marginTop: 14 }}>
          <Card title="Writers">
            To sharpen attention, logic, and narrative thinking.
          </Card>
          <Card title="Teachers and classrooms">
            As small exercises in reasoning, discussion, and patience.
          </Card>
          <Card title="Anyone who likes quiet challenges">
            You do not need to be a “puzzle person.” You only need curiosity.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">Different levels, same spirit</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          Mystery250 contains mysteries of different difficulties, from very
          accessible to quite challenging. The goal is not to separate people
          into “smart” and “not smart,” but to offer everyone a place to think at
          their own pace.
        </p>

        <div className="ns-grid-3">
          <Card title="Easy">
            For young minds and relaxed moments.
          </Card>
          <Card title="Medium">
            For thoughtful daily exercise.
          </Card>
          <Card title="Hard and Expert">
            For those who enjoy wrestling with ideas for a while.
          </Card>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">Why Mystery250 exists</h2>
        <p className="ns-p" style={{ maxWidth: 980 }}>
          We live in a world that rewards speed, noise, and constant reaction.
          Mystery250 exists to protect a different rhythm: slow thinking,
          careful reading, and patient reasoning.
        </p>

        <div className="ns-grid-3">
          <Card title="To train attention">
            Noticing small details is a skill that can be practiced.
          </Card>
          <Card title="To cultivate patience">
            Some things are not meant to be solved instantly.
          </Card>
          <Card title="To give the mind rest">
            Good thinking is not stress. It is a form of calm.
          </Card>
        </div>
      </section>

      <section className="ns-section ns-section-alt">
        <h2 className="ns-h2">A place of solace</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 10 }}>
            Mystery250 is not designed to excite you. It is designed to settle
            you.
          </p>
          <p className="ns-p" style={{ marginBottom: 10 }}>
            It is a quiet corner of the internet where you can sit with a
            problem, think, maybe smile, and move on a little wiser.
          </p>
          <p className="ns-p" style={{ marginBottom: 0 }}>
            In a loud world, it offers a small, dignified silence.
          </p>
        </div>
      </section>

      <section className="ns-section ns-section-cta">
        <h2 className="ns-h2">Try Mystery250</h2>
        <p className="ns-p" style={{ maxWidth: 900 }}>
          You do not need to be a writer. You do not need to compete. You only
          need a few quiet minutes and a little curiosity.
        </p>

        <div className="ns-section-cta">
          <a className="ns-btn ns-btn-primary" href="https://app.nextscenes.org">
            Enter Mystery250
          </a>
          <Link className="ns-btn ns-btn-ghost" href="/how-it-works">
            How NextScenes works
          </Link>
        </div>
      </section>

      <section className="ns-section">
        <h2 className="ns-h2">In one sentence</h2>
        <div className="ns-card">
          <p className="ns-p" style={{ marginBottom: 0 }}>
            Mystery250 is a quiet, thoughtful place where anyone, at any age,
            can enjoy the simple pleasure of thinking.
          </p>
        </div>
      </section>
    </div>
  );
}
