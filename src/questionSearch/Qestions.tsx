import { Box, SimpleGrid, Avatar, Link, Divider } from "@chakra-ui/react";
import { IQestionData } from "../apis/useInfiniteQuestions";

interface IQuestionProps {
  question: IQestionData;
}

const Question = (props: IQuestionProps) => {
  const {
    score,
    answer_count,
    view_count,
    title,
    link,
    is_answered,
    owner: { display_name, profile_image },
  } = props.question;
  return (
    <Box mt="10px">
      <Link href={link} target="blank">
        <Box fontWeight="800">{title}</Box>
      </Link>
      <SimpleGrid columns={4} minChildWidth="80px">
        <Box>
          <Box>Score</Box>
          <Box color={score < 0 ? "red" : undefined}>{score}</Box>
        </Box>
        <Box>
          <Box>Answers</Box>
          <Box>
            <Box
              d="inline-block"
              p="3px 5px"
              bg={answer_count > 0 && is_answered ? "green" : undefined}
              border={
                answer_count > 0 && !is_answered ? "1px solid green" : undefined
              }
            >
              {answer_count}
            </Box>
          </Box>
        </Box>
        <Box>
          <Box>Viewed</Box>
          <Box>{view_count}</Box>
        </Box>
        <Box textAlign="right">
          <Box
            d="flex"
            flexWrap="wrap"
            justifyContent="center"
            textAlign="center"
          >
            <Box w="100%">
              <Avatar src={profile_image} />
            </Box>
            <Box mt="8px" fontSize="10px" w="100%">
              {display_name}
            </Box>
          </Box>
        </Box>
      </SimpleGrid>
      <Divider />
    </Box>
  );
};

interface IQuestionsProps {
  questions: IQestionData[];
}

const Questions = (props: IQuestionsProps) => {
  const { questions } = props;

  return (
    <>
      {questions.map((question) => (
        <Question question={question} key={question.question_id} />
      ))}
    </>
  );
};

export default Questions;
