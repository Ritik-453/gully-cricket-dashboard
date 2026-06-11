const DEFAULT_EXTRAS = {
  wides: 0,
  noBalls: 0,
}

const WICKET_LABELS = new Set([
  "W",
  "B",
  "C",
  "LBW",
  "ST",
])

const toNumber = (
  value,
  fallback = 0
) => {
  const parsedValue =
    Number(value)

  return Number.isFinite(
    parsedValue
  )
    ? parsedValue
    : fallback
}

export const formatOversFromBalls = (
  legalBalls
) =>
  `${Math.floor(legalBalls / 6)}.${legalBalls % 6}`

export const parseOversToBalls = (
  oversValue
) => {
  if (
    typeof oversValue ===
    "number"
  ) {
    return oversValue
  }

  if (
    typeof oversValue !==
    "string"
  ) {
    return 0
  }

  const [
    completedOvers,
    ballsInOver = "0",
  ] = oversValue.split(".")

  return (
    toNumber(completedOvers) * 6 +
    toNumber(ballsInOver)
  )
}

export const parseScoreString = (
  scoreValue,
  fallbackWickets = 0
) => {
  if (
    typeof scoreValue ===
    "number"
  ) {
    return {
      score: scoreValue,
      wickets: fallbackWickets,
    }
  }

  if (
    typeof scoreValue ===
      "string" &&
    scoreValue.includes("/")
  ) {
    const [
      runs,
      wickets,
    ] = scoreValue.split("/")

    return {
      score: toNumber(runs),
      wickets: toNumber(
        wickets,
        fallbackWickets
      ),
    }
  }

  return {
    score: toNumber(scoreValue),
    wickets: fallbackWickets,
  }
}

const parseHistoryEntry = (
  historyEntry
) => {
  const label =
    typeof historyEntry ===
      "object" &&
    historyEntry !== null
      ? String(
          historyEntry.label || ""
        )
      : String(historyEntry || "")

  if (/^\d+$/.test(label)) {
    const runs = toNumber(label)

    return {
      label,
      teamRuns: runs,
      legalBall: true,
      wicket: false,
    }
  }

  if (label === "Wd") {
    return {
      label,
      teamRuns: 1,
      legalBall: false,
      wicket: false,
    }
  }

  if (label === "Nb") {
    return {
      label,
      teamRuns: 1,
      legalBall: false,
      wicket: false,
    }
  }

  const noBallRunsMatch =
    label.match(/^Nb\+(\d+)$/)

  if (noBallRunsMatch) {
    return {
      label,
      teamRuns:
        1 +
        toNumber(
          noBallRunsMatch[1]
        ),
      legalBall: false,
      wicket: false,
    }
  }

  const runOutMatch = label.match(
    /^RO(?:-NS)?(?:\((\d+)\))?$/
  )

  if (runOutMatch) {
    return {
      label,
      teamRuns: toNumber(
        runOutMatch[1]
      ),
      legalBall: true,
      wicket: true,
    }
  }

  const noBallRunOutMatch =
    label.match(
      /^Nb\+RO(?:-NS)?(?:\((\d+)\))?$/
    )

  if (noBallRunOutMatch) {
    return {
      label,
      teamRuns:
        1 +
        toNumber(
          noBallRunOutMatch[1]
        ),
      legalBall: false,
      wicket: true,
    }
  }

  if (
    WICKET_LABELS.has(label)
  ) {
    return {
      label,
      teamRuns: 0,
      legalBall: true,
      wicket: true,
    }
  }

  return {
    label,
    teamRuns: 0,
    legalBall: false,
    wicket: false,
  }
}

const createProgression = (
  historyEntries
) => {
  const oversMap = new Map()

  historyEntries.forEach(
    (historyEntry, index) => {
      const overIndex =
        typeof historyEntry ===
          "object" &&
        historyEntry !== null &&
        typeof historyEntry.over ===
          "number"
          ? historyEntry.over
          : Math.floor(index / 6)

      const parsedEntry =
        parseHistoryEntry(
          historyEntry
        )

      const existingOver =
        oversMap.get(overIndex) || {
          overIndex,
          runs: 0,
          wickets: 0,
          legalBalls: 0,
          balls: [],
        }

      oversMap.set(overIndex, {
        ...existingOver,
        runs:
          existingOver.runs +
          parsedEntry.teamRuns,
        wickets:
          existingOver.wickets +
          (parsedEntry.wicket
            ? 1
            : 0),
        legalBalls:
          existingOver.legalBalls +
          (parsedEntry.legalBall
            ? 1
            : 0),
        balls: [
          ...existingOver.balls,
          parsedEntry.label,
        ],
      })
    }
  )

  let cumulativeScore = 0
  let cumulativeWickets = 0
  let cumulativeBalls = 0

  return [
    ...oversMap.values(),
  ]
    .sort(
      (firstOver, secondOver) =>
        firstOver.overIndex -
        secondOver.overIndex
    )
    .map((over) => {
      cumulativeScore += over.runs
      cumulativeWickets +=
        over.wickets
      cumulativeBalls +=
        over.legalBalls

      return {
        ...over,
        overNumber:
          over.overIndex + 1,
        scoreAfter:
          cumulativeScore,
        wicketsAfter:
          cumulativeWickets,
        oversAfter:
          formatOversFromBalls(
            cumulativeBalls
          ),
      }
    })
}

const getEconomy = (
  bowler
) => {
  if (!bowler?.balls) {
    return Number.POSITIVE_INFINITY
  }

  return (
    (bowler.runs * 6) /
    bowler.balls
  )
}

