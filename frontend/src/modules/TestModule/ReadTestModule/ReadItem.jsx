import { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, Row, Col, Descriptions, Statistic, Tag, Alert, Card } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
  DeleteOutlined,
} from '@ant-design/icons';

import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';

import { generate as uniqueId } from 'shortid';

import { selectCurrentItem } from '@/redux/erp/selectors';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import useMail from '@/hooks/useMail';
import { useNavigate } from 'react-router-dom';
import { tagColor } from '@/utils/statusTagColor';
import { settingsAction } from '@/redux/settings/actions';

const SystemMessage = ({role, content}) => {
  return (
    <>
      <Col key={`${uniqueId()}`} className="gutter-row" span={3} />
      <Col key={`${uniqueId()}`} className="gutter-row" span={18}>
    <Alert
      message="Initial Prompt"
      description={content}
      type="error"
    />
      </Col>
      <Col key={`${uniqueId()}`} className="gutter-row" span={3} />
      <Divider />
      </>
  );
}

const UserMessage = ({role, content}) => {
  return (
    <>
      <Col key={`${uniqueId()}`} className="gutter-row" span={6} />
      <Col key={`${uniqueId()}`} className="gutter-row" span={18}>
    <Alert
      key={`${uniqueId()}`}
      message="Refined Prompt"
      description={content}
      type="info"
    />
      </Col>
      <Divider dashed />
      </>
  );
}

const AssistMessage = ({role, content}) => {
  return (
    <>
      <Col key={`${uniqueId()}`} className="gutter-row" span={18}>
    <Alert
      key={`${uniqueId()}`}
      message="Response"
      description={content}
      type="success"
    />
      </Col>
      <Col key={`${uniqueId()}`} className="gutter-row" span={6} />
      <Divider />
      </>
  );
}

const PromptItem = ({role, content}) => {
  if (role === 'system') {
    return (
      <SystemMessage key={`${uniqueId()}`} content = {content} />
    );
  }
  else if (role === 'user') {
    return (
      <UserMessage key={`${uniqueId()}`} content = {content} />
    );
  }
  else if (role === 'assistant') {
    return (
      <AssistMessage key={`${uniqueId()}`} content = {content} />
    );
  }
  else {
    return;
  }
}

const ChatItem = ({order, item}) => {
  return (
    <Row gutter={[12, 0]} key={`${uniqueId()}`}>
      {item.input && item.input.map((inp, index) => (
        <PromptItem key={`${uniqueId()}`} role={inp.role} content={inp.content} />
      ))}
      <PromptItem key={`${uniqueId()}`} role={item.output.role} content={item.output.content} />
    </Row>
  );
}

const ExperimentItem = ({ order, item, currentErp }) => {
  return (
      item.chatHistory && item.chatHistory.map((chat, index) => (
        <Card
          key={`${uniqueId()}`}
          title={`${item.experiment.templates[index].templateCode.name}`}
        >
          <ChatItem item = {chat} key={`${uniqueId()}`}/>
        </Card>
      ))
  );
};

export default function ReadItem({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { send, isLoading: mailInProgress } = useMail({ entity });

  const { result: currentResult } = useSelector(selectCurrentItem);

  const resetErp = {
    removed: false,
    enabled: true,
    testCode: '',
    description: '',
    topic: {},
    experiments: [],
  };

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);
  const [client, setClient] = useState({});

  const [topic, setTopic] = useState({});
  const [template, setTemplate] = useState({});

  const updateCurrency = (value) => {
    dispatch(
      settingsAction.updateCurrency({
        data: { default_currency_code: value },
      })
    );
  };
  useEffect(() => {
    if (currentResult) {
  // const { items, invoice, ...others } = currentResult;

      // if (items) {
        // setItemsList(items);
        setCurrentErp(currentResult);
      // } else if (invoice.items) {
        // setItemsList(invoice.items);
        // setCurrentErp({ ...invoice.items, ...others, ...invoice });
      // }
      // updateCurrency(currentResult.currency);
    }
    return () => {
      setItemsList([]);
      setCurrentErp(resetErp);
    };
  }, [currentResult]);

  useEffect(() => {
    if (currentErp?.topic) {
      setTopic(currentErp.topic[currentErp.topic.type]);
    }
    if (currentErp?.templates) {
      // setClient(currentErp.client[currentErp.client.type]);
    }
  }, [currentErp]);

  return (
    <>
      <PageHeader
        onBack={() => {
          window.history.back();
        }}
        title={`${ENTITY_NAME} - ${currentErp.testCode}`}
        extra={[
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              window.history.back();
            }}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
      </PageHeader>
      <Divider dashed />
      {currentErp.experiments && currentErp.experiments.map((item, index) => (
        <>
        <Divider />
      <Descriptions key={`${uniqueId()}`} title={`${item.experiment.experimentCode}`} />
        <ExperimentItem key={`${uniqueId()}`} order={index + 1} item={item} currentErp={currentErp} />
        </>
      ))}

      {/* <div
        style={{
          width: '300px',
          float: 'right',
          textAlign: 'right',
          fontWeight: '700',
        }}
      >
      </div> */}
    </>
  );
}
