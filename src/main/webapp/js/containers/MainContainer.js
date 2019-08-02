import React, { Component } from "react";
import { Modal, Row, Col, Button, Table, Card, message, Popconfirm } from "antd";
import { connect } from "react-redux";
import Header from "../components/header/Header";
import AceEditor from "../components/AceEditor";
import * as Actions from '../actions/CodeSnippetAction';
const styles = {
  row: {
    padding: "15px",
    width: "100%",
  },
  titleStyle: {
    maxWidth: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap"
  },
  actionButton: {
    marginRight: 5
  },
  ace: {
    height: "65vh"
  },
  antCard: {
    height: 750
  }
};

class MainContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      snippetData: [],
      isViewerCopyButton: false,
      curRec: null,
      openAddDialog: false,
      editorContent: ""
    };
  }

  componentDidMount() {
    this.fetchList();
  }

  fetchList = () => {
    this.setState({
      loading: true,
    });
    this.props.dispatch(Actions.fetchAllSnippet()).then(() => {
      this.setState({
        loading: false,
      });
    })
  };

  handleViewAction = rec => {
    this.setState({
      curRec: rec
    });
    message.info("Please view the code snippet in the right panel", 5);
  };

  handleCopyAction = rec => {
    const isSuccess = this.copyTextToClipboard(rec.code);
    if (isSuccess) {
      message.success("The code snippet is copied", 5);
    } else {
      message.error("Copying is not successful", 5);
    }
  };

  handleConfirmDeleteAction = rec => {
    this.props.dispatch(Actions.deleteSnippet(rec.id)).then((res) => {
      if (res.verdict) {
        message.success("The code snippet is deleted", 5);
        this.fetchList();
      } else {
        message.error(`The code snippet is failed to delete, ${res.message}`);
      }
    });
  };

  traditionalCopyTextToClipboard = text => {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      return document.execCommand("copy");
    } catch (err) {
      return false;
    } finally {
      document.body.removeChild(textArea);
    }
  };
  copyTextToClipboard = text => {
    if (!navigator.clipboard) {
      return this.traditionalCopyTextToClipboard(text);
    }
    return navigator.clipboard.writeText(text).then(() => true, err => false);
  };

  handleContentChange = editorContent => {
    this.setState({ editorContent });
  };

  handleCreateSnippet = () => {
    const { editorContent } = this.state;
    if (editorContent === "") {
      message.info("It is a empty code snippet!");
      return;
    }
    
    this.props.dispatch(Actions.createSnippet({
      code: editorContent,
    })).then((res) => {
      console.log(res);
      if (res.verdict) {
        message.success("Created snippet");
        this.setState({ openAddDialog: false, editorContent: "" });
        this.fetchList();
      } else {
        message.error(res.message);
      }
    });
  };

  handleConfirmCancel = () => {
    this.setState({ openAddDialog: false, editorContent: '' });
  };

  render() {
    const { curRec } = this.state;
    const columns = [
      {
        title: "title",
        dataIndex: "title",
        key: "title",
        render: title => (
          <div title={title} style={styles.titleStyle}>
            {title}
          </div>
        )
      },
      {
        title: "Actions",
        dataIndex: "actions",
        key: "actions",
        render: (empty, rec) => (
          <div>
            <Button
              style={styles.actionButton}
              onClick={() => this.handleViewAction(rec)}
            >
              View
            </Button>
            <Button
              style={styles.actionButton}
              type="primary"
              onClick={() => this.handleCopyAction(rec)}
            >
              Copy
            </Button>
            <Popconfirm 
              placement="top" 
              title={"Sure to Delete?"} 
              onConfirm={() => this.handleConfirmDeleteAction(rec)} 
              okText="Yes" 
              cancelText="No"
            >
              <Button
                style={styles.actionButton}
                type="danger"
              >
                Delete
              </Button>
            </Popconfirm>
          </div>
        )
      }
    ];

    const footer = [
      <Popconfirm
        key={"cancel"}
        placement="top"
        title={"Sure to Cancel?"}
        onConfirm={this.handleConfirmCancel}
        okText="Yes"
        cancelText="No"
      >
        <Button>
          Cancel
        </Button>
      </Popconfirm>,
      <Button key="create" type="primary" onClick={this.handleCreateSnippet}>Create</Button>
    ]
    return (
      <div className="root">
        <Header
          title={"Code Snippet"}
          style={{ position: "fixed", height: "64px" }}
        />
        <div className="container">
          <div
            className="container-main"
            style={{ backgroundColor: "rgb(242,243,242)" }}
          >
            <Row style={styles.row}>
              <Col span={11}>
                <Card bordered={false} style={styles.antCard}>
                  <Row style={{ paddingRight: 15 }}>
                    <Button
                      type="primary"
                      icon="plus"
                      style={{ float: "right" }}
                      onClick={() => {
                        this.setState({ openAddDialog: true });
                      }}
                    />
                  </Row>
                  <Row style={styles.row}>
                    <Table
                      columns={columns}
                      dataSource={this.props.snippetData}
                      loading={this.state.loading}
                      rowKey={(rec)=> rec.id}
                    />
                  </Row>
                </Card>
              </Col>
              <Col span={2} />
              <Col span={11}>
                <Card bordered={false} style={styles.antCard}>
                  <div
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                  >
                    <AceEditor
                      fileType="yaml"
                      style={styles.ace}
                      value={(curRec && curRec.code) || ""}
                      readOnly={true}
                    />
                    {curRec && (
                      <Button
                        icon="copy"
                        style={{
                          width: 35,
                          position: "absolute",
                          margin: "10px 10px 0px 0px",
                          right: 25,
                          top: 0
                        }}
                        onClick={() => this.handleCopyAction(curRec)}
                      />
                    )}
                  </div>
                </Card>
              </Col>
            </Row>
          </div>
        </div>
        <Modal
          title="Add Code Snippet"
          visible={this.state.openAddDialog}
          footer={footer}
          closable={false}
          width={800}
        >
          <AceEditor
            fileType="yaml"
            onChange={this.handleContentChange}
            style={styles.ace}
            value={this.state.editorContent}
            placeholder="First line is title"
            readOnly={false}
          />
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const codeSnippetState = state.get('codeSnippet');
  console.log(codeSnippetState.get('fetchList'));
  console.log(codeSnippetState.get('fetchList'));
  const snippetData = codeSnippetState.get('fetchList') instanceof Array ? codeSnippetState.get('fetchList') : [];
  console.log(snippetData);
  return {
    snippetData,
    snippetData1: [
      {
        title:
          "title1.............................................123213123123123title1.............................................123213123123123title1.............................................123213123123123title1.............................................123213123123123title1.............................................123213123123123title1.............................................123213123123123title1.............................................123213123123123title1.............................................123213123123123title1.............................................123213123123123",
        date: "2018-11-19, 10:00:01",
        branch: "develop",
        result: "SUCCESS",
        code: "1\n1\n1\n1\n1"
      },
      {
        title: "title2",
        date: "2018-11-20, 10:00:01",
        branch: "develop",
        result: "SUCCESS",
        code: "22222"
      },
      {
        title: "title3",
        date: "2018-11-21, 10:00:01",
        branch: "develop",
        result: "SUCCESS",
        code: "33333"
      },
      {
        title: "title4",
        date: "2018-11-22, 15:00:01",
        branch: "develop",
        result: "FAILED",
        code: "44444"
      }
    ]
  };
}

/**
 * id
 * title
 * code
 * isDeleted
 *
 * */
MainContainer.defaultProps = {
  snippetData: [],
}

export default connect(mapStateToProps)(MainContainer);
