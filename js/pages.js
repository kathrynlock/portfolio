// ─── HOME PAGE ────────────────────────────────────────────
function HomePage({ setPage }) {
  const [vis, setVis] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVis(true), 80); return () => clearTimeout(t); }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{
        minHeight: '100vh', paddingTop: '90px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center',
        padding: '90px 60px 60px',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-60px', right: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(201,184,217,0.35) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1140px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
          {/* Left: text */}
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(24px)', transition: 'all 0.9s cubic-bezier(0.22,1,0.36,1)' }}>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '13px', color: 'var(--blue)', marginBottom: '20px', letterSpacing: '1.5px', opacity: 0.8 }}>
              ECE + BUSINESS @ UT AUSTIN
            </div>
            <div style={{ marginBottom: '22px' }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '22px', color: 'var(--text)', lineHeight: 2.0, letterSpacing: '1px', marginBottom: '4px' }}>
                hi! i'm
              </div>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '120px', fontWeight: 400, color: 'var(--lavender-mid)', lineHeight: 0.85, letterSpacing: '0.04em' }}>
                kate
              </div>
            </div>
            <div style={{
              background: 'white', borderRadius: '18px', padding: '16px 22px',
              border: '1.5px solid rgba(138,115,151,0.3)',
              boxShadow: '5px 5px 0px rgba(138,115,151,0.2)',
              marginBottom: '36px', display: 'inline-block',
            }}>
              <p style={{ fontFamily: 'Outfit', fontWeight: 700, fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.7, letterSpacing: '0.2px' }}>
                probably crafting, eating a sweet treat,<br />or daydreaming about my next project
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button className="lift" onClick={() => setPage('projects')} style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', fontWeight: 600,
                background: 'var(--text)', color: 'white', border: 'none',
                borderRadius: '32px', padding: '15px 32px', cursor: 'pointer',
                boxShadow: '5px 5px 0px rgba(58,47,74,0.2)',
              }}>see my work</button>
              <button className="lift" onClick={() => setPage('about')} style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', fontWeight: 500,
                background: 'white', color: 'var(--text-mid)',
                border: '2.5px solid var(--lavender)', borderRadius: '32px',
                padding: '15px 32px', cursor: 'pointer',
              }}>about me</button>
            </div>
          </div>

          {/* Right: thought bubbles */}
          <div style={{ position: 'relative', height: '480px', opacity: vis ? 1 : 0, transition: 'opacity 1s ease 0.3s' }}>
            <div style={{ position: 'absolute', top: 0, left: '10px', fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '16px', color: 'var(--text-light)', letterSpacing: '0.3px' }}>
              questions on my mind, recently
            </div>
            <ThoughtBubble thought={THOUGHTS[0]} delay={500}  floatAnim="float"  posStyle={{ position: 'absolute', top: '50px',   left: '10px',  width: '250px' }} />
            <ThoughtBubble thought={THOUGHTS[1]} delay={1000} floatAnim="floatB" posStyle={{ position: 'absolute', top: '185px',  right: '0px',  width: '260px' }} />
            <ThoughtBubble thought={THOUGHTS[2]} delay={1600} floatAnim="floatC" posStyle={{ position: 'absolute', bottom: '40px', left: '50px', width: '265px' }} />
            <div style={{ position: 'absolute', top: '10px', right: '10px', fontFamily: 'Outfit', fontWeight: 800, fontSize: '9px', color: 'var(--lavender-mid)', opacity: 0.5, lineHeight: 1.8, textAlign: 'right', pointerEvents: 'none' }}>
              click bubbles<br />to reveal
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Project carousel */}
      <section style={{ background: 'var(--white)', padding: '72px 60px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '36px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '13px', color: 'var(--lavender-mid)', letterSpacing: '2px', marginBottom: '12px', opacity: 0.8 }}>SELECTED WORK</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '48px', color: 'var(--text)', lineHeight: 1 }}>things i've made</h2>
            </div>
            <button onClick={() => setPage('projects')} style={{
              fontFamily: 'Outfit', fontSize: '14px', fontWeight: 800,
              color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer',
              textDecoration: 'underline', textUnderlineOffset: '5px', letterSpacing: '0.3px',
            }}>see all projects</button>
          </div>
          <HomeCarousel setPage={setPage} />
        </div>
      </section>

      {/* What I'm about */}
      <section style={{ padding: '80px 60px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '48px', color: 'var(--text)', marginBottom: '12px', textAlign: 'center' }}>what i'm all about</h2>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '16px', color: 'var(--lavender-mid)', letterSpacing: '1.5px', textAlign: 'center', marginBottom: '48px', opacity: 0.7 }}>three things that drive every project</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
            {[
              { label: '01', bg: 'var(--lavender-light)', shadow: 'rgba(201,184,217,0.5)',   title: 'Products',   body: 'I obsess over how products make people feel. Every tap, every transition, every tiny interaction matters.' },
              { label: '02', bg: 'var(--yellow)',          shadow: 'rgba(90,65,30,0.25)',     title: 'Design',     body: 'Design is where form meets feeling. I believe things can be both beautiful and genuinely useful.' },
              { label: '03', bg: 'var(--blue-light)',      shadow: 'rgba(123,167,217,0.4)',   title: 'Human Tech', body: 'Technology should spark joy, not stress. I explore how tech can be playful, warm, and wonderfully human.' },
            ].map(c => (
              <div key={c.title} className="lift" style={{
                background: c.bg, borderRadius: '28px', padding: '36px 30px',
                border: '2.5px solid rgba(255,255,255,0.9)',
                boxShadow: `7px 7px 0px ${c.shadow}`,
              }}>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '10px', color: 'rgba(58,47,74,0.35)', marginBottom: '18px', letterSpacing: '0.5px' }}>{c.label}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '30px', color: 'var(--text)', marginBottom: '12px' }}>{c.title}</h3>
                <p style={{ fontFamily: 'Outfit', fontSize: '15px', color: 'var(--text-mid)', lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />
    </div>
  );
}

