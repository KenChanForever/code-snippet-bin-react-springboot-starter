import React, { Component } from 'react';
import { Modal, Row, Col, Button, Table, Tag } from 'antd';
import { connect } from 'react-redux';
// import { queryAllCrobLog, queryLogDetails } from '../actions/LogAction';
import Header from '../components/header/Header';

const SUCCESS = 'SUCCESS';

const styles = {
  logDiv: {
    width: "100%",
    height: 500,
    overflow: "auto",
  },
  row: {
    width: "80%",
  }
  ,
};

class LogContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: [],
      loading: false,
      jobData: [
        {
          date: "2018-11-19, 10:00:01",
          branch: "develop",
          result: "SUCCESS",
        },
        {
          date: "2018-11-20, 10:00:01",
          branch: "develop",
          result: "SUCCESS",
        },
        {
          date: "2018-11-21, 10:00:01",
          branch: "develop",
          result: "SUCCESS",
        },
        {
          date: "2018-11-22, 10:00:01",
          branch: "develop",
          result: "FAILED",
        },
      ],
    };
  }

  componentDidMount() {
    this.fetchLogList();
  }

  fetchLogList = () => {
    // this.setState({
    //   loading: true,
    // });
    // queryAllCrobLog().then(result => result.json()).then(logs => {
    //   this.setState({
    //     jobData: logs,
    //     loading: false,
    //   });
    // })
  };

  onOpenDialog = (date) => {
    this.setState({
      loading: true,
    });
    // queryLogDetails(date).then(result => result.text()).then(details => {
    //   this.setState({
    //     loading: false,
    //     visible: true,
    //     log: details.split('\n'),
    //   });
    // });
  };

  onCloseDialog = () => {
    this.setState({
      visible: false,
    });
  };
  // app path should load from main
  render() {
    const columns = [{
      title: 'Date of cron job',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Target branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Test result',
      dataIndex: 'result',
      key: 'result',
      render: result => <Tag color={result == SUCCESS ? '#87d068' : '#f50'}> {result} </Tag>
    },
    {
      title: 'Test logs',
      dataIndex: 'date',
      key: 'logs',
      render: result => <Button onClick={() => this.onOpenDialog(result)}> Details </Button>
    },
    ];

    const footer = [
      <Button onClick={this.onCloseDialog}>Close</Button>
    ]
    return (
      <div className="root">
        <Header
          title={'Code Snippet'}
          style={{ position: 'fixed', height: '64px' }}
        />
        <div className="container">
          <div className="container-main">
            <Row style={styles.row}>
              <Col span={10}></Col>
              <Col span={4}>
                <h3>Daily Cron Job result</h3>
              </Col>
              <Col span={10}></Col>
            </Row>
            <Row style={styles.row}>
              <Col span={24}>
                <div>
                  <Table
                    columns={columns}
                    size="small"
                    dataSource={this.props.jobData}
                    loading={this.state.loading}
                  />
                </div>
              </Col>
          </Row>
          </div>
        </div>
        <Modal
          title="Log Details"
          visible={this.state.visible}
          footer={footer}
          closable={false}
          style={{
            width: '60%',
            minHeight: '60vh', maxHeight: '80vh', minWidth: '60vw', maxWidth: '80vw',
          }}
        >
          <div style={styles.logDiv}>
            {
              this.state.log &&
              this.state.log.map(text => <p>{text}</p>)

            }
          </div>
        </Modal>
      </div>

    );
  }
}
function mapStateToProps() {
  // const customizedActionState = state.get('customizedAction');
  return {
    jobData: [
      {
        date: "2018-11-19, 10:00:01",
        branch: "develop",
        result: "SUCCESS",
      },
      {
        date: "2018-11-20, 10:00:01",
        branch: "develop",
        result: "SUCCESS",
      },
      {
        date: "2018-11-21, 10:00:01",
        branch: "develop",
        result: "SUCCESS",
      },
      {
        date: "2018-11-22, 15:00:01",
        branch: "develop",
        result: "FAILED",
      },
    ],
  };
}
export default (connect(mapStateToProps)(LogContainer));
