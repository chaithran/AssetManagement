import React from 'react';
import renderHTML from 'react-render-html';
import { TreeView, ContextMenu, List } from 'devextreme-react';
import { Box, Button, Grid, Sidebar, Avatar } from 'grommet';
import ReactDOM from 'react-dom';
import image_tmp from './img/b7.jpg';


class TreeStructure extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: {},
      value: 'contains', //or startswith,
      selectedTreeItem: undefined,
      overviewTree: []
    };
    this.treeViewRef = React.createRef();
    this.selectItem = this.selectItem.bind(this);
    this.treeViewItemContextMenu = this.treeViewItemContextMenu.bind(this);
  }
  componentDidMount() {
    this.GetOverviewData();
    this.setState({
      currentItem: Object.assign({}, this.state.overviewTree[0])
    })
  }

  render() {
    const { currentItem } = this.state;
    return (
      <React.Fragment>

        <Box
          background="orange"
          width="98vw"
          height="85vh"
          pad="medium"
          round="small"
          overflow="fit-content"
          direction="row"
        >
          {/* <Grid fill
            rows={['auto', 'flex']}
            columns={['auto', 'flex']}
            gap="xxsmall"
            areas={[
              { name: 'nav', start: [0, 1], end: [0, 1] },
              { name: 'main', start: [1, 1], end: [1, 1] },
            ]}
          > */}
            <Box direction="row" pad="medium" style={{'margin-right': '16px','color': 'papayawhip','background': 'aliceblue',
              'font-weight': 'bold'}}>
              <Box style={{'margin-right': '16px','color': 'papayawhip','background': 'aliceblue',
              'font-weight': 'bold'}}> 
              <Sidebar background="lightblue" round="small"
              header={
                <Avatar src="//s.gravatar.com/avatar/b7fb138d53ba0f573212ccce38a7c43b?s=80" />
              }
              footer={
                <Button hoverIndicator />
              }
            >
            </Sidebar></Box>
              <div overflow="scroll" background="lightblue">
                <TreeView id="treeview"
                  items={this.state.overviewTree}
                  // dataStructure="plain"
                  displayExpr="name"
                  parentIdExpr="parentID"
                  keyExpr="id"
                  searchMode={this.state.value}
                  searchEnabled={true}
                  ref={this.treeViewRef}
                  onItemContextMenu={this.treeViewItemContextMenu}
                  onItemClick={this.selectItem} />


              </div>
            </Box>


              <Box id="product-details" style={{'margin-right': '16px','width': 'auto','color': 'papayawhip','background': 'cadetblue','width': '900px','height': 'auto',
              'font-weight': 'bold'}}>
                <Box style={{'text-align':'center'}} margin="top" overflow="auto">
                  <div id="title">{currentItem.title}</div>
                  <div id="container"> <img src={image_tmp} /></div>
                  <div id="title">{currentItem.content}</div>
                </Box>

            </Box>
          {/* </Grid> */}
        </Box>
      </React.Fragment>
    );
  }

  selectItem(e) {
    debugger;
    this.setState({
      currentItem: Object.assign({}, e.itemData)
    });
    var isVideo = e.itemData.name.includes('mp4') ? true : false;
    if (!e.itemData.isDirectory && e.itemData.blobName.length > 0)
      this.getImageFromContainer(e.itemData.blobName, e.itemData.title, e.itemData.content, isVideo);
  }

  get treeView() {
    return this.treeViewRef.current.instance;
  }

  treeViewItemContextMenu(e) {
    this.setState({
      selectedTreeItem: e.itemData,
    });
  }

  GetOverviewData() {
    const APIURL = "http://localhost:53615/api/assetmanagement";
    fetch(`${APIURL}`, {
    }).then((response) => response.json())
      .then((data) => {
        this.setState({
          overviewTree: data
        });
      });
  }

  getImageFromContainer(blobName, title, content, isVideo) {
    // var blobName = "85b1e523-43c5-4788-be2f-c4da8427b6b6"
    return fetch(`${"http://localhost:53615/api/fileupload/getblob?blobName=" + blobName}`)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        const data = result;
        if (isVideo) {
          const Example = ({ data }) => <div><h3>Title : {title}</h3>
            <video height= '300px' width= '600px' src={`data:video/mp4;base64,${data}`} controls autostart autoplay />
            {/* <vide src={`data:image/jpeg;base64,${data}`} /> */}
            <h4>Content : {content}</h4></div>
          ReactDOM.render(<Example data={data} />, document.getElementById('container'))
        }
        else {
          const Example = ({ data }) => <div><h3>Title : {title}</h3> <img height= '300px' width= '600px' src={`data:image/jpeg;base64,${data}`} />
            <h4>Content : {content}</h4></div>
          ReactDOM.render(<Example data={data} />, document.getElementById('container'))
        }

      });

  }


}
var thisIsMyCopy = renderHTML('<p>copy copy copy <strong>strong copy</strong></p>');

const fileItems = [
  {
    "id": 1,
    "name": "Clients",
    "parentId": null,
    "isDirectory": true,
    "blobName": null,
    "items": [
      {
        "id": 2,
        "name": "Variants.png",
        "parentId": 1,
        "isDirectory": false,
        "blobName": "1eccc18d-2d18-4815-8f7f-d8a218245909"
      }
    ]
  }
];

export default TreeStructure;