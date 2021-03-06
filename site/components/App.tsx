import * as React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useLocalStorage, useTheme, Flex, Icon, Link, List, ListItem, ThemeSwitcher, Tooltip, TypeTheme } from 'preshape';
import { Data, TypeMode } from '../Types';
import Fox from '../configurations/Fox.json';
import About from './About';
import Editor from './Editor/Editor';
import Library from './Library';
import Logo from './Logo';

export const AppContext = React.createContext<{
  data: Data;
  onSetData: (data: Data) => void;
  theme: TypeTheme;
}>({
  data: { circles: [], intersections: [] },
  onSetData: () => {},
  theme: 'day',
});

export default () => {
  const [theme, setTheme] = useLocalStorage<TypeTheme>('com.hogg.theme', 'day');
  const location = useLocation();
  const [data, onSetData] = React.useState<Data>(Fox);
  const [mode, onSetMode] = React.useState<TypeMode>('view');

  const handleClear = () => {
    onSetData({ intersections: [], circles: [] });
    onSetMode('draw');
  };

  const handleSetData = (data: Data) => {
    onSetData(data);
    onSetMode('view');
  };

  useTheme(theme);

  return (
    <AppContext.Provider value={ { data: data, onSetData: handleSetData, theme: theme } }>
      <Flex backgroundColor="background-shade-1" direction="vertical" grow>
        <Flex
            alignChildrenVertical="middle"
            direction="horizontal"
            gap="x6"
            paddingHorizontal="x6"
            paddingVertical="x2">
          <Flex
              alignChildrenVertical="middle"
              direction="horizontal"
              gap="x4"
              grow>
            <Flex>
              <Logo height="32px" width="32px" />
            </Flex>
          </Flex>

          <Flex>
            <List gap="x2">
              <ListItem separator="|">
                <Tooltip content="Library">
                  { (props) => (
                    <Link { ...props }
                        display="block"
                        title="Library"
                        to={ `/library${location.search}` }>
                      <Icon name="Book" size="1.25rem" />
                    </Link>
                  ) }
                </Tooltip>
              </ListItem>

              <ListItem separator="|">
                <Tooltip content="About">
                  { (props) => (
                    <Link { ...props }
                        display="block"
                        title="About"
                        to={ `/about${location.search}` }>
                      <Icon name="Info" size="1.25rem" />
                    </Link>
                  ) }
                </Tooltip>
              </ListItem>

              <ListItem separator="|">
                <Tooltip content="Github">
                  { (props) => (
                    <Link { ...props }
                        display="block"
                        href="https://github.com/HHogg/circles"
                        target="Github"
                        title="Github">
                      <Icon name="Github" size="1.25rem" />
                    </Link>
                  ) }
                </Tooltip>
              </ListItem>

              <ListItem>
                <ThemeSwitcher
                    onChange={ setTheme }
                    theme={ theme } />
              </ListItem>
            </List>
          </Flex>
        </Flex>

        <Flex basis="none" direction="vertical" grow>
          <Switch>
            <Route component={ About } path="/about" />
            <Route component={ Library } path="/library" />
          </Switch>

          <Editor
              data={ data }
              mode={ mode }
              onChangeMode={ onSetMode }
              onClearData={ handleClear } />
        </Flex>
      </Flex>
    </AppContext.Provider>
  );
};