// ─── PROJECTS PAGE ────────────────────────────────────────
function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [modalVis, setModalVis] = useState(false);

  const tags = ['all', ...new Set(PROJECTS.map(p => p.tag))];
  const filtered = filter === 'all' ? PROJECTS : PROJECTS.filter(p => p.tag === filter);

  const openModal  = (p) => { setSelected(p); setTimeout(() => setModalVis(true), 10); };
  const closeModal = ()  => { setModalVis(false); setTimeout(() => setSelected(null), 350); };

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: '60px 60px 100px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '48px' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '13px', color: 'var(--lavender-mid)', letterSpacing: '2px', marginBottom: '14px', opacity: 0.8 }}>PORTFOLIO</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '68px', color: 'var(--text)', lineHeight: 1, marginBottom: '10px' }}>my projects</h1>
          <p style={{ fontFamily: 'Outfit', fontSize: '16px', color: 'var(--text-light)', fontWeight: 500 }}>hover a card to flip it -- click to read more</p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {tags.map(t => (
            <button key={t} className="filter-btn" onClick={() => setFilter(t)} style={{
              fontFamily: 'Outfit', fontSize: '14px', fontWeight: 800,
              background: filter === t ? 'var(--text)' : 'white',
              color: filter === t ? 'white' : 'var(--text-mid)',
              border: `2px solid ${filter === t ? 'var(--text)' : 'var(--lavender)'}`,
              borderRadius: '24px', padding: '8px 22px', cursor: 'pointer',
              textTransform: 'capitalize',
              boxShadow: filter === t ? '4px 4px 0px rgba(58,47,74,0.15)' : 'none',
            }}>{t}</button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {filtered.map(p => <ProjectCard key={p.id} p={p} onClick={openModal} />)}
        </div>
      </section>

      {/* Modal */}
      {selected && (
        <div onClick={closeModal} style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(58,47,74,0.55)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          opacity: modalVis ? 1 : 0, transition: 'opacity 0.35s ease',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: 'white', borderRadius: '36px',
            padding: '52px', maxWidth: '520px', width: '92%',
            border: `4px solid ${selected.color}`,
            boxShadow: '24px 24px 0px rgba(58,47,74,0.12)',
            transform: modalVis ? 'scale(1) translateY(0)' : 'scale(0.93) translateY(20px)',
            transition: 'all 0.35s cubic-bezier(0.22,1,0.36,1)',
          }}>
            <div style={{ fontFamily: 'Outfit', fontSize: '11px', fontWeight: 800, color: 'var(--text-light)', letterSpacing: '1.8px', textTransform: 'uppercase', marginBottom: '8px' }}>{selected.tag} · {selected.year}</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '40px', color: 'var(--text)', marginBottom: '16px', lineHeight: 1.1 }}>{selected.title}</h2>
            <p style={{ fontFamily: 'Outfit', fontSize: '16px', color: 'var(--text-mid)', lineHeight: 1.8, marginBottom: '28px' }}>{selected.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '36px' }}>
              {selected.skills.map(s => (
                <span key={s} style={{ background: selected.color, color: 'var(--text)', borderRadius: '24px', padding: '7px 18px', fontSize: '13px', fontFamily: 'Outfit', fontWeight: 800 }}>{s}</span>
              ))}
            </div>
            <button onClick={closeModal} style={{
              fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', fontWeight: 500,
              background: 'var(--text)', color: 'white', border: 'none',
              borderRadius: '32px', padding: '15px 0', cursor: 'pointer', width: '100%',
              boxShadow: '4px 4px 0px rgba(58,47,74,0.15)',
            }}>close</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ABOUT PAGE ───────────────────────────────────────────
