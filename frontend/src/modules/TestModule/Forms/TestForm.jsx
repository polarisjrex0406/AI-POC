import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import { Form, Input, InputNumber, Button, Select, Divider, Row, Col } from 'antd';

import { PlusOutlined } from '@ant-design/icons';

import { DatePicker } from 'antd';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';

import TestItemRow from '@/modules/TestModule/ItemsRow/TestItemRow'

import { selectFinanceSettings } from '@/redux/settings/selectors';
import { useDate } from '@/settings';
import useLanguage from '@/locale/useLanguage';

import calculate from '@/utils/calculate';
import { useSelector } from 'react-redux';
import SelectAsync from '@/components/SelectAsync';
import TextArea from 'antd/es/input/TextArea';

export default function TestForm({ subTotal = 0, current = null }) {
  return <LoadTestForm subTotal={subTotal} current={current} />;
}

function LoadTestForm({ subTotal = 0, current = null }) {
  const translate = useLanguage();

  const addField = useRef(false);

  useEffect(() => {
    addField.current.click();
  }, []);

  return (
    <>
      <Row gutter={[12, 0]}>
        {/* testCode, topic */}
        <Col className="gutter-row" span={12}>
          <Form.Item
            label={translate('test Code')}
            name="testCode"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={12}>
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
      </Row>

      {/* Templates */}
      <Divider dashed />
      <Row gutter={[12, 12]} style={{ position: 'relative' }}>
        <Col className="gutter-row" span={24}>
          <p>{translate('experiment')}</p>
        </Col>
      </Row>
      <Form.List name="experiments">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <TestItemRow key={field.key} remove={remove} field={field} current={current} />
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
                ref={addField}
              >
                {translate('Add experiments field')}
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
