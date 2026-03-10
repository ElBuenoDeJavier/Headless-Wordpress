const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL
  ? `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/graphql`
  : 'http://wordpress/graphql'

async function getPosts() {
  try {
    const res = await fetch(WORDPRESS_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query {
            posts(first: 6) {
              nodes {
                id
                title
                date
                excerpt
                slug
              }
            }
          }
        `
      }),
      cache: 'no-store',
      next: { revalidate: 0 }
    })

    if (!res.ok) {
      console.warn(`WordPress API returned status ${res.status}`);
      return [];
    }

    const contentType = res.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      console.warn("WordPress API did not return JSON");
      return [];
    }

    const data = await res.json()
    return data?.data?.posts?.nodes || []
  } catch (error) {
    console.error("Fetch error in getPosts:", error.message)
    return []
  }
}

export default async function Home() {
  const posts = await getPosts()

  return (
    <main className="flex-1 w-full flex flex-col">

      {/* ══════════════ HERO SECTION ══════════════ */}
      <section className="relative min-h-[90vh] flex flex-col px-6 md:px-12 pt-32 pb-12 w-full max-w-[1600px] mx-auto">
        <div className="flex-1 flex flex-col justify-center max-w-5xl z-10">
          <p className="text-accent text-sm tracking-[0.3em] uppercase mb-8 ml-2 font-medium">Digital Craftsmanship</p>
          <h1 className="text-[12vw] md:text-[8rem] font-bold leading-[0.85] tracking-tighter mb-12">
            Design <br />
            <span className="text-zinc-600 italic font-light">&</span> Code.
          </h1>
          <p className="max-w-xl text-zinc-400 text-lg md:text-xl leading-relaxed">
            We are Fabrica®, a creative engineering studio building immersive digital experiences that elevate modern brands.
          </p>
        </div>

        {/* Background Images for Hero */}
        <div className="absolute top-1/4 right-12 w-1/3 aspect-[3/4] hidden lg:block opacity-60 hover:opacity-100 transition-opacity duration-700">
          <img src="/images/hero-portrait.png" alt="Hero" className="w-full h-full object-cover rounded-xl filter grayscale hover:grayscale-0 transition-all duration-1000" />
        </div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <div className="w-full overflow-hidden border-y border-white/10 py-6 bg-black">
        <div className="flex whitespace-nowrap animate-marquee">
          {/* We repeat the items to create a seamless loop effect */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 px-8 items-center">
              <span className="text-4xl font-light tracking-tight text-white/50">✦</span>
              <span className="text-4xl font-medium tracking-tighter uppercase uppercase">Brand Identity</span>
              <span className="text-4xl font-light tracking-tight text-white/50">✦</span>
              <span className="text-4xl font-medium tracking-tighter uppercase uppercase">Web Platform</span>
              <span className="text-4xl font-light tracking-tight text-white/50">✦</span>
              <span className="text-4xl font-medium tracking-tighter uppercase uppercase">Creative Direction</span>
              <span className="text-4xl font-light tracking-tight text-white/50">✦</span>
              <span className="text-4xl font-medium tracking-tighter uppercase uppercase">Motion Design</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════ WORK SECTION ══════════════ */}
      <section id="work" className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <span className="inline-block w-12 h-px bg-accent mb-6"></span>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tighter">Selected Work</h2>
          </div>
          <p className="text-zinc-400 max-w-sm">
            Pushing the boundaries of aesthetics and performance for industry-leading clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 - Large */}
          <div className="group relative aspect-square lg:aspect-auto lg:row-span-2 overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer">
            <img src="/images/project-chair.png" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0" alt="Project" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <p className="text-accent text-xs tracking-widest uppercase mb-2">Industrial Design</p>
              <h3 className="text-3xl font-bold">Nordic Minimal</h3>
            </div>
          </div>
          {/* Card 2 */}
          <div className="group relative aspect-square lg:aspect-[4/3] overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer">
            <img src="/images/project-fashion.png" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0" alt="Project" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <p className="text-accent text-xs tracking-widest uppercase mb-2">Editorial</p>
              <h3 className="text-2xl font-bold">Urban Edge</h3>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group relative aspect-square lg:aspect-[4/3] overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer">
            <img src="/images/project-nature.png" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0" alt="Project" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 flex flex-col justify-end">
              <p className="text-accent text-xs tracking-widest uppercase mb-2">Web Platform</p>
              <h3 className="text-2xl font-bold">Botanic Pulse</h3>
            </div>
          </div>
          {/* Card 4 - Wide */}
          <div className="group relative aspect-square lg:col-span-2 overflow-hidden bg-zinc-900 rounded-2xl cursor-pointer">
            <img src="/images/project-architecture.png" className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 filter grayscale group-hover:grayscale-0" alt="Project" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent p-8 flex flex-col justify-end">
              <p className="text-accent text-xs tracking-widest uppercase mb-2">Architecture</p>
              <h3 className="text-3xl font-bold">Concrete Forms</h3>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ WORDPRESS JOURNAL / BLOG SECTION ══════════════ */}
      <section id="journal" className="py-32 px-6 md:px-12 w-full bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-12 gap-8">
            <div>
              <p className="text-sm tracking-[0.2em] uppercase text-accent mb-4 pl-2 border-l-2 border-accent">Insights</p>
              <h2 className="text-5xl md:text-6xl font-bold tracking-tight">Journal</h2>
            </div>
            <a href="#" className="text-xs uppercase tracking-widest hover:text-accent transition-colors pb-2">View All Posts ↗</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.length > 0 ? (
              posts.map((post, idx) => {
                // Formatting the date nicely
                const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                // Fallback images based on index
                const fallbackImages = [
                  "/images/blog-studio.png",
                  "/images/blog-creative.png",
                  "/images/hero-eye.png"
                ];
                const imageSrc = fallbackImages[idx % fallbackImages.length];

                return (
                  <article key={post.id} className="group cursor-pointer flex flex-col h-full bg-[#111] rounded-2xl overflow-hidden hover:bg-[#151515] transition-colors duration-300 border border-white/5 hover:border-white/10">
                    <div className="aspect-[16/10] w-full overflow-hidden bg-black relative">
                      <img
                        src={imageSrc}
                        alt={post.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 filter grayscale group-hover:grayscale-0 transition-all duration-700"
                      />
                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] tracking-wider uppercase text-white font-medium border border-white/10">
                        {formattedDate}
                      </div>
                    </div>

                    <div className="p-8 flex flex-col flex-1">
                      <h3 className="text-2xl font-bold tracking-tight mb-4 group-hover:text-accent transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <div
                        className="text-zinc-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-1"
                        dangerouslySetInnerHTML={{ __html: post.excerpt || '<p>Read the full article to discover our latest insights and thoughts on design and technology.</p>' }}
                      />
                      <div className="pt-6 border-t border-white/5 flex items-center justify-between mt-auto">
                        <span className="text-xs font-semibold uppercase tracking-widest text-[#f5f5f5]">Read Article</span>
                        <span className="text-accent transform group-hover:translate-x-2 transition-transform duration-300">→</span>
                      </div>
                    </div>
                  </article>
                );
              })
            ) : (
              <div className="col-span-full py-20 px-6 rounded-2xl bg-[#111] border border-white/5 border-dashed flex flex-col items-center justify-center text-center">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 text-2xl">📝</div>
                <h3 className="text-2xl font-bold mb-2">No Journal Entries Found</h3>
                <p className="text-zinc-500 max-w-md">
                  We couldn't retrieve any posts from WordPress. Please ensure WPGraphQL is active and you have published some posts.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="w-full bg-black border-t border-white/10 pt-24 pb-8 px-6 md:px-12 mt-auto">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
            <div className="lg:col-span-2">
              <h4 className="text-3xl font-extrabold tracking-tighter mb-6 flex items-center gap-2">
                FABRICA<div className="w-3 h-3 bg-accent rounded-full"></div>
              </h4>
              <p className="text-zinc-400 max-w-sm text-lg">
                Crafting digital excellence through intentional design and solid engineering.
              </p>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-zinc-600 mb-6 font-semibold">Social</h5>
              <ul className="space-y-4">
                <li><a href="#" className="hover:text-accent transition-colors">Instagram</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">Twitter (X)</a></li>
                <li><a href="#" className="hover:text-accent transition-colors">LinkedIn</a></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs uppercase tracking-widest text-zinc-600 mb-6 font-semibold">Contact</h5>
              <ul className="space-y-4">
                <li><a href="mailto:hello@fabrica.studio" className="hover:text-accent transition-colors">hello@fabrica.studio</a></li>
                <li className="text-zinc-400">Madrid, Spain</li>
                <li className="text-zinc-400">+34 600 000 000</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-zinc-600 font-medium tracking-wide">
            <p>© {new Date().getFullYear()} FABRICA STUDIO. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors uppercase">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors uppercase">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </main>
  );
}