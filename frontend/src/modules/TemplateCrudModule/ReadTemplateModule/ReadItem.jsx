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

const PromptEnhancerItem = ({ item, currentErp }) => {
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.key}
        </p>
      </Col>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.valueType}
        </p>
      </Col>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.value}
        </p>
      </Col>
      <Col className="gutter-row" span={6}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.description}
        </p>
      </Col>
      <Col className="gutter-row" span={9}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.promptModifier}
        </p>
      </Col>

      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

const ChatGptSettingItem = ({ item, currentErp }) => {
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.setting}
        </p>
      </Col>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.valueType}
        </p>
      </Col>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.value}
        </p>
      </Col>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.minValue}
        </p>
      </Col>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.maxValue}
        </p>
      </Col>
      <Col className="gutter-row" span={9}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.description}
        </p>
      </Col>

      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

const CacheConditionItem = ({ item, currentErp }) => {
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.key}
        </p>
      </Col>
      <Col className="gutter-row" span={3}>
        <p
          style={{
            textAlign: 'left',
          }}
        >
          {item.changeDetection}
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

  const { result: currentResult } = useSelector(selectCurrentItem);

  const resetErp = {
    removed: false,
    enabled: true,
    name: '',
    group: '',
    goal: '',
    topic: {
      name: '',
    },
    prompt_output: '',
    useCache: false,
    cacheTimeoutUnit: null,
    cacheTimeoutValue: 0,
    cacheConditions: [],
    description: ''
  };

  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);
  const [promptEnhancers, setPromptEnhancers] = useState([]);

  useEffect(() => {
    if (currentResult) {
      const { promptEnhancerItems, criteriaItems, retentionSettingItems, ...others } = currentResult;

      if (promptEnhancerItems) {
        setPromptEnhancers(promptEnhancerItems);
      }
      setCurrentErp(currentResult);
    }
    return () => {
      setPromptEnhancers([]);
      setCurrentErp(resetErp);
    };
  }, [currentResult]);

  useEffect(() => {
    if (currentErp?.client) {
      setClient(currentErp.client[currentErp.client.type]);
    }
  }, [currentErp]);

  return (
    <>
      <PageHeader
        onBack={() => {
          window.history.back();
        }}
        title={`Artifact`}
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
      <Descriptions title={`${currentErp.name} - ${currentErp.group}`}>
        <Descriptions.Item label={translate('Goal')}>{currentErp.goal}</Descriptions.Item>
        <Descriptions.Item label={translate('Prompt Output')}>{currentErp.promptOutput}</Descriptions.Item>
      </Descriptions>
      <Divider />
      <Descriptions title='Prompt Enhancers' />
      <Row gutter={[12, 0]}>
        {/* Key, Value Type, Value, Description, Prompt Modifier */}
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Key')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Value Type')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Value')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={6}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Description')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={9}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Prompt Modifier')}</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {currentErp.promptEnhancers && currentErp.promptEnhancers.map((item) => (
        <PromptEnhancerItem key={item._id} item={item} currentErp={currentErp} />
      ))}

      <Descriptions title='ChatGPT Settings' />
      <Row gutter={[12, 0]}>
        {/* Key, Value Type, Value, Description, Prompt Modifier */}
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Setting')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Value Type')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Value')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Min')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={3}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Max')}</strong>
          </p>
        </Col>
        <Col className="gutter-row" span={9}>
          <p
            style={{
              textAlign: 'left',
            }}
          >
            <strong>{translate('Description')}</strong>
          </p>
        </Col>
        <Divider />
      </Row>
      {currentErp.chatgptSettings && currentErp.chatgptSettings.map((item) => (
        <ChatGptSettingItem key={item._id} item={item} currentErp={currentErp} />
      ))}

      <Descriptions title='Retention Settings'>
        <Descriptions.Item label={translate('Use Cache')}>
          {currentErp.useCache.toString()}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Cache Timeout Unit')}>
          {currentErp.cacheTimeoutUnit}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Cache Timeout Value')}>
          {currentErp.cacheTimeoutValue}
        </Descriptions.Item>
        <Descriptions.Item label={translate('Cache Description')}>
          {currentErp.description}
        </Descriptions.Item>
      </Descriptions>
      {currentErp.useCache && currentErp.cacheConditions.map((item) => (
        <CacheConditionItem key={item._id} item={item} currentErp={currentErp} />
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
