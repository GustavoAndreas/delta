import "./App.css";
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
          <button className="nav__btn" onClick={() => go("inicio")}>Início</button>
          <button className="nav__btn" onClick={() => go("sobre")}>Sobre</button>

          <div className="dropdown" ref={dropdownRef}>
            <button className="nav__btn" onClick={() => setOpen(v => !v)}>
              Serviços ⌄
            </button>
            {open && (
              <div className="dropdown__menu" role="menu">
                <button className="dropdown__item" onClick={() => go("servicos-instrumentacao")}>
                  Instrumentos de medida / teste / controle
                </button>
                <button className="dropdown__item" onClick={() => go("servicos-maquinas")}>
                  Máquinas e equipamentos industriais
                </button>
                <button className="dropdown__item" onClick={() => go("servicos-instalacao")}>
                  Instalação de máquinas e equipamentos
                </button>
                <button className="dropdown__item" onClick={() => go("servicos-engenharia")}>
                  Serviços de engenharia
                </button>
              </div>
            )}
          </div>

          <button className="nav__btn" onClick={() => go("contato")}>Contato</button>
          <button className="nav__btn nav__cta" onClick={() => go("contato")}>Orçamento</button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="nav__toggle"
          onClick={() => setMobileOpen(v => !v)}
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
              <button className="nav__btn" onClick={() => go("inicio")}>Início</button>
              <button className="nav__btn" onClick={() => go("sobre")}>Sobre</button>
              <button className="nav__btn" onClick={() => go("contato")}>Contato</button>
              <button className="nav__btn nav__cta" onClick={() => go("contato")}>Orçamento</button>
            </div>

            <div className="dropdown">
              <button className="nav__btn" onClick={() => setOpen(v => !v)}>
                Serviços ⌄
              </button>

              {open && (
                <div className="dropdown__menu" role="menu">
                  <button className="dropdown__item" onClick={() => go("servicos-instrumentacao")}>
                    Instrumentos de medida / teste / controle
                  </button>
                  <button className="dropdown__item" onClick={() => go("servicos-maquinas")}>
                    Máquinas e equipamentos industriais
                  </button>
                  <button className="dropdown__item" onClick={() => go("servicos-instalacao")}>
                    Instalação de máquinas e equipamentos
                  </button>
                  <button className="dropdown__item" onClick={() => go("servicos-engenharia")}>
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
  return (
    <div className="page">
      <Navbar />

      {/* HERO */}
      <section id="inicio" className="hero section">
        <div className="container">
          <div className="hero__card">
            <div className="hero__glow1" />
            <div className="hero__glow2" />

            <div className="hero__kicker">Sorocaba/SP • Desde 14/07/2016</div>

            <h1 className="hero__title">
              Manutenção e reparo de{" "}
              <span>instrumentos de medida, teste e controle</span>
            </h1>

            <p className="hero__text">
              Atuação técnica em instrumentação e equipamentos industriais, com instalação
              e serviços de engenharia conforme escopo.
            </p>

            <div className="hero__actions">
              <button className="btn btn--primary" onClick={() => scrollToId("contato")}>
                Solicitar orçamento
              </button>
              <button className="btn btn--ghost" onClick={() => scrollToId("servicos")}>
                Ver serviços
              </button>
            </div>

            <div className="hero__chips">
              <div className="chip">
                <div className="chip__label">CNAE Principal</div>
                <div className="chip__value">33.12-1/02</div>
              </div>
              <div className="chip">
                <div className="chip__label">Foco</div>
                <div className="chip__value">Instrumentação & Indústria</div>
              </div>
              <div className="chip">
                <div className="chip__label">Atendimento</div>
                <div className="chip__value">Sob demanda / contrato</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOBRE */}
      <Section
        id="sobre"
        eyebrow="Quem somos"
        title="Engenharia aplicada com foco em confiabilidade"
        subtitle="Delta V Engenharia Ltda — CNPJ 25.210.791/0001-05 — Sorocaba/SP."
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

      {/* SERVIÇOS */}
      <Section
  id="servicos"
  eyebrow="O que fazemos"
  title="Serviços"
  subtitle="Atuação técnica em ambientes industriais, com foco em confiabilidade e precisão."
>
  {/* Instrumentação */}
  <div id="servicos-instrumentacao" className="service">
    <div className="service__image">
      <img src="/images/instrumentacao.jpg" alt="Instrumentação industrial" />
    </div>
    <div className="service__content">
      <h3 className="service__title">
        Instrumentos de medida, teste e controle
      </h3>
      <p className="service__text">
        Manutenção e reparo de instrumentos de medição industrial, com foco em precisão,
        confiabilidade e continuidade do processo produtivo.
      </p>
      <div className="service__actions">
        <button className="btn btn--primary">Solicitar orçamento</button>
      </div>
    </div>
  </div>

  <div style={{ height: 56 }} />

  {/* Máquinas */}
  <div id="servicos-maquinas" className="service service--reverse">
    <div className="service__content">
      <h3 className="service__title">
        Máquinas e equipamentos industriais
      </h3>
      <p className="service__text">
        Manutenção e reparo de máquinas industriais, atuando na identificação de falhas
        e recuperação da capacidade operacional.
      </p>
      <div className="service__actions">
        <button className="btn btn--primary">Solicitar orçamento</button>
      </div>
    </div>
    <div className="service__image">
      <img src="/images/maquinas.jpg" alt="Máquinas industriais" />
    </div>
  </div>

  <div style={{ height: 56 }} />

  {/* Instalação */}
  <div id="servicos-instalacao" className="service">
    <div className="service__image">
      <img src="/images/instalacao.jpg" alt="Instalação industrial" />
    </div>
    <div className="service__content">
      <h3 className="service__title">
        Instalação de máquinas e equipamentos
      </h3>
      <p className="service__text">
        Apoio técnico na instalação de equipamentos industriais, adequações
        e acompanhamento de comissionamento.
      </p>
      <div className="service__actions">
        <button className="btn btn--primary">Solicitar orçamento</button>
      </div>
    </div>
  </div>

  <div style={{ height: 56 }} />

  {/* Engenharia */}
  <div id="servicos-engenharia" className="service service--reverse">
    <div className="service__content">
      <h3 className="service__title">
        Serviços de engenharia
      </h3>
      <p className="service__text">
        Consultoria e suporte técnico em engenharia, com análise, documentação
        e acompanhamento conforme escopo do cliente.
      </p>
      <div className="service__actions">
        <button className="btn btn--primary">Solicitar orçamento</button>
      </div>
    </div>
    <div className="service__image">
      <img src="/images/engenharia.jpg" alt="Serviços de engenharia" />
    </div>
  </div>
</Section>


      {/* CONTATO */}
      <Section
        id="contato"
        eyebrow="Fale com a Delta V"
        title="Contato"
        subtitle="Troque pelos dados reais (telefone/email) e depois colocamos o mapa."
      >
        <div className="contact">
          <div className="card">
            <h3 className="card__title">Informações</h3>
            <p className="card__text">
              📍 Rua Maria Carmen Rodrigues Saker, 90 — Jardim do Paço, Sorocaba — SP
              <br />
              🕒 Atendimento: (definir)
              <br />
              ✉️ Email: (definir)
              <br />
              📞 WhatsApp: (definir)
            </p>

            <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a className="btn btn--primary" href="#">
                Chamar no WhatsApp
              </a>
              <button className="btn btn--ghost" onClick={() => scrollToId("inicio")}>
                Voltar ao topo
              </button>
            </div>
          </div>

          <div className="card">
            <h3 className="card__title">Mapa</h3>
            <p className="card__text">Placeholder — depois a gente coloca o embed.</p>
            <div className="map" />
          </div>
        </div>
      </Section>

      <footer className="footer">
        <div className="container">
          © {new Date().getFullYear()} Delta V Engenharia Ltda • CNPJ 25.210.791/0001-05
        </div>
      </footer>
    </div>
  );
}
