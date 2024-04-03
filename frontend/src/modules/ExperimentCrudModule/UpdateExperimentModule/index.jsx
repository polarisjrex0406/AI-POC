import NotFound from '@/components/NotFound';

import { ErpLayout } from '@/layout';
import UpdateItem from './UpdateItem';
import ExperimentForm from '@/modules/ExperimentCrudModule/Forms/ExperimentForm';

import PageLoader from '@/components/PageLoader';

import { erp } from '@/redux/erp/actions';
import useLanguage from '@/locale/useLanguage';
import { selectReadItem } from '@/redux/erp/selectors';
import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateExperimentModule({ config }) {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    dispatch(erp.read({ entity: config.entity, id }));
  }, [id]);

  const { result: currentResult, isSuccess, isLoading = true } = useSelector(selectReadItem);

  useLayoutEffect(() => {
    if (currentResult) {
      dispatch(erp.currentAction({ actionType: 'update', data: currentResult }));
    }
  }, [currentResult]);

  if (isLoading) {
    return (
      <ErpLayout>
        <PageLoader />
      </ErpLayout>
    );
  } else
    return (
      <ErpLayout>
        {isSuccess ? (
          <UpdateItem config={config} UpdateForm={ExperimentForm} />
        ) : (
          <NotFound entity={config.entity} />
        )}
      </ErpLayout>
    );
}
