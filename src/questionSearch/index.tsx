import { useState } from "react";
import { useInfiniteQestions, useTags } from "../apis";

const Index = () => {
  const [search, setSearch] = useState("");
  const { data: questions, setSize } = useInfiniteQestions({
    tagged: "",
  });
  const { data: tags } = useTags({
    inname: search,
  });
  console.log("questions");
  console.log(questions);
  console.log("tags");
  console.log(tags);
  return (
    <div>
      data
      <button onClick={() => setSize((s: number) => s + 1)}>
        Fetch more questions
      </button>
      <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
    </div>
  );
};

export default Index;