function AboutPage() {
  const skills = [
    { area: 'Design',    bg: 'var(--lavender-light)', items: ['Figma', 'User Research', 'Prototyping', 'Wireframing', 'Usability Testing'] },
    { area: 'Tech',      bg: 'var(--yellow)',          items: ['React', 'Python', 'HTML / CSS', 'Arduino', 'SQL'] },
    { area: 'Interests', bg: 'var(--blue-light)',      items: ['Product Strategy', 'HCI', 'Branding', 'Analog Tech', 'Design Systems'] },
  ];
  const facts = [
    { e: '01', t: 'My craft supply collection deserves its own storage unit and yes, I use all of it.' },
    { e: '02', t: 'I rate coffee shops by pastry quality first. Espresso is secondary.' },
    { e: '03', t: 'I shoot film because waiting for photos is part of the joy.' },
    { e: '04', t: 'My best ideas arrive at 11pm. My sleep schedule is aware and suffering.' },
  ];

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px' }}>
      <section style={{ padding: '60px 60px 0', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center', marginBottom: '80px' }}>
          <div>
            <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '12px', color: 'var(--blue)', marginBottom: '14px', letterSpacing: '1.5px', textTransform: 'uppercase' }}>hi, nice to meet you</div>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '60px', color: 'var(--text)', lineHeight: 1.05, marginBottom: '28px' }}>
              i'm kate,<br />
              <span style={{ color: 'var(--lavender-mid)', fontFamily: "'Cormorant Garamond', serif", fontSize: '80px', fontWeight: 400 }}>a curious</span><br />
              creator
            </h1>
            <p style={{ fontFamily: 'Outfit', fontSize: '17px', color: 'var(--text-mid)', lineHeight: 1.85, marginBottom: '18px' }}>
              I'm studying ECE and Business at UT Austin, but my real curriculum is figuring out how to make technology feel less like a tool and more like a friend.
            </p>
            <p style={{ fontFamily: 'Outfit', fontSize: '17px', color: 'var(--text-mid)', lineHeight: 1.85 }}>
              I'm obsessed with the intersection of product, design, and human experience. I believe the best tech sparks joy, reduces friction, and if you're lucky makes you smile.
            </p>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '20px' }}>
            <PhotoStack />
          </div>
        </div>
      </section>

      <Divider />

      {/* Skills */}
      <section style={{ padding: '80px 60px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '50px', color: 'var(--text)', marginBottom: '40px' }}>what i work with</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '22px' }}>
          {skills.map(s => (
            <div key={s.area} className="lift" style={{
              background: s.bg, borderRadius: '26px', padding: '30px 28px',
              border: '2.5px solid rgba(255,255,255,0.9)',
              boxShadow: '6px 6px 0px rgba(58,47,74,0.07)',
            }}>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '26px', color: 'var(--text)', marginBottom: '18px' }}>{s.area}</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {s.items.map(item => (
                  <div key={item} style={{ fontFamily: 'Outfit', fontSize: '15px', color: 'var(--text-mid)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--lavender-mid)', fontSize: '12px' }}>&#9670;</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fun facts */}
      <section style={{ padding: '0 60px 80px', maxWidth: '1100px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '50px', color: 'var(--text)', marginBottom: '36px' }}>fun facts</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '18px' }}>
          {facts.map((f, i) => (
            <div key={i} className="lift" style={{
              background: 'white', borderRadius: '22px', padding: '26px 24px',
              display: 'flex', alignItems: 'center', gap: '18px',
              border: '2px solid var(--lavender-light)',
              boxShadow: '5px 5px 0px rgba(201,184,217,0.4)',
            }}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '9px', color: 'var(--lavender-mid)', flexShrink: 0, width: '32px', textAlign: 'center' }}>{f.e}</div>
              <p style={{ fontFamily: 'Outfit', fontSize: '15px', color: 'var(--text-mid)', lineHeight: 1.65 }}>{f.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={{ padding: '0 60px 100px', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{
          background: 'var(--text)', borderRadius: '36px', padding: '56px 52px',
          textAlign: 'center', boxShadow: '14px 14px 0px rgba(201,184,217,0.4)',
          position: 'relative', overflow: 'hidden',
        }}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '52px', color: 'white', marginBottom: '14px' }}>let's chat!</h2>
          <p style={{ fontFamily: 'Outfit', fontSize: '18px', color: 'rgba(255,255,255,0.65)', marginBottom: '38px' }}>
            Always down to talk products, design, or trade sweet treat recommendations.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'email me', bg: 'var(--lavender)' },
              { label: 'linkedin', bg: 'var(--yellow)' },
              { label: 'resume',   bg: 'var(--blue-light)' },
            ].map(btn => (
              <button key={btn.label} className="lift" style={{
                fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', fontWeight: 500,
                background: btn.bg, color: 'var(--text)', border: 'none',
                borderRadius: '32px', padding: '15px 34px', cursor: 'pointer',
                boxShadow: '5px 5px 0px rgba(0,0,0,0.15)',
              }}>{btn.label}</button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── RESUME PAGE ──────────────────────────────────────────
function ResumePage() {
  const exp = [
    { role: 'Frontend Software Engineer Intern', co: 'Emerson', loc: 'Round Rock, TX', date: 'June to Aug 2025',
      bullets: ['Developed 8 customizable layout features for internal dashboard using Blazor and C# to improve efficiency and UX', 'Documented feature architecture and design for developer handoff', 'Led daily sync meetings and Agile Scrum ceremonies with senior engineers'] },
    { role: 'Fullstack Software Engineer Intern', co: 'Emerson', loc: 'Round Rock, TX', date: 'June 2024 to May 2025',
      bullets: ['Built web app to improve UX and streamline a tedious cybersecurity documentation process', 'Conducted user interviews, developed 3 personas, researched UI patterns for intuitive design', 'Integrated Azure DevOps & Microsoft SharePoint for SSO and automatic file management'] },
    { role: 'Content Designer', co: 'Fiveable', loc: 'Remote', date: 'Feb to Apr 2024',
      bullets: ['Designed 9 curriculum decks for AP Psychology Cram Sessions with 14k+ live attendees', 'Applied Fiveable design guidelines to maintain visual consistency across all presentations'] },
    { role: 'Marketing Intern', co: 'Mooch', loc: 'Remote', date: 'June to Aug 2023',
      bullets: ['Designed budget trackers and launched a TeachersPayTeachers storefront with 400+ downloads', 'Automated cross-posting across TikTok, Pinterest, and YouTube using Zapier'] },
    { role: 'Small Business Owner', co: 'WithLoveKKate', loc: 'Round Rock, TX', date: 'May 2021 to May 2025',
      bullets: ['4.8/5 stars · 20k+ storefront visits · 1,000+ sales · 700+ nationwide orders on Etsy', 'Analyzed market trends and customer feedback to launch new product lines and refine pricing'] },
  ];
  const leadership = [
    { role: 'Product Management Fellow', org: 'Texas Product Engineering Organization', date: 'Fall 2025 to Present',
      bullets: ['Completed PM curriculum: product lifecycle, market research, competitive analysis, PRDs, and user-centric design', 'Conducted user interviews and survey analysis; translated insights into product requirements'] },
    { role: 'President', org: 'Round Rock High School DECA', date: 'Fall 2021 to Spring 2025',
      bullets: ['Directed 25 officers leading 700+ members through International Business Competitions', 'Implemented 1-on-1 mentoring program, increasing state qualifications by 20%'] },
    { role: 'President', org: 'CodeRRHS', date: 'Fall 2022 to Spring 2025',
      bullets: ['Created and led lessons on Git, UX design, web & game development', 'Introduced coding to 400+ elementary students at STEM fairs'] },
  ];
  const honors = [
    { title: 'AI4FinancialGood Girls Who Code -- Top 6 Finalist', date: 'Spring 2024' },
    { title: 'Texas Mutual UX Design Case Competition -- 1st Place', date: 'Fall 2023' },
    { title: 'Etsy Best Selling Product Award', date: 'Spring 2022' },
    { title: 'Girl Scout Silver Award', date: 'Spring 2021' },
  ];
  const skills    = ['React', 'JavaScript', 'Python', 'C / Assembly', 'Java', 'C#', 'Blazor', 'HTML / CSS', 'MongoDB', 'GraphQL'];
  const certs     = ['Pearson IT Specialist Certification', 'Autodesk Certified User'];
  const interests = ['Film & Digital Photography', 'Scrapbooking', 'Embroidery', 'Disney Theme Parks', 'Product Design'];

  const Section = ({ title, children }) => (
    <div style={{ marginBottom: '56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '36px', color: 'var(--text)', whiteSpace: 'nowrap' }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(138,115,151,0.4), transparent)' }} />
      </div>
      {children}
    </div>
  );

  const Entry = ({ role, co, loc, date, org, bullets }) => (
    <div style={{ marginBottom: '28px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
        <div>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '19px', color: 'var(--text)', fontWeight: 400 }}>{role}</span>
          {(co || org) && <span style={{ fontFamily: 'Outfit', fontSize: '14px', color: 'var(--lavender-mid)', fontWeight: 700, marginLeft: '10px' }}>{co || org}</span>}
          {loc && <span style={{ fontFamily: 'Outfit', fontSize: '13px', color: 'var(--text-light)', marginLeft: '8px' }}>{loc}</span>}
        </div>
        <span style={{ fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600, letterSpacing: '0.3px', whiteSpace: 'nowrap' }}>{date}</span>
      </div>
      {bullets && (
        <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ fontFamily: 'Outfit', fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.65, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--lavender-mid)', marginTop: '2px', flexShrink: 0 }}>&#9670;</span>{b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 60px 100px' }}>

        {/* Header */}
        <div style={{ marginBottom: '60px', paddingBottom: '40px', borderBottom: '1px solid rgba(138,115,151,0.25)' }}>
          <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '11px', color: 'var(--lavender-mid)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>Curriculum Vitae</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 400, fontSize: '72px', color: 'var(--text)', lineHeight: 1, marginBottom: '16px' }}>kate lock</h1>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '18px', color: 'var(--text-mid)', marginBottom: '20px' }}>
            ECE &amp; Business Honors · The University of Texas at Austin
          </p>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { label: 'Email',    val: 'klock@utexas.edu',              href: 'mailto:klock@utexas.edu' },
              { label: 'LinkedIn', val: 'linkedin.com/in/KathrynLock',   href: 'https://linkedin.com/in/KathrynLock' },
              { label: 'Location', val: 'Austin, TX',                    href: null },
            ].map(c => (
              <div key={c.label}>
                <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '9px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '3px' }}>{c.label}</div>
                {c.href
                  ? <a href={c.href} style={{ fontFamily: 'Outfit', fontSize: '13px', color: 'var(--blue)', textDecoration: 'none', fontWeight: 500 }}>{c.val}</a>
                  : <span style={{ fontFamily: 'Outfit', fontSize: '13px', color: 'var(--text-mid)' }}>{c.val}</span>
                }
              </div>
            ))}
          </div>
        </div>

        <Section title="Education">
          <div style={{ background: 'var(--lavender-light)', borderRadius: '20px', padding: '28px 32px', border: '1.5px solid rgba(138,115,151,0.3)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '21px', color: 'var(--text)' }}>The University of Texas at Austin</div>
                <div style={{ fontFamily: 'Outfit', fontSize: '14px', color: 'var(--text-mid)', marginTop: '4px', lineHeight: 1.6 }}>
                  Bachelor of Business Administration, Canfield Business Honors<br />
                  Bachelor of Science, Electrical and Computer Engineering Honors
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>May 2029</div>
                <div style={{ fontFamily: 'Outfit', fontSize: '13px', color: 'var(--lavender-mid)', fontWeight: 700, marginTop: '4px' }}>GPA: 3.72</div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Experience">
          {exp.map((e, i) => <Entry key={i} {...e} />)}
        </Section>

        <Section title="Leadership">
          {leadership.map((e, i) => <Entry key={i} {...e} />)}
        </Section>

        <Section title="Honors">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {honors.map((h, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', border: '1.5px solid var(--lavender-light)', boxShadow: '3px 3px 0px rgba(138,115,151,0.25)' }}>
                <div style={{ fontFamily: 'Outfit', fontSize: '14px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.5, marginBottom: '6px' }}>{h.title}</div>
                <div style={{ fontFamily: 'Outfit', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.5px' }}>{h.date}</div>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
          {[
            { heading: 'Technical Skills', items: skills },
            { heading: 'Certifications',   items: certs },
            { heading: 'Interests',        items: interests },
          ].map(col => (
            <div key={col.heading}>
              <div style={{ fontFamily: 'Outfit', fontWeight: 800, fontSize: '12px', color: 'var(--lavender-mid)', textTransform: 'uppercase', letterSpacing: '1.8px', marginBottom: '14px' }}>{col.heading}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px' }}>
                {col.items.map(item => (
                  <div key={item} style={{ fontFamily: 'Outfit', fontSize: '13px', color: 'var(--text-mid)', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: 'var(--lavender-mid)', flexShrink: 0 }}>&#9670;</span>{item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
