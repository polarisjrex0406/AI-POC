import useLanguage from '@/locale/useLanguage';
import ReadTestModule from '@/modules/TestModule/ReadTestModule';

export default function TestRead() {
  const translate = useLanguage();

  const entity = 'test';

  const Labels = {
    PANEL_TITLE: translate('test'),
    DATATABLE_TITLE: translate('test_list'),
    ADD_NEW_ENTITY: translate('add_new_test'),
    ENTITY_NAME: translate('test'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <ReadTestModule config={configPage} />;
}
