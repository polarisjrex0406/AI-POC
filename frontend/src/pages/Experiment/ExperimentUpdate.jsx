import useLanguage from '@/locale/useLanguage';
import UpdateExperimentModule from '@/modules/ExperimentCrudModule/UpdateExperimentModule';

export default function ExperimentUpdate() {
  const translate = useLanguage();

  const entity = 'experiment';

  const Labels = {
    PANEL_TITLE: translate('experiment'),
    DATATABLE_TITLE: translate('experiment_list'),
    ADD_NEW_ENTITY: translate('add_new_experiment'),
    ENTITY_NAME: translate('experiment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <UpdateExperimentModule config={configPage} />;
}
