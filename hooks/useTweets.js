import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/queryClient";
import {
  likeHttpRequest,
  unlikeHttpRequest,
  fetchTweetHttpRequest,
} from "@/services/tweetServices";
import { toast } from "react-toastify";

const useTweets = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tweets"],
    queryFn: fetchTweetHttpRequest,
  });

  const likeMutation = useMutation({
    mutationFn: likeHttpRequest,
    onMutate: (tweetId) => {
      queryClient.cancelQueries(["tweets"]);

      const snapshotCurrentTweetsState = queryClient.getQueryData(["tweets"]);

      queryClient.setQueryData(["tweets"], (old) => {
        return old.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              likes: tweet.likes + 1,
              liked: true,
              isLoading: true,
            };
          }

          return tweet;
        });
      });

      return { previousTweets: snapshotCurrentTweetsState };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["tweets"], context.previousTweets);
      toast.info("Seems like we have a problem, please try again later");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: unlikeHttpRequest,
    onMutate: (tweetId) => {
      queryClient.cancelQueries(["tweets"]);

      const snapshotCurrentTweetsState = queryClient.getQueryData(["tweets"]);

      queryClient.setQueryData(["tweets"], (old) => {
        return old.map((tweet) => {
          if (tweet.id === tweetId) {
            return {
              ...tweet,
              likes: tweet.likes - 1,
              liked: false,
              isLoading: true,
            };
          }

          return tweet;
        });
      });

      return { previousTweets: snapshotCurrentTweetsState };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(["tweets"], context.previousTweets);
      toast.info("Seems like we have a problem, please try again later");
    },
    onSettled: () => {
      queryClient.invalidateQueries(["tweets"]);
    },
  });

  return {
    isLoading,
    error,
    data,
    likeMutation,
    unlikeMutation,
  };
};

export default useTweets;
