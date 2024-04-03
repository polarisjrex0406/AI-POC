// import CrudModule from '@/modules/CrudModule/CrudModule';
import TopicCrudModule from '@/modules/TopicCrudModule/TopicCrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Topic() {
  const translate = useLanguage();
  const entity = 'topic';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Topic'),
    DATATABLE_TITLE: translate('Topic_list'),
    ADD_NEW_ENTITY: translate('add_new_Topic'),
    ENTITY_NAME: translate('Topic'),
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
    <TopicCrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