const getPartnerships = ({
  activeBatters,
  batters,
  fallOfWickets,
  overs,
  score,
}) => {
  const battingOrder =
    batters
      .map((batter) => batter.name)
      .filter(Boolean)

  let currentPair =
    battingOrder.slice(0, 2)
  let nextBatterIndex = 2
  let previousWicketScore = 0

  const partnerships = []

  fallOfWickets.forEach(
    (wicketEntry) => {
      const wicketScore =
        toNumber(
          wicketEntry.score
        )

      const pairForWicket =
        currentPair.filter(Boolean)

      if (
        pairForWicket.length > 0
      ) {
        partnerships.push({
          label: `${
            partnerships.length + 1
          }st Stand`,
          batters: pairForWicket,
          runs: Math.max(
            wicketScore -
              previousWicketScore,
            0
          ),
          endedAt:
            wicketEntry.over,
          endedBy:
            wicketEntry.batter,
          status: "broken",
        })
      }

      previousWicketScore =
        wicketScore

      const dismissedName =
        wicketEntry.batter

      const survivingBatter =
        pairForWicket.find(
          (name) =>
            name !==
            dismissedName
        ) ||
        pairForWicket[0] ||
        ""

      const nextBatter =
        battingOrder[
          nextBatterIndex
        ] || ""

      if (nextBatter) {
        nextBatterIndex += 1
      }

      currentPair = [
        survivingBatter,
        nextBatter,
      ].filter(Boolean)
    }
  )

  const finalPair =
    activeBatters?.length > 0
      ? activeBatters.filter(Boolean)
      : currentPair.filter(Boolean)

  const finalRuns = Math.max(
    score - previousWicketScore,
    0
  )

  if (
    finalPair.length > 0 &&
    (
      finalRuns > 0 ||
      partnerships.length === 0
    )
  ) {
    partnerships.push({
      label: `${
        partnerships.length + 1
      }th Stand`,
      batters: finalPair,
      runs: finalRuns,
      endedAt: overs,
      endedBy:
        activeBatters?.length > 0
          ? "In progress"
          : "Innings end",
      status:
        activeBatters?.length > 0
          ? "live"
          : "closed",
    })
  }

  return partnerships.map(
    (
      partnership,
      index
    ) => ({
      ...partnership,
      label: `${index + 1}${
        index === 0
          ? "st"
          : index === 1
            ? "nd"
            : index === 2
              ? "rd"
              : "th"
      } Stand`,
    })
  )
}

export const getMatchInsights = (
  matchData
) => {
  const fallOfWickets =
    Array.isArray(
      matchData.fallOfWickets
    )
      ? matchData.fallOfWickets
      : []

  const parsedScore =
    parseScoreString(
      matchData.score,
      fallOfWickets.length
    )

  const score =
    toNumber(
      matchData.scoreValue,
      parsedScore.score
    )

  const wickets =
    toNumber(
      matchData.wickets,
      parsedScore.wickets
    )

  const balls =
    typeof matchData.balls ===
    "number"
      ? matchData.balls
      : parseOversToBalls(
          matchData.overs
        )

  const overs =
    matchData.overs ||
    formatOversFromBalls(balls)

  const batters =
    Array.isArray(
      matchData.batters
    )
      ? matchData.batters
      : []

  const bowlers =
    Array.isArray(
      matchData.bowlers
    )
      ? matchData.bowlers
      : []

  const history =
    Array.isArray(
      matchData.history
    )
      ? matchData.history
      : []

  const extras = {
    ...DEFAULT_EXTRAS,
    ...matchData.extras,
  }

  const progression =
    createProgression(history)

  const highestOver =
    progression.reduce(
      (bestOver, over) =>
        over.runs >
        bestOver.runs
          ? over
          : bestOver,
      {
        overNumber: 0,
        runs: 0,
      }
    )

  const topScorer =
    [...batters].sort(
      (
        firstBatter,
        secondBatter
      ) =>
        secondBatter.runs -
          firstBatter.runs ||
        firstBatter.balls -
          secondBatter.balls
    )[0] || null

  const bestBowler =
    [...bowlers].sort(
      (
        firstBowler,
        secondBowler
      ) =>
        secondBowler.wickets -
          firstBowler.wickets ||
        getEconomy(
          firstBowler
        ) -
          getEconomy(
            secondBowler
          ) ||
        firstBowler.runs -
          secondBowler.runs
    )[0] || null

  const partnerships =
    getPartnerships({
      activeBatters:
        matchData.activeBatters,
      batters,
      fallOfWickets,
      overs,
      score,
    })

  const highestPartnership =
    partnerships.reduce(
      (
        bestPartnership,
        partnership
      ) =>
        partnership.runs >
        bestPartnership.runs
          ? partnership
          : bestPartnership,
      {
        runs: 0,
      }
    )

  const boundaryRuns =
    batters.reduce(
      (
        totalRuns,
        batter
      ) =>
        totalRuns +
        batter.fours * 4 +
        batter.sixes * 6,
      0
    )

  const boundaries =
    batters.reduce(
      (
        totalBoundaries,
        batter
      ) =>
        totalBoundaries +
        batter.fours +
        batter.sixes,
      0
    )

  const scorelessBalls =
    history
      .map(parseHistoryEntry)
      .filter(
        (entry) =>
          entry.legalBall &&
          entry.teamRuns === 0
      ).length

  const currentRunRate =
    balls > 0
      ? (
          (score * 6) / balls
        ).toFixed(2)
      : "0.00"

  return {
    balls,
    batters,
    bestBowler,
    boundaries,
    boundaryRuns,
    currentRunRate,
    extras,
    fallOfWickets,
    highestOver,
    highestPartnership,
    overs,
    partnerships,
    progression,
    score,
    scorelessBalls,
    topScorer,
    wickets,
  }
}
