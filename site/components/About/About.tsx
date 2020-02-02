import * as React from 'react';
import {
  Flex,
  Link,
  Text,
} from 'preshape';
import Logo from '../Logo/Logo';
import URLStateContext from '../URLState/URLStateContext';
import Modal from '../Modal/Modal';

export default () => {
  const { pushWithState } = React.useContext(URLStateContext);

  const handleClose = () => {
    pushWithState('/');
  };

  return (
    <Modal
        maxWidth="600px"
        onClose={ handleClose }
        title="About"
        visible>
      <Flex padding="x6">
        <Flex alignChildren="middle" direction="vertical" margin="x4">
          <Logo height="6rem" width="6rem" />
        </Flex>

        <Text align="middle" margin="x4">
          A tool for creating artwork by filling in the intersection areas of overlapping
          circles. Inspired by a <Link href="https://www.reddit.com/r/Damnthatsinteresting/comments/963j4n/magic_of_circles" underline>Reddit
          post</Link> and <Link href="http://dorotapankowska.com/13-animals-13-circles.html" underline>13 Animals Made From 13 Circles</Link> by Dorota Pankowska.
        </Text>

        <Text align="middle" margin="x4">
          This was also an experiement to try out a new way of calculating all of the
          intersections areas with little geometry. If you're interested in reading more
          about this, you can read about it <Link href="https://hogg.io/writings/circle-intersections" underline>on my website</Link>.
        </Text>

        <Text margin="x8">
          <Text align="middle" strong>Harrison Hogg</Text>
          <Text align="middle">Software Engineer</Text>
        </Text>
      </Flex>
    </Modal>
  );
};
