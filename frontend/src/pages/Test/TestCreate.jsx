import useLanguage from '@/locale/useLanguage';
import CreateTestModule from '@/modules/TestModule/CreateTestModule/index';

export default function TestCreate() {
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
  return <CreateTestModule config={configPage} />;
}
