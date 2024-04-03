// import CrudModule from '@/modules/CrudModule/CrudModule';
import TestResultModule from '@/modules/TestModule/TestResultModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function TestResult() {
  const translate = useLanguage();
  const entity = 'test';
  const searchConfig = {
    displayLabels: ['testCode'],
    searchFields: 'testCode',
  };
  const deleteModalLabels = ['testCode'];

  const Labels = {
    PANEL_TITLE: translate('Test Result'),
    DATATABLE_TITLE: translate('Test Result_list'),
    ADD_NEW_ENTITY: translate('add_new_Test'),
    ENTITY_NAME: translate('Test'),
  };
  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    fields,
    searchConfig,
    deleteModalLabels,
  };
  return (
    <TestResultModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
