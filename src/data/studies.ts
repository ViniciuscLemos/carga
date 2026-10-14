// The studies tab: short, plain summaries of the research behind the app, each with a link
// to the paper so people read the real thing. Every DOI here was checked against Crossref.

export interface Study {
  topic: string;
  takeaway: string; // "na prática", one line
  summary: string;
  authors: string;
  year: number;
  title: string; // original title, so it can be searched
  journal: string;
  doi: string;
}

export const STUDIES: Study[] = [
  {
    topic: 'Proximidade da falha',
    takeaway: 'Quanto mais perto da falha a série termina, mais o músculo cresce.',
    summary:
      'Uma série de meta-regressões juntou dezenas de estudos e tratou as repetições na reserva (RIR) como uma dose. A hipertrofia aumentou conforme as séries terminavam mais perto da falha. Na força, essa relação não apareceu de forma clara.',
    authors: 'Robinson et al.',
    year: 2024,
    title: 'Exploring the Dose-Response Relationship Between Estimated Resistance Training Proximity to Failure, Strength Gain, and Muscle Hypertrophy: A Series of Meta-Regressions',
    journal: 'Sports Medicine',
    doi: '10.1007/s40279-024-02069-2',
  },
  {
    topic: 'Proximidade da falha',
    takeaway: 'Chegar perto da falha importa; ir até ela em toda série não é obrigatório.',
    summary:
      'Revisão com meta-análise comparando treinar até a falha com parar um pouco antes. Com o volume igual, os ganhos de massa foram parecidos, o que sugere que deixar 1 ou 2 repetições na reserva já entrega quase tudo.',
    authors: 'Refalo et al.',
    year: 2022,
    title: 'Influence of Resistance Training Proximity-to-Failure on Skeletal Muscle Hypertrophy: A Systematic Review with Meta-analysis',
    journal: 'Sports Medicine',
    doi: '10.1007/s40279-022-01784-y',
  },
  {
    topic: 'Progressão',
    takeaway: 'Subir a carga ou subir as repetições: os dois funcionam.',
    summary:
      'Um grupo progrediu aumentando a carga e o outro aumentando as repetições com a mesma carga, por 8 semanas. A hipertrofia foi parecida nos dois. A progressão pode vir de mais peso ou de mais repetições, desde que exista.',
    authors: 'Plotkin et al.',
    year: 2022,
    title: 'Progressive overload without progressing load? The effects of load or repetition progression on muscular adaptations',
    journal: 'PeerJ',
    doi: '10.7717/peerj.14142',
  },
  {
    topic: 'Carga e repetições',
    takeaway: 'Carga leve ou pesada gera hipertrofia parecida, se a série for perto da falha.',
    summary:
      'Meta-análise comparando treinos com cargas baixas (mais repetições) e altas (menos repetições). O crescimento muscular foi parecido entre eles; a força máxima foi maior com cargas altas.',
    authors: 'Schoenfeld et al.',
    year: 2017,
    title: 'Strength and Hypertrophy Adaptations Between Low- vs. High-Load Resistance Training: A Systematic Review and Meta-analysis',
    journal: 'Journal of Strength and Conditioning Research',
    doi: '10.1519/JSC.0000000000002200',
  },
  {
    topic: 'Volume',
    takeaway: 'Mais séries por semana tendem a dar mais resultado, até certo ponto.',
    summary:
      'Meta-análise sobre o número de séries por músculo por semana. Houve uma relação de dose e resposta: cada série a mais esteve ligada a um ganho um pouco maior, e 10 ou mais séries semanais superaram menos de 5.',
    authors: 'Schoenfeld et al.',
    year: 2016,
    title: 'Dose-response relationship between weekly resistance training volume and increases in muscle mass: A systematic review and meta-analysis',
    journal: 'Journal of Sports Sciences',
    doi: '10.1080/02640414.2016.1210197',
  },
  {
    topic: 'Frequência',
    takeaway: 'Com o mesmo volume, treinar o músculo 1 ou 3 vezes por semana dá resultado parecido.',
    summary:
      'Revisão sobre quantas vezes por semana treinar cada músculo. Quando o volume total era igual, a frequência não fez diferença relevante. Ela serve para dividir o volume em sessões que você consegue fazer bem.',
    authors: 'Schoenfeld et al.',
    year: 2018,
    title: 'How many times per week should a muscle be trained to maximize muscle hypertrophy? A systematic review and meta-analysis of studies examining the effects of resistance training frequency',
    journal: 'Journal of Sports Sciences',
    doi: '10.1080/02640414.2018.1555906',
  },
  {
    topic: 'Frequência',
    takeaway: 'Treinar cada músculo pelo menos 2 vezes por semana foi melhor que 1.',
    summary:
      'Meta-análise anterior à de cima, sem igualar o volume. Treinar um músculo duas vezes por semana gerou mais hipertrofia que uma vez, em boa parte porque somava mais séries na semana.',
    authors: 'Schoenfeld et al.',
    year: 2016,
    title: 'Effects of Resistance Training Frequency on Measures of Muscle Hypertrophy: A Systematic Review and Meta-Analysis',
    journal: 'Sports Medicine',
    doi: '10.1007/s40279-016-0543-8',
  },
  {
    topic: 'Descanso',
    takeaway: 'Descansar uns 3 minutos entre séries rendeu mais que 1 minuto.',
    summary:
      'Homens treinados fizeram o mesmo treino com 1 ou 3 minutos de descanso por 8 semanas. O grupo de 3 minutos ganhou mais força e mais massa, provavelmente por conseguir manter mais repetições nas séries seguintes.',
    authors: 'Schoenfeld et al.',
    year: 2016,
    title: 'Longer Interset Rest Periods Enhance Muscle Strength and Hypertrophy in Resistance-Trained Men',
    journal: 'Journal of Strength and Conditioning Research',
    doi: '10.1519/JSC.0000000000001272',
  },
  {
    topic: 'Músculo alongado',
    takeaway: 'Exercícios que trabalham o músculo esticado tendem a dar mais hipertrofia.',
    summary:
      'Comparou a flexora sentada (posterior de coxa mais alongado) com a flexora deitada. A sentada gerou mais crescimento do posterior de coxa, um dos estudos que levaram à ideia de priorizar o músculo em posição alongada.',
    authors: 'Maeo et al.',
    year: 2020,
    title: 'Greater Hamstrings Muscle Hypertrophy but Similar Damage Protection after Training at Long versus Short Muscle Lengths',
    journal: 'Medicine & Science in Sports & Exercise',
    doi: '10.1249/MSS.0000000000002523',
  },
  {
    topic: 'Músculo alongado',
    takeaway: 'Repetições parciais na parte esticada do movimento funcionaram tão bem quanto completas.',
    summary:
      'Na cadeira extensora, fazer só a metade do movimento em que o quadríceps está alongado gerou ganhos iguais ou melhores que a amplitude completa, e melhores que parciais na parte encurtada.',
    authors: 'Pedrosa et al.',
    year: 2021,
    title: 'Partial range of motion training elicits favorable improvements in muscular adaptations when carried out at long muscle lengths',
    journal: 'European Journal of Sport Science',
    doi: '10.1080/17461391.2021.1927199',
  },
  {
    topic: 'Proteína',
    takeaway: 'Até cerca de 1,6 g de proteína por kg por dia, mais proteína ajudou a ganhar massa.',
    summary:
      'Meta-análise com 49 estudos sobre suplementar proteína junto com o treino. A proteína aumentou os ganhos de massa e força, e o benefício parou de crescer por volta de 1,6 g por kg de peso por dia.',
    authors: 'Morton et al.',
    year: 2017,
    title: 'A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults',
    journal: 'British Journal of Sports Medicine',
    doi: '10.1136/bjsports-2017-097608',
  },
];
