import useLanguage from '@/locale/useLanguage';
import CreateExperimentModule from '@/modules/ExperimentCrudModule/CreateExperimentModule/index';

export default function ExperimentCreate() {
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
  return <CreateExperimentModule config={configPage} />;
}
