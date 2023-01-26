import { BiLike } from "react-icons/bi";
import clsx from "clsx";
import HRNumbers from "human-readable-numbers";

const Tweet = ({ tweet, toggleLike }) => {
  return (
    <div className="flex flex-col">
      <div className="flex space-x-3 mb-6">
        <img
          alt=""
          src="https://via.placeholder.com/48x48"
          width={48}
          height={48}
          className="rounded-full"
        />

        <div>
          <p className="font-bold">{tweet.name}</p>
          <p className="text-gray-500">2h</p>
        </div>
      </div>

      <p>{tweet.content}</p>
      <div className="flex items-center space-x-4 mt-4">
        <button className="cursor-pointer" onClick={toggleLike}>
          <BiLike
            size="24"
            className={clsx({
              "hover:scale-125 transition-all duration-200": !tweet.liked,
              "text-blue-700": tweet.liked,
              "animate-pulse text-gray-400 cursor-auto": tweet.isLoading,
            })}
          />
        </button>

        <p>
          {tweet.retweets}{" "}
          <span className="text-sm text-gray-400">retweets</span>
        </p>

        <p>
          {HRNumbers.toHumanString(tweet.likes)}{" "}
          <span className="text-sm text-gray-400">likes</span>
        </p>
      </div>
    </div>
  );
};

export default Tweet;
