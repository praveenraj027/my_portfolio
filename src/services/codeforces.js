// Fetches public Codeforces stats via the official API (api.codeforces.com).

const BASE = 'https://codeforces.com/api';

async function cfGet(method, params) {
  const qs = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE}/${method}?${qs}`, {
    headers: { 'User-Agent': 'praveen-portfolio/1.0' }
  });
  if (!res.ok) throw new Error(`Codeforces HTTP ${res.status}`);
  const json = await res.json();
  if (json.status !== 'OK') throw new Error(`Codeforces: ${json.comment || 'error'}`);
  return json.result;
}

async function fetchCodeforces(handle) {
  if (!handle) return null;

  const [info, rating, status] = await Promise.all([
    cfGet('user.info', { handles: handle }).catch(() => null),
    cfGet('user.rating', { handle }).catch(() => []),
    cfGet('user.status', { handle, from: 1, count: 10000 }).catch(() => [])
  ]);

  const u = info && info[0];

  // distinct solved problems (verdict OK)
  const solved = new Set();
  for (const sub of status || []) {
    if (sub.verdict === 'OK' && sub.problem) {
      solved.add(`${sub.problem.contestId || 'x'}-${sub.problem.index}`);
    }
  }

  // rating history points for the chart
  const history = (rating || []).map((r) => ({
    t: r.ratingUpdateTimeSeconds,
    rating: r.newRating
  }));

  return {
    handle,
    rating: u && typeof u.rating === 'number' ? u.rating : null,
    maxRating: u && typeof u.maxRating === 'number' ? u.maxRating : null,
    rank: (u && u.rank) || null,
    solved: solved.size,
    history
  };
}

module.exports = { fetchCodeforces };
