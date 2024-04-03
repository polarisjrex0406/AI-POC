import useLanguage from '@/locale/useLanguage';
import UpdateTemplateModule from '@/modules/TemplateCrudModule/UpdateTemplateModule';

export default function TemplateUpdate() {
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
  return <UpdateTemplateModule config={configPage} />;
}
