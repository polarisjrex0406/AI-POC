import './style/app.css';

import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import PageLoader from '@/components/PageLoader';

const RuleThePrompt = lazy(() => import('./apps/RuleThePrompt'));

export default function RoutApp() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Suspense fallback={<PageLoader />}>
          <RuleThePrompt />
        </Suspense>
      </Provider>
    </BrowserRouter>
  );
}
