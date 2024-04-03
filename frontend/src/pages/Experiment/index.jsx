// import CrudModule from '@/modules/CrudModule/CrudModule';
import ExperimentCrudModule from '@/modules/ExperimentCrudModule/ExperimentCrudModule';
import DynamicForm from '@/forms/DynamicForm';
import { fields } from './config';

import useLanguage from '@/locale/useLanguage';

export default function Experiment() {
  const translate = useLanguage();
  const entity = 'experiment';
  const searchConfig = {
    displayLabels: ['name'],
    searchFields: 'experimentCode',
  };
  const deleteModalLabels = ['name'];

  const Labels = {
    PANEL_TITLE: translate('Experiment'),
    DATATABLE_TITLE: translate('Experiment_list'),
    ADD_NEW_ENTITY: translate('add_new_Experiment'),
    ENTITY_NAME: translate('Experiment'),
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
    <ExperimentCrudModule
      createForm={<DynamicForm fields={fields} />}
      updateForm={<DynamicForm fields={fields} />}
      config={config}
    />
  );
}
