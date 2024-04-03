import useLanguage from '@/locale/useLanguage';
import ReadTemplateModule from '@/modules/TemplateCrudModule/ReadTemplateModule';

export default function TemplateRead() {
  const translate = useLanguage();

  const entity = 'template';

  const Labels = {
    PANEL_TITLE: translate('artifact'),
    DATATABLE_TITLE: translate('artifact_list'),
    ADD_NEW_ENTITY: translate('add_new_artifact'),
    ENTITY_NAME: translate('template'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <ReadTemplateModule config={configPage} />;
}
