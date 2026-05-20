import { useIsMobile } from '../hooks/useIsMobile';
import { ResumeMargin, lookupNote } from '../components/ResumeMargin';

export function ResumePage({ tweaks }) {
  const isMobile = useIsMobile();
  const showMargins = !!tweaks?.resumeMargins && !isMobile;

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
    { title: 'AI4FinancialGood Girls Who Code — Top 6 Finalist', date: 'Spring 2024' },
    { title: 'Texas Mutual UX Design Case Competition — 1st Place', date: 'Fall 2023' },
    { title: 'Etsy Best Selling Product Award', date: 'Spring 2022' },
    { title: 'Girl Scout Silver Award', date: 'Spring 2021' },
  ];
  const skills    = ['React', 'JavaScript', 'Python', 'C / Assembly', 'Java', 'C#', 'Blazor', 'HTML / CSS', 'MongoDB', 'GraphQL'];
  const certs     = ['Pearson IT Specialist Certification', 'Autodesk Certified User'];
  const interests = ['Film & Digital Photography', 'Scrapbooking', 'Embroidery', 'Disney Theme Parks', 'Product Design'];

  const Section = ({ title, children, timeline }) => (
    <div style={{ marginBottom: '56px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <h2 style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '28px' : '36px', color: 'var(--text)', whiteSpace: 'nowrap' }}>{title}</h2>
        <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(138,115,151,0.4), transparent)' }} />
      </div>
      <div style={{ position: 'relative' }}>
        {showMargins && timeline && (
          <div style={{
            position: 'absolute', left: '13px', top: '12px', bottom: '12px',
            width: '1px', borderLeft: '1.5px dotted rgba(138,115,151,0.55)',
            pointerEvents: 'none',
          }} />
        )}
        {children}
      </div>
    </div>
  );

  const Entry = ({ role, co, loc, date, org, bullets }) => (
    <div style={{
      marginBottom: '28px',
      paddingLeft: showMargins ? '32px' : '0',
      position: 'relative',
    }}>
      {showMargins && (
        <div style={{
          position: 'absolute', left: '8px', top: '10px',
          width: '10px', height: '10px', borderRadius: '50%',
          background: 'var(--bg)', border: '2px solid var(--lavender-mid)',
        }} />
      )}
      {showMargins && (() => { const n = lookupNote(co || org, date); return n ? <ResumeMargin note={n} /> : null; })()}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
        <div>
          <span style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: isMobile ? '17px' : '19px', color: 'var(--text)', fontWeight: 400 }}>{role}</span>
          {(co || org) && <span style={{ fontFamily: 'Outfit', fontSize: '14px', color: 'var(--lavender-mid)', fontWeight: 700, marginLeft: '10px' }}>{co || org}</span>}
          {loc && !isMobile && <span style={{ fontFamily: 'Outfit', fontSize: '13px', color: 'var(--text-light)', marginLeft: '8px' }}>{loc}</span>}
        </div>
        <span style={{ fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600, whiteSpace: 'nowrap', letterSpacing: '0.3px' }}>{date}</span>
      </div>
      {bullets && (
        <ul style={{ paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {bullets.map((b, i) => (
            <li key={i} style={{ fontFamily: 'Outfit', fontSize: isMobile ? '13px' : '14px', color: 'var(--text-mid)', lineHeight: 1.65, display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <span style={{ color: 'var(--lavender-mid)', marginTop: '2px', flexShrink: 0 }}>&#9670;</span>{b}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', paddingTop: '90px', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: isMobile ? '40px 24px 80px' : '60px 60px 100px' }}>

        <div style={{ marginBottom: '60px', paddingBottom: '40px', borderBottom: '1px solid rgba(138,115,151,0.25)' }}>
          <h1 style={{ fontFamily: "'Newsreader', serif", fontWeight: 400, fontSize: isMobile ? '52px' : '72px', color: 'var(--text)', lineHeight: 1, marginBottom: '16px' }}>kate lock</h1>
          <p style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '18px', color: 'var(--text-mid)', marginBottom: '20px' }}>
            ECE &amp; Business Honors · The University of Texas at Austin
          </p>
          <div style={{ display: 'flex', gap: isMobile ? '16px' : '24px', flexWrap: 'wrap' }}>
            {[
              { label: 'Email',    val: 'klock@utexas.edu',            href: 'mailto:klock@utexas.edu' },
              { label: 'LinkedIn', val: 'linkedin.com/in/KathrynLock', href: 'https://linkedin.com/in/KathrynLock' },
              { label: 'Location', val: 'Austin, TX',                  href: null },
            ].map(c => (
              <div key={c.label}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '9px', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '1.5px', marginBottom: '3px' }}>{c.label}</div>
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
                <div style={{ fontFamily: "'Newsreader', serif", fontStyle: 'italic', fontSize: '21px', color: 'var(--text)' }}>The University of Texas at Austin</div>
                <div style={{ fontFamily: 'Outfit', fontSize: '14px', color: 'var(--text-mid)', marginTop: '4px', lineHeight: 1.6 }}>
                  Bachelor of Business Administration, Canfield Business Honors<br />
                  Bachelor of Science, Electrical and Computer Engineering Honors
                </div>
              </div>
              <div style={{ textAlign: isMobile ? 'left' : 'right' }}>
                <div style={{ fontFamily: 'Outfit', fontSize: '12px', color: 'var(--text-light)', fontWeight: 600 }}>May 2029</div>
                <div style={{ fontFamily: 'Outfit', fontSize: '13px', color: 'var(--lavender-mid)', fontWeight: 700, marginTop: '4px' }}>GPA: 3.72</div>
              </div>
            </div>
          </div>
        </Section>

        <Section title="Experience" timeline>
          {exp.map((e, i) => <Entry key={i} {...e} />)}
        </Section>

        <Section title="Leadership" timeline>
          {leadership.map((e, i) => <Entry key={i} {...e} />)}
        </Section>

        <Section title="Honors">
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '12px' }}>
            {honors.map((h, i) => (
              <div key={i} style={{ background: 'white', borderRadius: '16px', padding: '18px 20px', border: '1.5px solid var(--lavender-light)', boxShadow: '3px 3px 0px rgba(138,115,151,0.25)' }}>
                <div style={{ fontFamily: 'Outfit', fontSize: '14px', fontWeight: 600, color: 'var(--text)', lineHeight: 1.5, marginBottom: '6px' }}>{h.title}</div>
                <div style={{ fontFamily: 'Outfit', fontSize: '11px', color: 'var(--text-light)', fontWeight: 700, letterSpacing: '0.5px' }}>{h.date}</div>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : '1fr 1fr 1fr', gap: '24px' }}>
          {[
            { heading: 'Technical Skills', items: skills },
            { heading: 'Certifications',   items: certs },
            { heading: 'Interests',        items: interests },
          ].map(col => (
            <div key={col.heading} style={{ gridColumn: isMobile && col.heading === 'Technical Skills' ? 'span 2' : undefined }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 500, fontSize: '12px', color: 'var(--lavender-mid)', textTransform: 'uppercase', letterSpacing: '1.8px', marginBottom: '14px' }}>{col.heading}</div>
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
