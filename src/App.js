import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import React, { Component } from 'react';
import './App.css';
import TreeStructure from './TreeStructure'
import FolderStructure from './FolderStructure'
import { Grommet, Box, Tabs, Tab } from 'grommet'
import { DocumentImage, Overview } from 'grommet-icons'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFolderStructureTab: true,
      isOverviewTab: false
    }
  }
  render() {
    return (
      // <Grommet full theme={theme}>
        <Box pad="small" height="100vh" position="fixed" overflow="auto" align="center" flex="grow" animation={{ "type": "slideUp", "size": "small" }} background="#223E4F">
           <Tabs justify="left" flex="shrink">
            <Tab title="Folder stucture" hoverIndicator={true} icon={<DocumentImage />} plain={false} reverse={false} >
            <FolderStructure />
            </Tab>            
            <Tab title="Overview" hoverIndicator={true} icon={<Overview />}>
              <TreeStructure />
              </Tab>
          </Tabs>        
        </Box>
      // </Grommet>
    )
  }
}

const theme = {
  "global": {
    "colors": {
      "background": {
        "light": "#ffffff",
        "dark": "#000000"
      }
    },
    "font": {
      "family": "-apple-system,\n         BlinkMacSystemFont, \n         \"Segoe UI\", \n         Roboto, \n         Oxygen, \n         Ubuntu, \n         Cantarell, \n         \"Fira Sans\", \n         \"Droid Sans\",  \n         \"Helvetica Neue\", \n         Arial, sans-serif,  \n         \"Apple Color Emoji\", \n         \"Segoe UI Emoji\", \n         \"Segoe UI Symbol\""
    }
  },
  "button": {
    "extend": [
      null
    ]
  }
}

export default App;
