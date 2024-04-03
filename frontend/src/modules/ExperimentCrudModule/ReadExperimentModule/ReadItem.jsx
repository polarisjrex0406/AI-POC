import { useState, useEffect } from 'react';
import { Divider } from 'antd';

import { Button, Row, Col, Descriptions, Statistic, Tag } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
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


const TemplateItem = ({ order, item, currentErp }) => {

  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {order}
        </p>
      </Col>
      <Col className="gutter-row" span={21}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.templateCode.name}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

const CriteriaRuleItem = ({ order, item, currentErp }) => {

  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={16}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.ruleName}
        </p>
      </Col>
      <Col className="gutter-row" span={8}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.conditionsLogic}
        </p>
      </Col>
      
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.conditionName}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.conditionType}
        </p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.conditionItem}
        </p>
      </Col>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.conditionOperator}
        </p>
      </Col>
      <Col className="gutter-row" span={6}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.conditionValue}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
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
    experimentCode: '',
    description: '',
    style: 'Stand-alone',
    topic: '',
    templates: [],
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
          navigate(`/${entity.toLowerCase()}`);
        }}
        title={`${ENTITY_NAME}`}
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
          <Button
            key={`${uniqueId()}`}
            onClick={() => {
              dispatch(
                erp.currentAction({
                  actionType: 'update',
                  data: currentErp,
                })
              );
              navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{
          padding: '20px 0px',
        }}
      >
      </PageHeader>
      <Divider dashed />
      <Descriptions title={`${currentErp.experimentCode}`}>
        <Descriptions.Item label={translate('topic')}>{currentErp.topic.name}</Descriptions.Item>
        <Descriptions.Item label={translate('description')}>{currentErp.description}</Descriptions.Item>
        <Descriptions.Item label={translate('style')}>{currentErp.style}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title='Artifacts' />
      <Row gutter={[12, 0]}>
        {/* Key, Value Type, Value, Description, Prompt Modifier */}
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Order')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Artifact Name')}</strong>
          </p>
        </Col>
      </Row>
      {currentErp.templates && currentErp.templates.map((item, index) => (
        <TemplateItem key={item._id} order={index + 1} item={item} currentErp={currentErp} />
      ))}

      <Descriptions title='Criteria' />
      <Row gutter={[12, 0]}>
        <Col className="gutter-row" span={20}>
          <p
            style={{
              textAlign: 'right',
            }}
          >
            {translate('Rule Logic:')}
          </p>
        </Col>
        <Col className="gutter-row" span={4}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            {currentErp.ruleLogic}
          </p>
        </Col>
      </Row>
      {currentErp.rules && currentErp.rules.map((item, index) => (
        <CriteriaRuleItem key={item._id} order={index + 1} item={item} currentErp={currentErp} />
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
