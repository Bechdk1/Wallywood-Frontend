import styled, { keyframes } from "styled-components";
import { Reset } from "../../styled/Mixins";
import { theme } from "../../styled/Theme";

export const ROUTE = "M 20 74 Q 120 4 220 44";

/** Én runde med flyet og skyerne. */
export const CYCLE_MS = 2700;

/** Antal flag der når at blive vist på én flyverunde. */
export const FLAGS_PER_CYCLE = 3;

/** Én flagrunde. Tre af dem går op i én flyverunde. */
export const FLAG_MS = CYCLE_MS / FLAGS_PER_CYCLE;

/** Omregner et tidspunkt i flagrunden til et keyframe-trin. */
const at = (ms: number) => `${((ms / FLAG_MS) * 100).toFixed(2)}%`;

const fly = keyframes`
  0%        { offset-distance: 0%;   opacity: 0; }
  6%        { opacity: 1; }
  70%       { opacity: 1; }
  85%       { offset-distance: 100%; }
  90%, 100% { offset-distance: 100%; opacity: 0; }
`;

/** Flaget er oppe fra start, står fuldt fra 250 ms og er helt væk ved 860 ms. */
const FLAG_IN_END = 250;
const FLAG_OUT_START = 600;
const FLAG_OUT_END = 860;

const fade = keyframes`
  0%                                        { opacity: 0; }
  ${at(FLAG_IN_END)}, ${at(FLAG_OUT_START)} { opacity: 1; }
  ${at(FLAG_OUT_END)}, 100%                 { opacity: 0; }
`;

/** Teksten starter 80 ms senere end flaget og er helt væk ved 820 ms. */
const TEXT_IN_START = 80;
const TEXT_IN_END = 330;
const TEXT_OUT_START = 600;
const TEXT_OUT_END = 820;

const fadeText = keyframes`
  0%, ${at(TEXT_IN_START)}                  { opacity: 0; }
  ${at(TEXT_IN_END)}, ${at(TEXT_OUT_START)} { opacity: 1; }
  ${at(TEXT_OUT_END)}, 100%                 { opacity: 0; }
`;

/**
 * Flyet ruller hele vejen fra ROLL_START ved afgang, gennem vandret midtvejs,
 * til ROLL_END ved ankomst.
 *
 * Silhuetten er en topvisning, så rulningen tegnes som projektion, ikke som en
 * rigtig 3D-rotation. De tre dele projicerer forskelligt, og det er dem der
 * tilsammen giver dybden:
 *
 * - Vinger og haleplan er flade, så de smalner med cos(vinkel). Fortegnet er
 *   ligegyldigt, for de ser ens ud fra begge sider.
 * - Kroppen er et rundt rør, så den er lige tyk uanset vinkel og animeres ikke.
 * - Halefinnen står vinkelret på vingerne, så den følger sin(vinkel). Den
 *   forsvinder i vandret og kommer frem på den modsatte side bagefter.
 */
export const PLANE_SCALE = 0.9;
const ROLL_START = -20;
const ROLL_MID = 35;
const ROLL_END = 75;

const rad = (degrees: number) => (degrees * Math.PI) / 180;
const flat = (degrees: number) => Math.cos(rad(degrees)).toFixed(3);
const upright = (degrees: number) => Math.sin(rad(degrees)).toFixed(3);

const rollFlat = keyframes`
  0%        { transform: scaleY(${flat(ROLL_START)}); }
  45%       { transform: scaleY(${flat(ROLL_MID)}); }
  85%, 100% { transform: scaleY(${flat(ROLL_END)}); }
`;

const rollUpright = keyframes`
  0%        { transform: scaleY(${upright(ROLL_START)}); }
  45%       { transform: scaleY(${upright(ROLL_MID)}); }
  85%, 100% { transform: scaleY(${upright(ROLL_END)}); }
`;

const draw = keyframes`
  0%        { stroke-dashoffset: 100; opacity: 0; }
  6%        { opacity: 1; }
  85%, 100% { stroke-dashoffset: 0; }
  92%, 100% { opacity: 0; }
`;

/**
 * Skyerne følger flyets trin præcist: oppe ved 6 %, fulde til 70 %, væk ved
 * 90 %. Så er himlen tom igen inden det nye tilfældige sæt tegnes. De driver
 * samtidig en smule mod venstre, så den ikke står stille.
 */
const drift = keyframes`
  0%        { opacity: 0; transform: translateX(6px); }
  6%        { opacity: var(--cloud-opacity); }
  70%       { opacity: var(--cloud-opacity); }
  90%, 100% { opacity: 0; transform: translateX(-10px); }
`;

export const LoaderStyled = styled.div`
  ${Reset};
  width: 15rem;
  margin: 6rem auto;
  text-align: center;

  svg {
    width: 100%;
    height: auto;
  }

  /* Skyerne ligger bagerst, derfor ingen fill fra currentColor. */
  .tplane-cloud {
    fill: ${theme.colors.border};
    opacity: 0;
    animation: ${drift} ${CYCLE_MS}ms ease-in-out;
  }

  .tplane-route {
    stroke: ${theme.colors.border};
  }
  .tplane-trail {
    stroke: ${theme.colors.primary};
    animation: ${draw} ${CYCLE_MS}ms linear infinite;
  }
  .tplane-dot {
    fill: ${theme.colors.border};
  }
  .tplane-plane {
    fill: currentColor;
    offset-path: path("${ROUTE}");
    offset-rotate: auto;
    animation: ${fly} ${CYCLE_MS}ms linear infinite;
  }
  /* Vingerne smalner om deres egen midterlinje. */
  .tplane-wings {
    transform-box: fill-box;
    transform-origin: 50% 50%;
    animation: ${rollFlat} ${CYCLE_MS}ms ease-in-out infinite;
  }
  /* Finnen vokser op fra kroppen, derfor origin i bunden af dens boks. */
  .tplane-fin {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    transform: scaleY(0);
    animation: ${rollUpright} ${CYCLE_MS}ms ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .tplane-plane,
    .tplane-wings,
    .tplane-fin,
    .tplane-trail {
      animation: none;
    }
    .tplane-cloud {
      animation: none;
      opacity: var(--cloud-opacity);
    }
  }
`;

export const LoaderMessage = styled.p`
  ${Reset};
  margin-top: 0.75rem;
  font-family: ${theme.fonts.body};
  font-size: ${theme.fontsizes.body};
  color: inherit;
  /* Beskeden bliver på én linje, uanset længde. */
  line-height: 1;
  height: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  animation: ${fadeText} ${FLAG_MS}ms ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;

/**
 * Fast boks, så højden ikke ændrer sig når flagene har forskellige
 * sideforhold, eller når der slet ikke er hentet et flag endnu.
 */
export const LoaderFlagSlot = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 1.35rem;
  margin: 0 auto;
`;

export const LoaderFlag = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  animation: ${fade} ${FLAG_MS}ms ease-in-out;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    animation: none;
  }
`;
