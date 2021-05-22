import { Input, Box, Spinner, Button } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { useInfiniteQuestions, useTags } from "../apis";
import { IQuestionsRes } from "../apis/useInfiniteQuestions";
import { ITagsRes } from "../apis/useTags";
import Questions from "./Questions";
import Tags from "./Tags";

interface ITagsAndQuestions {
  tags: ITagsRes;
}

const TagsAndQuestions = (props: ITagsAndQuestions) => {
  const { tags } = props;
  const [curTag, setCurTag] = useState(tags.items[0].name);
  const {
    data: questionsArr,
    setSize,
    isValidating,
    error,
  } = useInfiniteQuestions<IQuestionsRes>({
    tagged: curTag,
  });

  const handleFetchMore = () => {
    setSize((s) => s + 1);
  };

  const handleTagOnClick = (name: string) => {
    setCurTag(name);
  };

  if (error) {
    <Box>Something went wrong :_(</Box>;
  }

  return (
    <Box h="calc(100vh - 110px)" overflow="scroll">
      <Box mt="5px">Trending</Box>
      <Tags
        tags={tags.items}
        curTag={curTag}
        handleTagOnClick={handleTagOnClick}
      />
      {questionsArr && (
        <>
          {questionsArr.map((questions: IQuestionsRes) => (
            <Box key={questions.items[0].question_id}>
              <Questions questions={questions.items} />
              {isValidating && (
                <Box d="flex" justifyContent="center" mt="10px">
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="blue.500"
                    size="xl"
                  />
                </Box>
              )}
            </Box>
          ))}
          {!isValidating && questionsArr[questionsArr.length - 1].has_more && (
            <Box textAlign="center" mt="10px">
              <Button onClick={handleFetchMore}>Load More</Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

const Index = () => {
  const [search, setSearch] = useState("");
  const { data, error } = useTags<ITagsRes>({
    inname: search,
  });

  /**
   * @todo
   * It's is better to have debounce for searching
   */
  const handleSearch = (e: ChangeEvent<any>) => {
    setSearch(e.target.value);
  };

  if (error) {
    return <Box>Something went wrong :_(</Box>;
  }

  return (
    <Box maxW="800px" h="100vh" margin="0 auto" p="30px 30px">
      <Box h="50px">
        <Input
          w="100%"
          value={search}
          onChange={handleSearch}
          placeholder="Input the tag you want to search"
        ></Input>
        {!!data?.items.length && <TagsAndQuestions tags={data} />}
      </Box>
    </Box>
  );
};

export default Index;
