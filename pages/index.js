import Tweet from "@/components/Tweet";
import useTweets from "@/hooks/useTweets";
import { toast } from "react-toastify";

export default function Home() {
  const { isLoading, error, data, likeMutation, unlikeMutation } = useTweets();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="max-w-md m-auto my-6">
      {data.map((tweet) => {
        return (
          <div
            key={tweet.id}
            className="border border-gray-200 rounded-lg p-4 mb-4"
          >
            <Tweet
              tweet={tweet}
              toggleLike={() => {
                // if (likeMutation.isLoading || unlikeMutation.isLoading) {
                //   return;
                // }

                if (tweet.liked) {
                  unlikeMutation.mutate(tweet.id);
                } else {
                  likeMutation.mutate(tweet.id);
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
