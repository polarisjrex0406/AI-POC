import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Row, Col, Select } from 'antd';
import TextArea from 'antd/es/input/TextArea';

import { DeleteOutlined } from '@ant-design/icons';
import calculate from '@/utils/calculate';
import useLanguage from '@/locale/useLanguage';
import AutoCompleteAsync from '@/components/AutoCompleteAsync';

export default function TemplateItemRow({ field, remove, current = null }) {
  const translate = useLanguage();

  const order = field.key;

  const [totalState, setTotal] = useState(undefined);
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const updateQt = (value) => {
    setQuantity(value);
  };
  const updatePrice = (value) => {
    setPrice(value);
  };

  useEffect(() => {
    if (current) {
      // When it accesses the /payment/ endpoint,
      // it receives an invoice.item instead of just item
      // and breaks the code, but now we can check if items exists,
      // and if it doesn't we can access invoice.items.

      // const { items, invoice } = current;

      // if (invoice) {
      //   const item = invoice[field.fieldKey];

      //   if (item) {
      //     setQuantity(item.quantity);
      //     setPrice(item.price);
      //   }
      // } else {
      //   const item = items[field.fieldKey];

      //   if (item) {
      //     setQuantity(item.quantity);
      //     setPrice(item.price);
      //   }
      // }
    }
  }, [current]);

  useEffect(() => {
    const currentTotal = calculate.multiply(price, quantity);

    setTotal(currentTotal);
  }, [price, quantity]);

  return (
    <Row gutter={[12, 12]} style={{ position: 'relative' }}>
      {/* <Col className="gutter-row" span={3}>
        <Form.Item
          name={[field.name, 'order']}
        >
          <InputNumber
            placeholder="Order"
            value={order}
            // readOnly
            min={0}
            // controls={false}
          />
        </Form.Item>
      </Col> */}
        <Col className="gutter-row" span={24}>
          <Form.Item
            name={[field.name, 'templateCode']}
            // label={translate('templateCode')}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <AutoCompleteAsync
              entity={'template'}
              displayLabels={['name']}
              searchFields={'name'}
              redirectLabel={'Add New Template'}
              withRedirect
              urlToRedirect={'/template'}
            />
          </Form.Item>
        </Col>
      <div style={{ position: 'absolute', right: '-20px', top: ' 5px' }}>
        <DeleteOutlined onClick={() => remove(field.name)} />
      </div>
    </Row>
  );
}
