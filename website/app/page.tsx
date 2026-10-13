import members from "@/data/members.json";
import RandomSiteButton from "@/components/RandomSiteButton";
import HalftoneTop from "@/components/HalftoneTop";

const link =
  "underline underline-offset-4 decoration-brass/50 hover:decoration-brass transition-colors";

export default function Home() {
  return (
    <main className="px-6 md:px-20 min-h-screen flex flex-col">

      {/* ── Header ── */}
      <header className="flex items-center justify-between py-8 text-[16px]">
        <div className="flex items-center gap-2">
          <img src="/logowhitetransp.png" alt="" className="h-6" />
          <span>Tron Ring</span>
        </div>
        <nav className="flex items-center gap-5 text-light/70">
          <a href="https://github.com/sym7534/tron-webring" className={link}>
            Join
          </a>
          <a
            href="https://github.com/sym7534/tron-webring/tree/main/website/public"
            className={link}
          >
            Assets
          </a>
        </nav>
      </header>

      {/* ── Hero ── */}
      <section className="flex items-center justify-between gap-8 pt-8 pb-10">
        <div className="flex flex-col gap-5">
          <h1 className="text-[40px] leading-[1.1]">
            The Mechatronics Engineering Webring
          </h1>
          <p className="text-light/70 leading-[1.6] max-w-[520px]">
            Personal websites by University of Waterloo Mechatronics
            Engineering students and alumni, since 2025. Tron on top.
          </p>
          <RandomSiteButton />
        </div>

        <HalftoneTop />
      </section>

      {/* ── Members ── */}
      <section>
        <ul className="flex flex-col">
          {members.sites.map((member) => (
            <li key={member.website} className="py-3">
              <div className="flex flex-wrap items-baseline gap-x-3">
                <span className="capitalize">{member.name}</span>
                <span className="text-light/40">
                  {member.class.replace(/\D/g, "")}
                </span>
                <a
                  href={member.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-light/60 ${link}`}
                >
                  {member.url}
                </a>
              </div>
              {member.description && (
                <p className="text-light/45 text-[15px]">{member.description}</p>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Join ── */}
      <p className="mt-10 text-light/60">
        Open to all UWaterloo Mechatronics students and alumni.{" "}
        <a href="https://github.com/sym7534/tron-webring" className={link}>
          Add your site
        </a>
        .
      </p>

      <footer className="mt-auto pt-16 pb-10 text-[14px] text-light/35">
        tronring.com
      </footer>

    </main>
  );
}
