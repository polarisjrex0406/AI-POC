import { Tag, Divider, Row, Col, Spin, Tooltip } from 'antd';
import { selectMoneyFormat } from '@/redux/settings/selectors';
import { useSelector } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { selectLangDirection } from '@/redux/translate/selectors';

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  RedoOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';

export default function Card({ data, isLoading = false, onClickViewTemplates, onClickRead, onClickEdit, onClickDelete}) {
  const translate = useLanguage();

  return (
    <Col
      className="gutter-row"
      xs={{ span: 24 }}
      sm={{ span: 24 }}
      md={{ span: 24 }}
      lg={{ span: 24 }}
    >
      <div
        className="whiteBox shadow"
        style={{ color: '#595959', fontSize: 13, minHeight: '106px', height: '100%' }}
        onClick={()=>onClickViewTemplates({...data})}
      >
        <div className="pad15 strong" style={{ textAlign: 'center', justifyContent: 'center' }}>
          <h3
            style={{
              color: '#22075e',
              fontSize: 'large',
              margin: '5px 0',
              textTransform: 'capitalize',
            }}
          >
            {data.name}
          </h3>
        </div>
        <Divider style={{ padding: 0, margin: 0 }}></Divider>
        <div className="pad15">
          <Row gutter={[0, 0]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
              <div className="left" style={{ whiteSpace: 'nowrap' }}>
                Group:{data.group}
              </div>
            </Col>
          </Row>
        </div>
        <div className="pad15">
          <Row gutter={[0, 0]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
              <div className="left" style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                Goal:{data.goal}
              </div>
            </Col>
          </Row>
        </div>
        <div className="pad15">
          <Row gutter={[0, 0]} justify="space-between" wrap={false}>
            <Col className="gutter-row" flex="85px" style={{ textAlign: 'left' }}>
              <div className="left" style={{ whiteSpace: 'nowrap' }}>
                Topic Prompt:{data.topicPrompt}
              </div>
            </Col>
          </Row>
        </div>
        <div className="pad15">
          <Row gutter={[0, 0]} justify="space-between" wrap={false}>
            <Col
              className="gutter-row"
              flex="auto"
              style={{
                display: 'flex',
                justifyContent: 'right',
                alignItems: 'center',
              }}
            >
              {isLoading ? (
                <Spin />
              ) : (
                <>
                  <a onClick={(e)=>{
                    e.stopPropagation();
                    onClickRead({...data});
                  }}>
                    <EyeOutlined/>
                  </a>
            <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
                  <a onClick={(e)=>{
                    e.stopPropagation();
                    onClickEdit({...data});
                  }}>
                    <EditOutlined/>
                  </a>
            <Divider
              style={{
                height: '100%',
                padding: '10px 0',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              type="vertical"
            ></Divider>
                  <a onClick={e=>{
                    e.stopPropagation();
                    onClickDelete({...data});
                  }}>
                    <DeleteOutlined/>
                  </a>
                </>
              )}
            </Col>
          </Row>
        </div>
      </div>
    </Col>
  );
}
