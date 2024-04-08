// import CrudModule from '@/modules/CrudModule/CrudModule';
import TemplateCrudModule from '@/modules/TemplateCrudModule/TemplateCrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Template() {
  const translate = useLanguage();
  const entity = 'template';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Artifact'),
    DATATABLE_TITLE: translate('Artifact_list'),
    ADD_NEW_ENTITY: translate('add_new_Artifact'),
    ENTITY_NAME: translate('Template'),
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
    <TemplateCrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
