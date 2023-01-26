export async function likeHttpRequest(tweetId) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  throw new Error("Something went wrong");

  const res = await fetch(`/api/like?id=${tweetId}`, {
    method: "POST",
  });

  return await res.json();
}

export async function unlikeHttpRequest(tweetId) {
  //await new Promise((resolve) => setTimeout(resolve, 3000));

  // throw new Error("Something went wrong");

  const res = await fetch(`/api/unlike?id=${tweetId}`, {
    method: "POST",
  });

  return await res.json();
}

export async function fetchTweetHttpRequest() {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch("/tweets.json");
  return await res.json();
}
