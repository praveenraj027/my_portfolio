// Fetches public LeetCode profile stats via the unofficial GraphQL endpoint.
// No auth needed for public data, but LeetCode rejects requests without a
// browser-like User-Agent / Referer, so we set them.

const ENDPOINT = 'https://leetcode.com/graphql';

const QUERY = `
query userProfile($username: String!) {
  matchedUser(username: $username) {
    submitStatsGlobal { acSubmissionNum { difficulty count } }
  }
  userContestRanking(username: $username) { rating }
}`;

async function fetchLeetCode(username) {
  if (!username) return null;
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      Referer: `https://leetcode.com/u/${username}/`,
      Origin: 'https://leetcode.com'
    },
    body: JSON.stringify({ query: QUERY, variables: { username } })
  });

  if (!res.ok) throw new Error(`LeetCode HTTP ${res.status}`);
  const json = await res.json();
  const user = json && json.data && json.data.matchedUser;
  if (!user) throw new Error('LeetCode user not found');

  const buckets = { All: 0, Easy: 0, Medium: 0, Hard: 0 };
  for (const b of user.submitStatsGlobal.acSubmissionNum) buckets[b.difficulty] = b.count;

  const rating =
    json.data.userContestRanking && json.data.userContestRanking.rating
      ? Math.round(json.data.userContestRanking.rating)
      : null;

  return {
    username,
    total: buckets.All,
    easy: buckets.Easy,
    medium: buckets.Medium,
    hard: buckets.Hard,
    rating
  };
}

module.exports = { fetchLeetCode };
