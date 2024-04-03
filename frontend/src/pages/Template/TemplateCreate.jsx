import useLanguage from '@/locale/useLanguage';
import CreateTemplateModule from '@/modules/TemplateCrudModule/CreateTemplateModule/index';

export default function TemplateCreate() {
  const translate = useLanguage();

  const entity = 'template';

  const Labels = {
    PANEL_TITLE: translate('template'),
    DATATABLE_TITLE: translate('template_list'),
    ADD_NEW_ENTITY: translate('add_new_template'),
    ENTITY_NAME: translate('template'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <CreateTemplateModule config={configPage} />;
}
