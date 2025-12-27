import "./App.css";
import instrumentosMedidaTesteControle from "./assets/services/instrumentos-medida-teste-controle.jpg";
import maquinasIndustriais from "./assets/services/maquinas-industriais.jpg";
import instalacaoIndustrial from "./assets/services/instalacao-industrial.jpg";
import servicosDeEngenharia from "./assets/services/servicos-de-engenharia.jpg";
import treinamentoDesenvolvimento from "./assets/services/treinamento-desenvolvimento-profissional.jpg";
import addressIcon from "./assets/icons/address.svg";
import emailIcon from "./assets/icons/email.svg";
import phoneIcon from "./assets/icons/phone.svg";
import whatsappIcon from "./assets/icons/whatsapp.svg";
import { useEffect, useRef, useState } from "react";

function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
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

function Navbar() {
  const [open, setOpen] = useState(false); // dropdown serviços
  const [mobileOpen, setMobileOpen] = useState(false); // menu mobile
  const dropdownRef = useRef(null);

  useClickOutside(dropdownRef, () => setOpen(false));

  function go(id) {
    scrollToId(id);
    setOpen(false);
    setMobileOpen(false);
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <button className="brand" onClick={() => go("inicio")}>
          <div className="brand__badge">ΔV</div>
          <div>
            <div className="brand__title">Delta V Engenharia</div>
            <div className="brand__subtitle">
              Instrumentação • Instalação • Engenharia
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <nav className="nav nav--desktop">
          <button className="nav__btn" onClick={() => go("inicio")}>
            Início
          </button>
          <button className="nav__btn" onClick={() => go("sobre")}>
            Sobre
          </button>

          <div className="dropdown" ref={dropdownRef}>
            <button
  className="nav__btn nav__btn--dropdown"
  onClick={() => setOpen((v) => !v)}
>
  <span>Serviços</span>
  <span className="nav__caret">▾</span>

</button>

            {open && (
              <div className="dropdown__menu" role="menu">
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-instrumentacao")}
                >
                  Instrumentos de medida / teste / controle
                </button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-maquinas")}
                >
                  Máquinas e equipamentos industriais
                </button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-instalacao")}
                >
                  Instalação de máquinas e equipamentos
                </button>
                <button
                  className="dropdown__item"
                  onClick={() => go("servicos-engenharia")}
                >
                  Serviços de engenharia
                </button>
              </div>
            )}
          </div>

          <button className="nav__btn" onClick={() => go("contato")}>
            Contato
          </button>
          <button className="nav__btn nav__cta" onClick={() => go("contato")}>
            Orçamento
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="nav__toggle"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label="Abrir menu"
        >
          ☰ Menu
        </button>
      </div>

      {/* Mobile panel */}
      {mobileOpen && (
        <div className="mobilePanel">
          <div className="container nav--mobile">
            <div className="nav__row">
              <button className="nav__btn" onClick={() => go("inicio")}>
                Início
              </button>
              <button className="nav__btn" onClick={() => go("sobre")}>
                Sobre
              </button>
              <button className="nav__btn" onClick={() => go("contato")}>
                Contato
              </button>
              <button className="nav__btn nav__cta" onClick={() => go("contato")}>
                Orçamento
              </button>
            </div>

            <div className="dropdown">
              <button className="nav__btn" onClick={() => setOpen((v) => !v)}>
                Serviços ⌄
              </button>

              {open && (
                <div className="dropdown__menu" role="menu">
                  <button
                    className="dropdown__item"
                    onClick={() => go("servicos-instrumentacao")}
                  >
                    Instrumentos de medida / teste / controle
                  </button>
                  <button
                    className="dropdown__item"
                    onClick={() => go("servicos-maquinas")}
                  >
                    Máquinas e equipamentos industriais
                  </button>
                  <button
                    className="dropdown__item"
                    onClick={() => go("servicos-instalacao")}
                  >
                    Instalação de máquinas e equipamentos
                  </button>
                  <button
                    className="dropdown__item"
                    onClick={() => go("servicos-engenharia")}
                  >
                    Serviços de engenharia
                  </button>
                </div>
              )}
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

export default function App() {
  const services = [
    {
      id: "servicos-instrumentacao",
      title: "Instrumentos de medida, teste e controle",
      short:
        "Manutenção e reparo de instrumentos de medição industrial, com foco em precisão e continuidade do processo.",
      long:
        "Atuação técnica em instrumentos de medida, teste e controle, incluindo diagnóstico, manutenção corretiva e preventiva, verificação de confiabilidade e suporte para manter o processo produtivo estável e seguro.",
      image: instrumentosMedidaTesteControle,
      cta: "Solicitar orçamento",
    },
    {
      id: "servicos-maquinas",
      title: "Máquinas e equipamentos industriais",
      short:
        "Identificação de falhas, reparo e recuperação da capacidade operacional de máquinas industriais.",
      long:
        "Manutenção e reparo de máquinas e equipamentos industriais com foco em redução de paradas, identificação de causa raiz e restauração de performance. Suporte técnico para garantir operação contínua e previsível.",
      image: maquinasIndustriais,
      cta: "Solicitar orçamento",
    },
    {
      id: "servicos-instalacao",
      title: "Instalação de máquinas e equipamentos",
      short:
        "Apoio técnico em instalação, adequações e acompanhamento de comissionamento.",
      long:
        "Apoio especializado na instalação de máquinas e equipamentos industriais, adequações de infraestrutura, orientação técnica e acompanhamento de comissionamento para garantir que o sistema entre em operação corretamente.",
      image: instalacaoIndustrial,
      cta: "Solicitar orçamento",
    },
    {
      id: "servicos-engenharia",
      title: "Serviços de engenharia",
      short:
        "Consultoria e suporte técnico com análise, documentação e acompanhamento conforme escopo.",
      long:
        "Serviços de engenharia sob demanda: análise técnica, suporte a decisões, documentação, acompanhamento e alinhamento de escopo com foco em confiabilidade, segurança e eficiência operacional.",
      image: servicosDeEngenharia,
      cta: "Solicitar orçamento",
    },    {
      id: "servicos-treinamento",
      title: "Treinamento em desenvolvimento profissional e gerencial",
      short:
        "Cursos e treinamentos para equipes técnicas e lideranças, com foco em desenvolvimento profissional e gerencial.",
      long:
        "Programas sob medida para equipes operacionais e gestão, com conteúdo aplicado à rotina industrial, boas práticas, segurança e melhoria contínua.",
      image: treinamentoDesenvolvimento,
      cta: "Solicitar orçamento",
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

        {/* Overlay azul */}
        <div className="heroVideo__overlay" />

        {/* Conteúdo */}
        <div className="heroVideo__content">
          <div className="heroVideo__kicker">Sorocaba / SP • Desde 2016</div>

          <h1 className="heroVideo__title">
            Engenharia aplicada à
            <br />
            instrumentação industrial
          </h1>

          <p className="heroVideo__text">
            Manutenção, reparo e instalação de instrumentos de medida, teste e controle, com foco
            em confiabilidade e continuidade operacional.
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
        <div className="grid grid--3">
          <div className="card">
            <h3 className="card__title">Atividade principal</h3>
            <p className="card__text">
              Manutenção e reparação de aparelhos e instrumentos de medida, teste e controle.
            </p>
          </div>
          <div className="card">
            <h3 className="card__title">Atuações complementares</h3>
            <p className="card__text">
              Instalação de máquinas e equipamentos industriais e serviços de engenharia.
            </p>
          </div>
          <div className="card">
            <h3 className="card__title">Localização</h3>
            <p className="card__text">
              Rua Maria Carmen Rodrigues Saker, 90 — Jardim do Paço, Sorocaba — SP.
            </p>
          </div>
        </div>
      </Section>

      {/* SERVIÇOS (novo layout estilo card com expansão) */}
      <Section
        id="servicos"
        eyebrow="O que fazemos"
        title="Serviços"
        subtitle="Clique em um serviço para ver mais detalhes e chamar a equipe."
      >
        <div className="servicesGrid">
          {services.map((s) => (
            <article key={s.id} id={s.id} className="serviceCard">
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
                        <button className="btn btn--primary" onClick={() => scrollToId("contato")}>
                          Solicitar orçamento
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

      {/* FIM DO SITE: CONTATO + CARD COM MAPA + FOOTER (SEM FORM) */}
      <section className="endBlock" id="contato">
        <div className="endBlock__hero">
          <div className="endBlock__heroInner">
            <h2 className="endBlock__heroTitle">Fale com a Delta V</h2>
            <p className="endBlock__heroSubtitle">
              Orçamentos e atendimento técnico para instrumentação, instalação e serviços de engenharia.
            </p>
          </div>
        </div>

        <div className="contactCard">
          <div className="contactCard__box contactCard__box--map">
            {/* ESQUERDA: infos */}
            <aside className="contactLeft">
              <div className="contactBrand">
                <div className="contactBrand__badge">ΔV</div>
                <div>
                  <div className="contactBrand__title">Delta V Engenharia</div>
                  <div className="contactBrand__sub">
                    Instrumentação • Instalação • Engenharia
                  </div>
                </div>
              </div>

              <div className="infoList">
                <div className="infoItem">
                  <div className="infoIcon">
                    <img className="infoIcon__img" src={addressIcon} alt="" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="infoLabel">Endereço</p>
                    <div className="infoValue">
                      Rua Maria Carmen Rodrigues Saker, 90<br />
                      Jardim do Paço — Sorocaba/SP
                    </div>
                  </div>
                </div>

                <div className="infoItem">
                  <div className="infoIcon">
                    <img className="infoIcon__img" src={emailIcon} alt="" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="infoLabel">Email</p>
                    <div className="infoValue">luizf.vieira@deltavengenharia.com.br</div>
                  </div>
                </div>

                <div className="infoItem">
                  <div className="infoIcon">
                    <img className="infoIcon__img" src={phoneIcon} alt="" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="infoLabel">Telefone</p>
                    <div className="infoValue">15 3228 5696</div>
                  </div>
                </div>

                <div className="infoItem">
                  <div className="infoIcon">
                    <img className="infoIcon__img" src={whatsappIcon} alt="" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="infoLabel">WhatsApp</p>
                    <div className="infoValue">15 99147 8419</div>
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
                src="https://www.google.com/maps?q=Rua%20Maria%20Carmen%20Rodrigues%20Saker%2090%20Sorocaba%20SP&output=embed"
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
                Manutenção e reparo de instrumentos de medida, teste e controle. Instalação de máquinas
                e serviços de engenharia.
              </p>
            </div>

            <div>
              <h4>Empresa</h4>
              <div className="footerLinks">
                <a href="#sobre">Sobre</a>
                <a href="#servicos">Serviços</a>
                <a href="#contato">Contato</a>
              </div>
            </div>

            <div>
              <h4>Suporte</h4>
              <div className="footerLinks">
                <a href="#contato">Orçamento</a>
                <a href="#contato">Atendimento</a>
              </div>
            </div>

            <div>
              <h4>Atendimento</h4>
              <p>WhatsApp, telefone e email para suporte técnico e orçamentos.</p>
              <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a
                  className="btn btn--primary"
                  href="https://wa.me/5515991478419"
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>
                <a className="btn" href="tel:+551532285696">
                  Ligar
                </a>
                <a className="btn" href="mailto:luizf.vieira@deltavengenharia.com.br">
                  Email
                </a>
              </div>
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
