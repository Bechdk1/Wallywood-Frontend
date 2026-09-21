import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { flagSrc, flags } from "../../data/Flags";
import {
  FLAGS_PER_CYCLE,
  FLAG_MS,
  LoaderFlag,
  LoaderFlagSlot,
  LoaderMessage,
  LoaderStyled,
  PLANE_SCALE,
  ROUTE,
} from "./Loader.styled";
import type { LoaderProps } from "./Loader.types";

/**
 * Flyet er tegnet i tre dele, fordi de projicerer forskelligt når flyet ruller.
 * Alle tre har næsen mod +x, så offset-rotate: auto vender dem langs ruten, og
 * de har samme fyld, så de flyder sammen til én silhuet.
 */

/** Vinger og haleplan. Den flade del, der smalner når flyet ruller. */
const WINGS =
  "M 5.5 -3.2 L -3.8 -13 L -7.3 -13 L -4.5 -3.2 L -4.5 3.2 L -7.3 13 " +
  "L -3.8 13 L 5.5 3.2 Z " +
  "M -11 -3.2 L -14.3 -7.5 L -16.6 -7.5 L -16.6 7.5 L -14.3 7.5 L -11 3.2 Z";

/** Kroppen. Et rundt rør, så den ser lige tyk ud fra alle vinkler. */
const FUSELAGE =
  "M 16 0 C 14.3 -1.8 11.8 -3.2 8.5 -3.2 L -11 -3.2 L -15.8 -2.3 L -17.5 0 " +
  "L -15.8 2.3 L -11 3.2 L 8.5 3.2 C 11.8 3.2 14.3 1.8 16 0 Z";

/** Halefinnen. Står vinkelret på vingerne og er kun synlig når flyet ruller. */
const FIN = "M -8 0 L -16.5 0 L -16 -6.5 L -12.5 -6.5 Z";

/** Én sky, tegnet med næsen i 0,0 og cirka 19 x 10 enheder stor. */
const CLOUD =
  "M 4 10 C 1.8 10 0 8.7 0 7 C 0 5.3 1.5 4 3.3 4 C 3.7 1.7 5.7 0 8.1 0 " +
  "C 10.7 0 12.9 1.9 13.3 4.3 C 13.7 4.1 14.2 4 14.7 4 C 16.9 4 18.7 5.4 " +
  "18.7 7 C 18.7 8.7 16.9 10 14.7 10 Z";

/**
 * Faste pladser på himlen, valgt så de ligger uden om ruten. Hver runde
 * trækkes et tilfældigt udsnit, og hver plads får sin egen jitter, så det
 * samme udsnit ikke ser ens ud to gange.
 */
const CLOUD_SLOTS = [
  { x: 8, y: 14 },
  { x: 42, y: 6 },
  { x: 74, y: 12 },
  { x: 118, y: 4 },
  { x: 152, y: 8 },
  { x: 190, y: 16 },
  { x: 4, y: 44 },
  { x: 62, y: 84 },
  { x: 104, y: 72 },
  { x: 146, y: 82 },
  { x: 196, y: 74 },
  { x: 214, y: 30 },
];

const CLOUD_MIN = 3;
const CLOUD_MAX = 5;

/** Et tal mellem min og max. */
const between = (min: number, max: number) => min + Math.random() * (max - min);

/** Hvert flag står én flagrunde, og tre af dem går op i én flyverunde. */
const FLAG_INTERVAL = FLAG_MS;

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

type Cloud = {
  id: number;
  x: number;
  y: number;
  scale: number;
  opacity: number;
};

/** Trækker et nyt sæt skyer. Kaldes én gang pr. flyverunde. */
const drawClouds = (): Cloud[] =>
  shuffle(CLOUD_SLOTS)
    .slice(0, Math.round(between(CLOUD_MIN, CLOUD_MAX)))
    .map((slot, index) => ({
      id: index,
      x: slot.x + between(-6, 6),
      y: slot.y + between(-5, 5),
      scale: between(0.55, 1.3),
      opacity: between(0.12, 0.28),
    }));

/** Bladrer gennem landene fra data/Flags i tilfældig rækkefølge. */
const useShuffledFlags = () => {
  const shuffled = useMemo(() => shuffle(flags), []);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (shuffled.length === 0) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % shuffled.length);
    }, FLAG_INTERVAL);

    return () => window.clearInterval(timer);
  }, [shuffled]);

  return { flag: shuffled[index] ?? null, cycle: index };
};

export const Loader = ({ message }: LoaderProps) => {
  const { flag, cycle } = useShuffledFlags();

  /** Skyerne hører til flyverunden, så de skifter først ved hvert tredje flag. */
  const cloudCycle = Math.floor(cycle / FLAGS_PER_CYCLE);
  const clouds = useMemo(() => drawClouds(), [cloudCycle]);

  /** En fast besked fra forælderen vinder. Ellers følger teksten flaget. */
  const text = message ?? flag?.message ?? flag?.name;

  return (
    <LoaderStyled role="status" aria-live="polite">
      <svg viewBox="0 0 240 100" aria-hidden="true">
        {clouds.map((cloud) => (
          /* Placeringen sidder på gruppen, så driften i CSS ikke overskriver den. */
          <g
            key={`${cloudCycle}-${cloud.id}`}
            transform={`translate(${cloud.x} ${cloud.y}) scale(${cloud.scale})`}
          >
            <path
              className="tplane-cloud"
              d={CLOUD}
              style={{ "--cloud-opacity": cloud.opacity } as CSSProperties}
            />
          </g>
        ))}
        <path
          className="tplane-route"
          d={ROUTE}
          fill="none"
          strokeWidth={1.5}
          strokeDasharray="1 6"
          strokeLinecap="round"
        />
        <path
          className="tplane-trail"
          d={ROUTE}
          pathLength={100}
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray={100}
          strokeDashoffset={100}
        />
        <circle className="tplane-dot" cx={20} cy={74} r={3.5} />
        <circle className="tplane-dot" cx={220} cy={44} r={3.5} />
        <g className="tplane-plane">
          <g transform={`scale(${PLANE_SCALE})`}>
            <path className="tplane-fin" d={FIN} />
            <path className="tplane-wings" d={WINGS} />
            <path d={FUSELAGE} />
          </g>
        </g>
      </svg>

      <LoaderFlagSlot>
        {flag ? (
          <LoaderFlag
            key={flag.code}
            src={flagSrc(flag.code)}
            alt={flag.name}
          />
        ) : null}
      </LoaderFlagSlot>

      <LoaderMessage key={text}>{text}</LoaderMessage>
    </LoaderStyled>
  );
};
