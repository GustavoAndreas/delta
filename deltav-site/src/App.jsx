import "./App.css";
import aboutImage from "./assets/us/us.png";
import addressIcon from "./assets/icons/address.svg";
import copyIcon from "./assets/icons/copy.svg";
import emailIcon from "./assets/icons/email.svg";
import footerLogo from "./assets/logos/white.png";
import logoHeader from "./assets/logos/logo-header.png";
import phoneIcon from "./assets/icons/phone.svg";
import whatsappIcon from "./assets/icons/whatsapp.svg";
import { useEffect, useRef, useState } from "react";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.top = "-1000px";
  textarea.style.left = "-1000px";
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand("copy");
  } finally {
    document.body.removeChild(textarea);
  }
}

function copyToClipboard(text) {
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
    return;
  }
  fallbackCopy(text);
}

function useClickOutside(ref, onOutside) {
  useEffect(() => {
    function handle(e) {
      if (ref.current && !ref.current.contains(e.target)) onOutside();
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [ref, onOutside]);
}

function CopyButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  function handleCopy() {
    copyToClipboard(text);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      className="copyBtn"
      type="button"
      onClick={handleCopy}
      aria-label={label}
      title={label}
    >
      <img className="copyBtn__icon" src={copyIcon} alt="" aria-hidden="true" />
      <span className={`copyToast${copied ? " is-visible" : ""}`}>Copiado</span>
    </button>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false); // dropdown servicos
  const [mobileOpen, setMobileOpen] = useState(false); // menu mobile
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  function go(id) {
    setOpen(false);
    setMobileOpen(false);
    setTimeout(() => scrollToId(id), 0);
  }

  return (
    <header className="navbar" ref={dropdownRef}>
      <div className="container navbar__inner">
        <button className="brand" onClick={() => go("inicio")}>
          <img className="brand__badge" src={logoHeader} alt="Delta V Engenharia" />
          <div>
            <div className="brand__title">Delta V Engenharia</div>
            <div className="brand__subtitle">
              Projetos &#8226; Manuten&#231;&#227;o &#8226; Consultoria T&#233;cnica
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="nav nav--desktop">
          <button className="nav__btn" onClick={() => go("inicio")}>
            In&#237;cio
          </button>
          <button className="nav__btn" onClick={() => go("sobre")}>
            Sobre
          </button>

          <div className="dropdown">
            <button
              className="nav__btn nav__btn--dropdown"
              onClick={() => setOpen((v) => !v)}
            >
              <span>Servi&#231;os</span>
              <span className="nav__caret">&#9662;</span>
            </button>

            {open && (
                            <div className="dropdown__menu" role="menu">
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-projetos")}
                >Projetos e desenvolvimento eletroeletr&#244;nico</button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-automacao")}
                >Automa&#231;&#227;o e instrumenta&#231;&#227;o industrial</button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-montagem-manutencao")}
                >Montagem, instala&#231;&#227;o e manuten&#231;&#227;o industrial</button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-consultoria-treinamentos")}
                >Consultoria t&#233;cnica e treinamentos</button>
              </div>
            )}
          </div>

          <button className="nav__btn" onClick={() => go("clientes")}>
            Clientes
          </button>
          <button className="nav__btn" onClick={() => go("mvv")}>
            Miss&#227;o
          </button>

          <button className="nav__btn" onClick={() => go("contato")}>
            Contato
          </button>
          <button className="nav__btn nav__cta" onClick={() => go("contato")}>
            Or&#231;amento
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className={`nav__toggle${mobileOpen ? " is-open" : ""}`}
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          <span className="nav__toggleIcon" aria-hidden="true" />
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="mobilePanel">
          <div className="container nav--mobile">
            <div className="nav__row nav__row--top">
              <button className="nav__btn" onClick={() => go("inicio")}>
                In&#237;cio
              </button>
              <button className="nav__btn" onClick={() => go("sobre")}>
                Sobre
              </button>
              <button
                className="nav__btn nav__btn--dropdown"
                onClick={() => setOpen((v) => !v)}
              >
                Servi&#231;os <span className="nav__caret">&#9662;</span>
              </button>
            </div>

            {open && (
              <div className="dropdown__menu" role="menu">
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-projetos")}
                >Projetos e desenvolvimento eletroeletr&#244;nico</button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-automacao")}
                >Automa&#231;&#227;o e instrumenta&#231;&#227;o industrial</button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-montagem-manutencao")}
                >Montagem, instala&#231;&#227;o e manuten&#231;&#227;o industrial</button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-consultoria-treinamentos")}
                >Consultoria t&#233;cnica e treinamentos</button>
              </div>
            )}

            <div className="nav__row nav__row--bottom">
              <button className="nav__btn" onClick={() => go("clientes")}>
                Clientes
              </button>
              <button className="nav__btn" onClick={() => go("mvv")}>
                Miss&#227;o
              </button>
              <button className="nav__btn" onClick={() => go("contato")}>
                Contato
              </button>
              <button className="nav__btn nav__cta" onClick={() => go("contato")}>
                Or&#231;amento
              </button>
            </div>

          </div>
        </div>
      )}
    </header>
  );
}

