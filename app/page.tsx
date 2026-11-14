"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowUpRight, Check, ChevronRight, Globe2, Layers3 } from "lucide-react";
import { appConfig } from "@/config/app.config";
import "./studio.css";

const steps = [
  { n: "01", name: "Understand", detail: "Capture the existing website and its content." },
  { n: "02", name: "Upgrade", detail: "Rebuild with stronger hierarchy and responsive design." },
  { n: "03", name: "Review", detail: "Compare, refine, and export the result." },
] as const;

function OctoFrameLogo() {
  return (
    <span className="of-brand" aria-label="OctoFrame Studio">
      <span className="of-symbol" aria-hidden="true">
        <i /><i /><i /><i />
      </span>
      <span className="of-brandname">octoframe<span className="of-reg">®</span></span>
      <span className="of-brand-divider" />
      <span className="of-studio-label">Studio</span>
    </span>
  );
}

function DemoSite({ improved = false }: { improved?: boolean }) {
  return (
    <div className={"of-demo-site " + (improved ? "of-after" : "of-before")} aria-label={improved ? "Illustrative upgraded website" : "Illustrative existing website"}>
      <div className="of-demo-top">
        <span className="of-demo-name">{improved ? "MONO." : "Mono Studio"}</span>
        <span className="of-demo-links">Work <span>About</span> Contact</span>
        {improved && <span className="of-demo-cta">Let’s talk ↗</span>}
      </div>
      {improved ? (
        <div className="of-after-body">
          <div className="of-after-copy"><small>INDEPENDENT CREATIVE STUDIO</small><strong>Ideas with<br/>intention<span>.</span></strong><p>Thoughtful digital experiences for ambitious brands.</p><span className="of-faux-button">Explore our work ↗</span></div>
          <div className="of-after-art"><span className="of-art-disc" /><span className="of-art-corner" /></div>
        </div>
      ) : (
        <div className="of-before-body">
          <h3>Welcome to our website!</h3><p>We create creative solutions for your business.</p>
          <div className="of-before-placeholder" /><span className="of-before-button">Learn more</span>
        </div>
      )}
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const engineEnabled = process.env.NEXT_PUBLIC_STUDIO_ENABLED === "true";
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!engineEnabled) return;
    const candidate = url.trim();
    let parsed: URL;
    try {
      parsed = new URL(/^https?:\/\//i.test(candidate) ? candidate : "https://" + candidate);
      if (!["http:", "https:"].includes(parsed.protocol) || !parsed.hostname.includes(".")) throw new Error("Invalid address");
    } catch {
      setError("Enter a valid public website URL to get started.");
      return;
    }
    setError("");
    sessionStorage.setItem("targetUrl", parsed.toString());
    sessionStorage.setItem("selectedStyle", "4");
    sessionStorage.setItem("selectedModel", appConfig.ai.defaultModel);
    sessionStorage.setItem("autoStart", "true");
    sessionStorage.removeItem("brandExtensionMode");
    sessionStorage.removeItem("brandExtensionPrompt");
    router.push("/generation");
  }

  return (
    <main className="of-shell">
      <header className="of-header">
        <div className="of-content of-nav">
          <OctoFrameLogo />
          <div className="of-nav-right">
            <span className="of-private"><span /> PRIVATE WORKSPACE</span>
            <a className="of-nav-link" href="https://github.com/r-pedro17/open-lovable" target="_blank" rel="noreferrer">Source <ArrowUpRight size={15} /></a>
          </div>
        </div>
      </header>

      <div className="of-content of-main">
        <div className="of-intro">
          <div className="of-eyebrow"><span className="of-dot" /> WEBSITE UPGRADE STUDIO <span className="of-eyebrow-line" /> V1</div>
          <h1>A better website<br/><em>starts here.</em></h1>
          <p>Paste a website. We’ll rebuild it with sharper design, clearer structure, and the details that make it feel considered.</p>

          <form className="of-form" onSubmit={submit}>
            <label htmlFor="website-url">YOUR EXISTING WEBSITE</label>
            <div className="of-form-row">
              <Globe2 size={19} aria-hidden="true" />
              <input id="website-url" type="text" value={url} onChange={e => {setUrl(e.target.value);setError("");}} placeholder="yourwebsite.com" autoComplete="url" required aria-invalid={!!error} aria-describedby={error ? "of-error" : undefined} />
              <button type="submit" disabled={!engineEnabled} title={!engineEnabled ? "Studio engine is being configured" : "Upgrade website"}>{engineEnabled ? "Upgrade website" : "Studio coming soon"} <ArrowRight size={18} /></button>
            </div>
            {error ? <p id="of-error" className="of-error" role="alert">{error}</p> : <p className="of-form-note"><Check size={14}/>{engineEnabled ? "Keep the content. Improve the experience." : "Preview available now. Website generation opens after setup."}</p>}
          </form>
        </div>

        <section className="of-preview-section" aria-labelledby="of-preview-title">
          <div className="of-section-heading">
            <div><span className="of-section-kicker">THE DIFFERENCE</span><h2 id="of-preview-title">See what better looks like<span className="of-coral">.</span></h2></div>
            <span className="of-demo-label">ILLUSTRATIVE EXAMPLE — NOT A GENERATED RESULT</span>
          </div>
          <div className="of-browser-grid">
            <div className="of-browser">
              <div className="of-browser-chrome"><div className="of-chrome-dots"><i/><i/><i/></div><span>before.example</span><span className="of-chrome-label">BEFORE</span></div>
              <DemoSite />
            </div>
            <div className="of-browser of-browser-featured">
              <div className="of-browser-chrome"><div className="of-chrome-dots"><i/><i/><i/></div><span>after.example</span><span className="of-chrome-label">AFTER <span className="of-lime-dot"/></span></div>
              <DemoSite improved />
            </div>
          </div>
          <p className="of-preview-caption">Designed to show the intended improvement. Actual results are generated and reviewed in your workspace.</p>
        </section>

        <section className="of-process" aria-label="How it works">
          <div className="of-process-label"><Layers3 size={19}/><span>THREE SIMPLE STEPS</span></div>
          <div className="of-process-grid">
            {steps.map(step => <div className="of-step" key={step.n}><span className="of-step-num">{step.n}</span><h3>{step.name} <ChevronRight size={18}/></h3><p>{step.detail}</p></div>)}
          </div>
        </section>
        <footer className="of-footer"><span>OCTOFRAME® STUDIO</span><span>RECONSTRUCT · REFINE · EXPORT</span><span>Designed with intention.</span></footer>
      </div>
    </main>
  );
}
