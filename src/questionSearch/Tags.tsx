import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import { ITagData } from "../apis/useTags";

interface ITagsProps {
  handleTagOnClick: (name: string) => void;
  curTag: string;
  tags: ITagData[];
}

const Tags = (props: ITagsProps) => {
  const { tags, curTag, handleTagOnClick } = props;

  return (
    <Box mt="5px">
      <SimpleGrid minChildWidth="100px" spacing="10px">
        {tags.map((tag) => (
          <Button
            d="inline-block"
            fontSize="12px"
            cursor="pointer"
            key={tag.name}
            colorScheme={curTag === tag.name ? "blue" : undefined}
            onClick={() => handleTagOnClick(tag.name)}
          >
            {tag.name}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default Tags;
