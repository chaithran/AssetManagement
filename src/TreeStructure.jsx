import React from 'react';
import renderHTML from 'react-render-html';
import { TreeView, ContextMenu, List } from 'devextreme-react';
import { Box, Button } from 'grommet';
import ReactDOM from 'react-dom';

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
        <div className="form">
          <TreeView id="treeview"
            items={fileItems}//{this.state.overviewTree}
            // dataStructure="plain"
            displayExpr="name"
            parentIdExpr="parentID"
            keyExpr="id"
            width={300}
            searchMode={this.state.value}
            searchEnabled={true}
            ref={this.treeViewRef}
            onItemContextMenu={this.treeViewItemContextMenu}
            onItemClick={this.selectItem} />

          {
            !currentItem.isDirectory &&
            <div id="product-details">
              <Box>       
                
                <div id="container"></div>  {/* <img src={currentItem.image} /> */}
                <div className="name">{currentItem.name}</div>
                <div className="price">{`$${currentItem.isDirectory}`}</div>
                <input id="newVariant" />
                <Button>Add Variant</Button>
              </Box>
            </div>
          }
        </div>
      </React.Fragment>
    );
  }

  selectItem(e) {
    this.setState({
      currentItem: Object.assign({}, e.itemData)
    });
    if(!e.itemData.isDirectory && e.itemData.blobName.length>0)
       this.getImageFromContainer(e.itemData.blobName);
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

  getImageFromContainer(blobName) {
    // var blobName = "85b1e523-43c5-4788-be2f-c4da8427b6b6"
    return fetch(`${"http://localhost:53615/api/fileupload/getblob?blobName=" + blobName}`)
        .then(response => response.json())
        .then(result => {
            console.log(result)
            const data = result;
            const Example = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />
            ReactDOM.render(<Example data={data} />, document.getElementById('container'))
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
      "items": [
          {
              "id": 2,
              "name": "Variants",
              "parentId": 1,
              "isDirectory": true,

          }
      ]
  }
];


export default TreeStructure;