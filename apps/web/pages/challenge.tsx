import { useState, useEffect, useRef } from "react";
import {
  Button,
  Box,
  Card,
  Flex,
  Heading,
  Input,
  ThemeProvider,
  themes,
} from "ui";

type Tweet = {
  owner: string;
  message: string;
  datetime: string;
};
type AvailableThemes = keyof typeof themes;

export default function Challenge() {
  const me: string = "Human"; // load user name
  const messageRef = useRef();
  const [invalidMessage, setInvalidMessage] = useState("");
  const [tweetList, setTweetList] = useState<Tweet[]>([]); // load the tweet history

  const defaultTheme: AvailableThemes = "nineties";
  const [currentTheme, setCurrentTheme] =
    useState<AvailableThemes>(defaultTheme);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!me) return;
    const message = messageRef.current.value;
    if (!message) {
      setInvalidMessage("Please input message.");
      return;
    }
    if (message.length > 140) {
      setInvalidMessage("The body of 140 characters is unreadable");
      return;
    }
    setTweetList((prev) => {
      const arr = [
        ...prev,
        {
          owner: me,
          message: message,
          datetime: new Date().toString(),
        },
      ];
      localStorage.setItem("mytweets", JSON.stringify(arr));
      return arr;
    });
    setInvalidMessage("");
    messageRef.current.value = "";
  };

  function renderTweet(tweet: Tweet, index: number) {
    let diff = (new Date() - new Date(tweet.datetime)) / 1000;
    let diffStr: string = "";
    // if (diff < 60) diffStr = Math.ceil(diff) + "seconds ago";
    if (diff > 60) {
      diff /= 60;
      if (diff < 60) diffStr = Math.ceil(diff) + "minutes ago";
      else {
        if (diff < 24) diffStr = Math.ceil(diff) + "hours ago";
        else {
          if (diff < 30) diffStr = Math.ceil(diff) + "days ago";
          else {
            if (diff < 12) diffStr = Math.ceil(diff) + "months ago";
            else diffStr = Math.ceil(diff) + "years ago";
          }
        }
      }
    }
    return (
      <Card mb={4} ml={4} p={3} key={index}>
        <Flex sx={{ alignItems: "center", justifyContent: "space-between" }}>
          <Heading as="h3">{tweet.owner}</Heading>
          <Box as="time" color="lightgray">
            {diffStr}
          </Box>
        </Flex>

        <Box as="p" sx={{ pt: 2 }}>
          {tweet.message}
        </Box>
      </Card>
    );
  }

  setInterval(() => {
    setTweetList((prev) => prev);
  }, 60000);

  useEffect(() => {
    setTweetList(JSON.parse(localStorage.getItem("mytweets") || "[]"));
    setInterval(() => {
      setTweetList((prev) => prev);
    }, 60000);
  }, []);
  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <Flex
        sx={{
          justifyContent: "center",
          maxWidth: "850px",
          margin: "64px auto",
        }}
      >
        <Box sx={{ width: "33%" }}>
          <Card sx={{ p: 4 }}>
            <Heading as="h1">Welcome back, {me}!</Heading>
            <form onSubmit={handleSubmit}>
              <Box mt={4} sx={{ color: "red" }}>
                {invalidMessage}
              </Box>
              <Box mt={2}>
                <Input ref={messageRef} placeholder="What's happening? " />
                <Flex mt={2} sx={{ justifyContent: "space-between" }}>
                  <Button mt={2}>Tweet</Button>
                  <Button
                    type="button"
                    onClick={() => {
                      localStorage.removeItem("mytweets");
                      setTweetList([]);
                    }}
                  >
                    reset
                  </Button>
                </Flex>
              </Box>
            </form>
            <Heading as="h5" mt={4} mb={2}>
              Theme switcher
            </Heading>
            <Flex
              mt={10}
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Button onClick={() => setCurrentTheme("modern")}>Modern</Button>
              <Button onClick={() => setCurrentTheme("nineties")} ml={2}>
                90s
              </Button>
            </Flex>
            <Button mt={10} onClick={() => setCurrentTheme("classic")}>
              classic
            </Button>
          </Card>
        </Box>

        <Box sx={{ width: "66%" }}>
          {tweetList
            .sort((a, b) => {
              return new Date(b.datetime) - new Date(a.datetime);
            })
            .map((tweet: Tweet, index: number) => renderTweet(tweet, index))}
        </Box>
      </Flex>
    </ThemeProvider>
  );
}
