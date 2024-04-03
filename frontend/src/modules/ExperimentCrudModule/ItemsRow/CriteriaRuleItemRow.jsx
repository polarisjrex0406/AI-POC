import { useState, useEffect, useRef } from 'react';
import { Form, Input, InputNumber, Row, Col, Select, Divider, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

import { DeleteOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

import ConditionsItemRow from './ConditionsItemRow';
import { generate as uniqueId } from 'shortid';

export default function CriteriaRuleItemRow({ field, remove, current = null }) {
  const translate = useLanguage();

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col className="gutter-row" span={16}>
        <Form.Item
          name={[field.name, 'ruleName']}
          rules={[
            {
              required: true,
              message: 'Missing rule name',
            },
          ]}
        >
          <Input placeholder="Rule name" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={8}>
        <Form.Item name={[field.name, 'conditionsLogic']}
            rules={[
              {
                required: true,
              },
            ]}
        >
            <Select
              options={[
                { value: 'Any', label: 'Any' },
                { value: 'All', label: 'All' },
              ]}
            ></Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item
          name={[field.name, 'conditionName']}
        >
          <Input placeholder="Condition Name" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item name={[field.name, 'conditionType']}
        >
            <Input placeholder="Condition Type" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={5}>
        <Form.Item
          name={[field.name, 'conditionItem']}
        >
          <Input placeholder="Condition Item" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={3}>
        <Form.Item
          name={[field.name, 'conditionOperator']}
        >
            <Select
              options={[
                { value: 'EQ', label: 'EQ' },
                { value: 'NEQ', label: 'NEQ' },
                { value: 'LT', label: 'LT' },
                { value: 'LTE', label: 'LTE' },
                { value: 'GT', label: 'GT' },
                { value: 'GTE', label: 'GTE' },
                { value: 'IN', label: 'IN' },
                { value: 'NOTIN', label: 'NOTIN' },
              ]}
            ></Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={6}>
        <Form.Item
          name={[field.name, 'conditionValue']}
        >
          <Input placeholder="Condition Value" />
        </Form.Item>
      </Col>

      <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}
