import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { DeleteOutlined } from '@ant-design/icons';
import calculate from '@/utils/calculate';

export default function PromptEnhancerItemRow({ field, remove, current = null }) {
  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      <Col className="gutter-row" span={8}>
        <Form.Item
          name={[field.name, 'key']}
          rules={[
            {
              required: true,
              message: 'Missing key',
            },
          ]}
        >
          <Input placeholder="Key" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={8}>
        <Form.Item name={[field.name, 'valueType']}
          rules={[
            {
              required: true,
            },
          ]}
        // initialValue={'text'}
        >
          <Select
            options={[
              { value: 'text', label: 'text' },
              { value: 'float', label: 'float' },
              { value: 'integer', label: 'integer' },
            ]}
          ></Select>
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={8}>
        <Form.Item
          name={[field.name, 'value']}
          rules={[
            {
              required: true,
              message: 'Missing value',
            },
          ]}
        >
          <Input placeholder="Value" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={8}>
        <Form.Item
          name={[field.name, 'description']}
        >
          <TextArea placeholder="Description" />
        </Form.Item>
      </Col>
      <Col className="gutter-row" span={16}>
        <Form.Item
          name={[field.name, 'promptModifier']}
        >
          <TextArea placeholder="Prompt Modifier" />
        </Form.Item>
      </Col>

      <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}
