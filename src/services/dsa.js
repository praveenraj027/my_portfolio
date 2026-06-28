// Aggregates LeetCode + Codeforces into the shape the front-end expects,
// with an in-memory cache (TTL) and stale-fallback so a transient outage on
// either provider never blanks the page.

const { fetchLeetCode } = require('./leetcode');
const { fetchCodeforces } = require('./codeforces');

const TTL_MS = 30 * 60 * 1000; // 30 minutes
const cache = new Map(); // key -> { at, data }

function buildPayload(lc, cf) {
  const total =
    (lc && lc.total ? lc.total : 0) + (cf && cf.solved ? cf.solved : 0);
  return {
    totalSolved: total,
    leetcode: lc
      ? {
          username: lc.username,
          total: lc.total,
          easy: lc.easy,
          medium: lc.medium,
          hard: lc.hard,
          rating: lc.rating
        }
      : null,
    codeforces: cf
      ? {
          handle: cf.handle,
          rating: cf.rating,
          maxRating: cf.maxRating,
          rank: cf.rank,
          solved: cf.solved,
          history: cf.history
        }
      : null,
    fetchedAt: new Date().toISOString()
  };
}

async function getDSA(leetcodeUser, codeforcesUser, { force = false } = {}) {
  const key = `${leetcodeUser || ''}::${codeforcesUser || ''}`;
  const hit = cache.get(key);
  if (!force && hit && Date.now() - hit.at < TTL_MS) {
    return { ...hit.data, cached: true };
  }

  const [lcRes, cfRes] = await Promise.allSettled([
    fetchLeetCode(leetcodeUser),
    fetchCodeforces(codeforcesUser)
  ]);

  const lc = lcRes.status === 'fulfilled' ? lcRes.value : null;
  const cf = cfRes.status === 'fulfilled' ? cfRes.value : null;

  // If both failed but we have a stale cache, serve it rather than nothing.
  if (!lc && !cf && hit) {
    return { ...hit.data, cached: true, stale: true };
  }

  const data = buildPayload(lc, cf);
  data.errors = {
    leetcode: lcRes.status === 'rejected' ? String(lcRes.reason && lcRes.reason.message || lcRes.reason) : null,
    codeforces: cfRes.status === 'rejected' ? String(cfRes.reason && cfRes.reason.message || cfRes.reason) : null
  };
  cache.set(key, { at: Date.now(), data });
  return { ...data, cached: false };
}

module.exports = { getDSA };