function Section({ id, eyebrow, title, subtitle, children }) {
  return (
    <section id={id} className="section">
      <div className="container">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h2 className="h2">{title}</h2>
        {subtitle && <div className="subtitle">{subtitle}</div>}
        <div style={{ marginTop: 26 }}>{children}</div>
      </div>
    </section>
  );
}

function ClientsCarousel() {
  const containerRef = useRef(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const autoScrollRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const clients = Array.from({ length: 8 }, () => "Nossos clientes");
  const items = [...clients, ...clients];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let frameId = 0;
    let lastTime = performance.now();
    const speed = 75; // px/s
    autoScrollRef.current = el.scrollLeft;

    function tick(now) {
      const delta = now - lastTime;
      lastTime = now;

      if (!draggingRef.current) {
        autoScrollRef.current += (speed * delta) / 1000;
        const half = el.scrollWidth / 2;
        if (half > 0 && autoScrollRef.current >= half) {
          autoScrollRef.current -= half;
        }
        el.scrollLeft = autoScrollRef.current;
      } else {
        autoScrollRef.current = el.scrollLeft;
      }

      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  function handlePointerDown(e) {
    const el = containerRef.current;
    if (!el) return;
    draggingRef.current = true;
    setIsDragging(true);
    el.setPointerCapture(e.pointerId);
    startXRef.current = e.clientX;
    scrollLeftRef.current = el.scrollLeft;
    autoScrollRef.current = el.scrollLeft;
  }

  function handlePointerMove(e) {
    if (!draggingRef.current) return;
    const el = containerRef.current;
    if (!el) return;

    const delta = e.clientX - startXRef.current;
    el.scrollLeft = scrollLeftRef.current - delta;
    autoScrollRef.current = el.scrollLeft;

    const half = el.scrollWidth / 2;
    if (half > 0) {
      if (el.scrollLeft < 0) {
        el.scrollLeft += half;
        scrollLeftRef.current += half;
        autoScrollRef.current = el.scrollLeft;
      } else if (el.scrollLeft >= half) {
        el.scrollLeft -= half;
        scrollLeftRef.current -= half;
        autoScrollRef.current = el.scrollLeft;
      }
    }
  }

  function handlePointerUp(e) {
    const el = containerRef.current;
    if (!draggingRef.current) return;
    draggingRef.current = false;
    setIsDragging(false);
    if (el) el.releasePointerCapture(e.pointerId);
  }

  return (
    <div
      className={`clientsCarousel${isDragging ? " is-dragging" : ""}`}
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      aria-label="Carrossel de clientes"
    >
      <div className="clientsCarousel__track" role="list">
        {items.map((label, index) => (
          <div className="clientsCarousel__item" role="listitem" key={`${label}-${index}`}>
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [expandedServiceId, setExpandedServiceId] = useState(null);

  function handleServiceExpand(id) {
    setExpandedServiceId((prev) => (prev === id ? prev : id));
  }

  const services = [
    {
      id: "servicos-projetos",
      title: "Projetos e desenvolvimento eletroeletrônico",
      short:
        "Desenvolvimento de soluções e projetos eletroeletrônicos sob medida, com foco em confiabilidade e desempenho industrial.",
      long:
        "Projetamos e desenvolvemos soluções eletroeletrônicas sob medida, com análise técnica, especificação de componentes e adequações em sistemas existentes, priorizando confiabilidade, segurança e viabilidade de implementação.",
      image: "/images/projetos-eletroeletronicos.jpg",
      cta: "Falar com a equipe",
    },
    {
      id: "servicos-automacao",
      title: "Automação e instrumentação industrial",
      short:
        "Medição, teste, controle e integração de sistemas para otimizar processos e aumentar a estabilidade operacional.",
      long:
        "Atuamos em automação e instrumentação industrial para controle e monitoramento de processos. Aplicamos soluções de medição, teste e controle, com foco em rastreabilidade, continuidade operacional e ganhos de eficiência. Integração e adequações conforme o seu cenário.",
      image: "/images/automacao-instrumentacao.jpg",
      cta: "Falar com a equipe",
    },
    {
      id: "servicos-montagem-manutencao",
      title: "Montagem, instalação e manutenção industrial",
      short:
        "Instalação e manutenção de máquinas e equipamentos industriais, com diagnóstico de falhas e recuperação da capacidade operacional.",
      long:
        "Realizamos montagem, instalação e manutenção corretiva/preventiva em máquinas e equipamentos industriais. Atuamos na identificação de falhas, recuperação de desempenho e suporte técnico em campo, com atendimento ágil e alinhamento de escopo para reduzir paradas e riscos.",
      image: "/images/montagem-manutencao.jpg",
      cta: "Falar com a equipe",
    },
    {
      id: "servicos-consultoria-treinamentos",
      title: "Consultoria técnica e treinamentos",
      short:
        "Consultoria e capacitação de equipes técnicas e lideranças, promovendo autonomia, segurança e eficiência.",
      long:
        "Oferecemos consultoria técnica e treinamentos para equipes e lideranças, com foco em aplicação prática. Ajudamos na tomada de decisão, padronização, orientação técnica e desenvolvimento profissional, elevando a qualidade do atendimento e a eficiência operacional.",
      image: "/images/consultoria-treinamentos.jpg",
      cta: "Falar com a equipe",
    },
  ];

  return (
    <div className="page">
      <Navbar />

      <section id="inicio" className="heroVideo">
        {/* Vídeo */}
        <div className="heroVideo__media">
          <video autoPlay muted loop playsInline preload="metadata">
            <source src="/videos/video.mp4" type="video/mp4" />
          </video>
        </div>


        {/* Conteúdo */}
        <div className="heroVideo__content">
          <div className="heroVideo__kicker">Sorocaba-SP • Desde 2016</div>

          <h1 className="heroVideo__title">Engenharia aplicada para a indústria de Sorocaba e região</h1>

          <p className="heroVideo__text">
            Desde 2016, a Delta V Engenharia desenvolve soluções em automação industrial, eletrônica e
            manutenção, com foco em eficiência operacional.
          </p>

          <div className="heroVideo__actions">
            <button className="btn btn--primary" onClick={() => scrollToId("contato")}>
              Solicitar orçamento
            </button>
            <button className="btn btn--ghost" onClick={() => scrollToId("servicos")}>
              Ver serviços
            </button>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <Section
        id="sobre"
        eyebrow="Quem somos"
        title="Engenharia aplicada com foco em confiabilidade"
        subtitle="Delta V Engenharia Ltda — Sorocaba-SP."
      >
        <div className="aboutLayout">
          <div className="aboutSplit">
            <div className="aboutImage">
              <img src={aboutImage} alt="Equipe da Delta V Engenharia" loading="lazy" />
            </div>
            <div className="aboutText">
              <p className="aboutLead">
                Fundada em 2016, a <strong>Delta V Engenharia</strong> surgiu da necessidade das empresas da
                região de Sorocaba em inovar nas áreas de <strong>Automação Industrial</strong> e
                <strong> Eletrônica</strong>, atuando em diversos segmentos ao longo de sua trajetória.
              </p>
              <p className="aboutBody">
                Suas principais atividades incluem desenvolvimento de projetos de produtos eletroeletrônicos,
                montagem e manutenção de equipamentos industriais, consultoria técnica e treinamentos. Com foco
                em sempre atender de maneira <strong>ágil</strong> e <strong>eficiente</strong> às expectativas
                dos seus clientes.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SERVIÇOS (novo layout estilo card com expansão) */}
      <Section
        id="servicos"
        eyebrow="O que fazemos"
        title="Soluções em Engenharia Industrial"
        subtitle="Da concepção do projeto à operação: automação, eletroeletrônica, manutenção e capacitação técnica com foco em confiabilidade."
      >
        <div className="servicesGrid">
          {services.map((s) => (
            <article
              key={s.id}
              id={s.id}
              className={`serviceCard${expandedServiceId === s.id ? " is-expanded" : ""}`}
              onClick={() => handleServiceExpand(s.id)}
            >
              <div className="serviceCard__viewport">
                <div className="serviceCard__track">
                  {/* FACE 1 (normal) */}
                  <div className="serviceCard__face serviceCard__face--front">
                    <div className="serviceCard__media">
                      <img src={s.image} alt={s.title} loading="lazy" />
                      <div className="serviceCard__mediaFade" />
                    </div>

                    <div className="serviceCard__body">
                      <h3 className="serviceCard__title">{s.title}</h3>
                      <p className="serviceCard__text">{s.short}</p>
                      <button type="button" className="btn serviceCard__btn">
                        Ver serviço
                      </button>
                    </div>
                  </div>

                  {/* FACE 2 (detalhes) */}
                  <div className="serviceCard__face serviceCard__face--details">
                    <div className="serviceCard__media serviceCard__media--details">
                      <img src={s.image} alt="" loading="lazy" />
                      <div className="serviceCard__detailsOverlay" />
                    </div>

                    <div className="serviceCard__body serviceCard__body--details">
                      <h3 className="serviceCard__title">{s.title}</h3>
                      <p className="serviceCard__long">{s.long}</p>

                      <div className="serviceCard__ctaRow">
                        <button
                          className="btn btn--primary"
                          onClick={(event) => {
                            event.stopPropagation();
                            scrollToId("contato");
                          }}
                        >
                          {s.cta}
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* CLIENTES */}
      <Section
        id="clientes"
        eyebrow="Relacionamento"
        title="Nossos clientes"
        subtitle="Parcerias que confiam na nossa entrega."
      >
        <ClientsCarousel />
      </Section>

                  {/* MISSÃO, VISÃO E VALORES */}
      <Section
        id="mvv"
        eyebrow="Nossa essência"
        title="Missão, visão e valores"
        subtitle="O que guia nossa atuação no dia a dia."
      >
        <div className="grid grid--3">
          <div className="card">
            <h3 className="card__title">Missão</h3>
            <p className="card__text">
              Entregar soluções em instrumentação, automação e engenharia com segurança, precisão e
              confiabilidade, garantindo a continuidade e a estabilidade das operações dos nossos clientes.
            </p>
          </div>
          <div className="card">
            <h3 className="card__title">Visão</h3>
            <p className="card__text">
              Ser referência regional em automação, manutenção e instalação industrial, reconhecida pela
              qualidade técnica e por parcerias de longo prazo.
            </p>
          </div>
          <div className="card">
            <h3 className="card__title">Valores</h3>
            <p className="card__text">
              Segurança, ética e transparência, foco no cliente e melhoria contínua em cada entrega.
            </p>
          </div>
        </div>
      </Section>

      {/* FIM DO SITE: CONTATO + CARD COM MAPA + FOOTER (SEM FORM) */}
      <section className="endBlock" id="contato">
        <div className="endBlock__hero">
          <div className="endBlock__heroInner">
            <h2 className="endBlock__heroTitle">Fale com a Delta V</h2>
            <p className="endBlock__heroSubtitle">
              Or&#231;amentos e atendimento técnico para instrumentação, instalação e serviços de engenharia.
            </p>
          </div>
        </div>

        <div className="contactCard">
          <div className="contactCard__box contactCard__box--map">
            {/* ESQUERDA: infos */}
            <aside className="contactLeft">
              <div className="contactPrompt">Entre em contato</div>

              <div className="infoList">
                <div className="infoItem">
                  <div className="infoIcon">
                    <img className="infoIcon__img" src={addressIcon} alt="" aria-hidden="true" />
                  </div>
                  <div className="infoContent">
                    <div className="infoHeader">
                      <p className="infoLabel">
                      Endereço
                      </p>
                      <CopyButton
                    text="Rua Maria Carmen Rodrigues Saker, 90 - Jardim do Paço, Sorocaba-SP"
                    label="Copiar endereço"
                  />
                    </div>
                    <div className="infoValue">
                    Rua Maria Carmen Rodrigues Saker, 90<br />
                    Jardim do Paço — Sorocaba-SP
                    </div>
                  </div>
                </div>

                <div className="infoItem">
                  <div className="infoIcon">
                    <img className="infoIcon__img" src={emailIcon} alt="" aria-hidden="true" />
                  </div>
                  <div className="infoContent">
                    <div className="infoHeader">
                      <p className="infoLabel">
                      Email
                      </p>
                      <CopyButton text="luizf.vieira@deltavengenharia.com.br" label="Copiar email" />
                    </div>
                    <div className="infoValue">
                    luizf.vieira@deltavengenharia.com.br
                    </div>
                  </div>
                </div>

                <div className="infoItem">
                  <div className="infoIcon">
                    <img className="infoIcon__img" src={phoneIcon} alt="" aria-hidden="true" />
                  </div>
                  <div className="infoContent">
                    <div className="infoHeader">
                      <p className="infoLabel">
                      Telefone
                      </p>
                      <CopyButton text="15 3228 5696" label="Copiar telefone" />
                    </div>
                    <div className="infoValue">
                    15 3228 5696
                    </div>
                  </div>
                </div>

                <div className="infoItem">
                  <div className="infoIcon">
                    <img className="infoIcon__img" src={whatsappIcon} alt="" aria-hidden="true" />
                  </div>
                  <div className="infoContent">
                    <div className="infoHeader">
                      <p className="infoLabel">
                      WhatsApp
                      </p>
                      <CopyButton text="15 99147 8419" label="Copiar WhatsApp" />
                    </div>
                    <div className="infoValue">
                    15 99147 8419
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* DIREITA: MAPA grande */}
            <div className="contactMap">
              <iframe
                title="Mapa - Delta V Engenharia"
                className="contactMap__frame"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Rua%20Maria%20Carmen%20Rodrigues%20Saker%2090%20Sorocaba-SP&output=embed"
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="footerMega">
          <div className="footerMega__inner">
            <div>
              <h4>Delta V Engenharia</h4>
              <p>
                Desde 2016, a Delta V Engenharia atua no desenvolvimento de soluções em automação industrial e eletrônica, oferecendo projetos, manutenção, consultoria técnica e treinamentos com foco em eficiência operacional.
              </p>
            </div>

            <div>
              <h4>Empresa</h4>
              <div className="footerLinks">
                <a href="#sobre">Sobre</a>
                <a href="#servicos">Serviços</a>
                <a href="#clientes">Clientes</a>
                <a href="#mvv">Missão</a>
                <a href="#contato">Contato</a>
              </div>
            </div>

            <div>
              <h4>Suporte</h4>
              <div className="footerLinks">
                <a href="#contato">Or&#231;amento</a>
                <a href="#contato">Atendimento</a>
              </div>
            </div>

            <div className="footerLogoCol">
              <img className="footerLogo" src={footerLogo} alt="Delta V Engenharia" />
            </div>
          </div>

          <div className="footerBottom">
            <div>© {new Date().getFullYear()} Delta V Engenharia Ltda</div>
            <div>CNPJ 25.210.791/0001-05</div>
          </div>
        </footer>
      </section>

      {/* WhatsApp flutuante (sempre visível) */}
      <a
  className="waFloat"
  href="https://wa.me/5515991478419"
  target="_blank"
  rel="noreferrer"
  aria-label="Chamar no WhatsApp"
  title="Chamar no WhatsApp"
>
  <img className="waFloat__icon" src="/icons/whatsapp.svg" alt="" />
</a>

    </div>
  );
}
