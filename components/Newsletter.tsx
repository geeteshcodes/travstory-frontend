"use client";

export default function Newsletter() {
  return (
    <section
      className="bg-surface/40 backdrop-blur-sm py-24 lg:py-32 px-6 lg:px-12"
      id="newsletter"
      aria-label="Newsletter signup"
    >
      <div className="flex justify-center">
        <div className="max-w-lg text-center">
        <span className="font-label text-brand font-bold tracking-[0.2em] text-sm uppercase mb-20 block">
          Join the Voyage
        </span>
        <h2 className="font-headline text-5xl lg:text-6xl font-black text-on-surface mb-20 tracking-tighter leading-tight">
          Weekly Dispatch
        </h2>
        <p className="font-body text-lg lg:text-xl text-on-surface-variant mb-24 text-center leading-relaxed">
          Curated stories, early destination access, and the art of slowing
          down. Delivered every Sunday morning.
        </p>
        <form
          className="flex flex-col md:flex-row gap-6 justify-center"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            className="md:w-64 bg-surface-container-lowest border border-on-surface/10 px-6 py-4 rounded-lg font-body focus:ring-2 focus:ring-brand focus:outline-none placeholder:text-on-surface/40 transition-all"
            placeholder="Enter your email address"
            type="email"
            id="newsletter-email"
            aria-label="Email address for newsletter"
          />
          <button
            className="w-full md:w-auto bg-on-surface text-surface px-10 py-4 rounded-lg font-label font-bold transition-all hover:bg-brand hover:text-white cursor-pointer"
            type="submit"
            id="newsletter-submit"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-20 text-sm font-body text-on-surface-variant opacity-60 text-center leading-relaxed">
          We value your privacy. Unsubscribe at any time.
        </p>
        </div>
      </div>
    </section>
  );
}
