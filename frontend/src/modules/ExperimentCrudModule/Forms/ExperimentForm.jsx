import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import TemplateItemRow from '@/modules/ExperimentCrudModule/ItemsRow/TemplateItemRow'
import CriteriaRuleItemRow from '@/modules/ExperimentCrudModule/ItemsRow/CriteriaRuleItemRow';

import { selectFinanceSettings } from '@/redux/settings/selectors';
import useLanguage from '@/locale/useLanguage';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';
import TextArea from 'antd/es/input/TextArea';

export default function ExperimentForm({ subTotal = 0, current = null }) {
  return <LoadExperimentForm subTotal={subTotal} current={current} />;
}

function LoadExperimentForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();
  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        {/* experimentCode, style, topic */}
        <Col className="gutter-row" span={10}>
          <Form.Item
            label={translate('experimentCode')}
            name="experimentCode"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item
            label={translate('style')}
            name="style"
          >
            <Select
              options={[
                { value: 'Stand-alone', label: 'Stand-alone' },
                { value: 'Conversation', label: 'Conversation' },
              ]}
            ></Select>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={10}>
          <Form.Item
            name="topic"
            label={translate('topic')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'topic'}
              displayLabels={['name']}
              searchFields={'name'}
              redirectLabel={'Add New Topic'}
              withRedirect
              urlToRedirect={'/topic'}
            />
          </Form.Item>
        </Col>
        {/* description */}
        <Col className="gutter-row" span={24}>
          <Form.Item
            label={translate('description')}
            name="description"
          >
            <TextArea style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        {/* initPrompt */}
        <Col className="gutter-row" span={24}>
          <Form.Item
            label={translate('init prompt')}
            name="initPrompt"
          >
            <TextArea style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      {/* Templates */}
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={24}>
          <p>{translate('Artifacts')}</p>
        </Col>
      </Row>
      <Form.List name="templates">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <TemplateItemRow key={field.key} remove={remove} field={field} current={current} />
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                {translate('Add artifacts field')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      {/* Criteria */}
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={24}>
          <p>{translate('Criteria')}</p>
        </Col>
        <Col className="gutter-row" span={24}>
          <Form.Item
            label={translate('Rule Logic')}
            name="ruleLogic"
          >
            <Select
              options={[
                { value: 'Any', label: 'Any' },
                { value: 'All', label: 'All' },
              ]}
            ></Select>
          </Form.Item>
        </Col>
      </Row>
      <Form.List name="rules">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <CriteriaRuleItemRow key={field.key} remove={remove} field={field} current={current} />
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                {translate('Add Criteria rules field')}
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <div style={{ position: 'relative', width: ' 100%', float: 'right' }}>
        <Row gutter={[12, -5]}>
          <Col className="gutter-row" span={5}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
                {translate('Save')}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </div>
    </>
  );
}
