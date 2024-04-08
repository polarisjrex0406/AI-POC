import { Row } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { useNavigate } from 'react-router-dom';

import SummaryCard from './components/SummaryCard';

import { PageHeader } from '@ant-design/pro-layout';
import { selectLangDirection } from '@/redux/translate/selectors';
import { useSelector } from 'react-redux'
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  EllipsisOutlined,
  RedoOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Dropdown, Table, Button, Input, Divider } from 'antd';

export default function TestModule() {
  const translate = useLanguage();
  const navigate = useNavigate();
  const langDirection=useSelector(selectLangDirection);

  const filterTable = (e) => {
    const value = e.target.value;
    const options = { q: value, fields: searchConfig?.searchFields || '' };
    dispatch(crud.list({ entity, options }));
  };

    return (
      <>
      <PageHeader
        onBack={() => window.history.back()}
        backIcon={langDirection==="rtl"?<ArrowRightOutlined/>:<ArrowLeftOutlined />}
        title={`Test`}
        ghost={false}
        style={{
          padding: '20px 0px',
          direction:langDirection,
          position: 'fixed',
          top: '0px',
        }}
      ></PageHeader>

        <Row gutter={[32, 32]}>
          <SummaryCard
            title={translate('New Test Queue')}
            tagColor={'cyan'}
            prefix={translate('Test screen to select topics and queue experiments.')}
            isLoading={false}
            data={100}
            onClickCreate={()=>navigate('/test/create')}
          />
          <SummaryCard
            title={translate('Test Results')}
            tagColor={'purple'}
            prefix={translate('Display test results, including requests and responses for each experiment chatbox style ordered by newest ascending, with the ability to filter by topic/experiment and delete irrelevant tests.')}
            isLoading={false}
            data={100}
            onClickCreate={()=>navigate('/test/result')}
          />
        </Row>
      </>
    );
}
