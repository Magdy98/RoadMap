import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { RemoveScroll } from 'react-remove-scroll';
import { RoadmapType } from '../../lib/roadmap';
import RoadmapGroup from '../../pages/[roadmap]/[group]';
import { CheckIcon, CloseIcon, RepeatIcon } from '@chakra-ui/icons';
import { queryGroupElementsById } from '../../lib/renderer/utils';
import { useState } from 'react';

type ContentDrawerProps = {
  roadmap: RoadmapType;
  groupId: string;
  onClose?: () => void;
};

export function ContentDrawer(props: ContentDrawerProps) {
  const { roadmap, groupId, onClose = () => null } = props;
  if (!groupId) {
    return null;
  }
  const status = localStorage.getItem(groupId);

  //function check status then toggeled status
  function changeState(clickedBtn: string) {
    //if status done - remove done 
    if (status == 'done')
      queryGroupElementsById(groupId).forEach((item) =>
        item?.classList?.remove('done')
      );
    if (clickedBtn == 'done' && status != 'done')
      queryGroupElementsById(groupId).forEach((item) =>
        item?.classList?.add('done')
      );
    //toggle status
    status == clickedBtn ? localStorage.removeItem(groupId) : localStorage.setItem(groupId, clickedBtn);
  }


  return (
    <Box zIndex={99999} pos="relative">
      <Box
        onClick={onClose}
        pos="fixed"
        top={0}
        left={0}
        right={0}
        bottom={0}
        bg="black"
        opacity={0.4}
      />
      <RemoveScroll allowPinchZoom>
        <Box
          p="0px 30px 30px"
          position="fixed"
          w={['100%', '60%', '40%']}
          bg="white"
          top={0}
          right={0}
          bottom={0}
          borderLeftWidth={'1px'}
          overflowY="scroll"
        >
          <Flex
            mt="20px"
            justifyContent="space-between"
            alignItems="center"
            zIndex={1}
          >
            <Button
              onClick={() => {
                changeState('beginner');
                onClose();
              }}
              colorScheme={status == 'beginner' ? 'red' : 'gray'}
              size="xs"
              iconSpacing={0}
            >
              <Text
                as="span"
                d={['block', 'none', 'none', 'block']}
                ml="10px"
              >
                10-20%
              </Text>
            </Button>
            <Button
              onClick={() => {
                changeState('intermediate');
                onClose();
              }}
              colorScheme={status == 'intermediate' ? 'yellow' : 'gray'}
              size="xs"
              iconSpacing={0}
            >
              <Text
                as="span"
                d={['block', 'none', 'none', 'block']}
                ml="10px"
              >
                40-50%
              </Text>
            </Button>
            <Button
              onClick={() => {
                changeState('done');
                onClose();
              }}
              colorScheme={status == 'done' ? 'green' : 'gray'}
              size="xs"
              iconSpacing={0}
            >
              <Text
                as="span"
                d={['block', 'none', 'none', 'block']}
                ml="10px"
              >
                100%
              </Text>
            </Button>
            <Button
              onClick={onClose}
              colorScheme="yellow"
              ml="5px"
              leftIcon={<CloseIcon width="8px" />}
              iconSpacing={0}
              size="xs"
            >
              <Text as="span" d={['none', 'none', 'none', 'block']} ml="10px">
                Close
              </Text>
            </Button>
          </Flex>
          <RoadmapGroup isOutlet roadmap={roadmap} group={groupId} />
        </Box>
      </RemoveScroll >
    </Box >
  );
}