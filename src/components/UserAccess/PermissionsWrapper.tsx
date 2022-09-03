import { Spinner } from '@patternfly/react-core';
import { getUserAccessQuery } from 'api/queries/userAccessQuery';
import { UserAccess, UserAccessType } from 'api/userAccess';
import { AxiosError } from 'axios';
import { PageTitle } from 'components/PageTitle';
import React, { lazy, Suspense } from 'react';
import { injectIntl, WrappedComponentProps } from 'react-intl';
import { connect } from 'react-redux';
import { createMapStateToProps, FetchStatus } from 'store/common';
import { uiActions } from 'store/ui';
import { userAccessActions, userAccessQuery, userAccessSelectors } from 'store/userAccess';

const Permissions = lazy(() => import('./Permissions'));

interface PermissionsWrapperOwnProps {
  children?: React.ReactNode;
}

interface PermissionsWrapperDispatchProps {
  fetchUserAccess: typeof userAccessActions.fetchUserAccess;
  resetState: typeof uiActions.resetState;
}

interface PermissionsWrapperStateProps {
  userAccess: UserAccess;
  userAccessError: AxiosError;
  userAccessFetchStatus: FetchStatus;
  userAccessQueryString: string;
}

type PermissionsWrapperProps = PermissionsWrapperOwnProps &
  PermissionsWrapperDispatchProps &
  PermissionsWrapperStateProps &
  WrappedComponentProps;

class PermissionsWrapperBase extends React.Component<PermissionsWrapperProps> {
  public componentDidMount() {
    // const { fetchUserAccess, resetState, userAccessQueryString } = this.props;
    const { resetState } = this.props;

    // Clear cached API responses
    resetState();

    // Todo: Enable when API is available
    // fetchUserAccess(UserAccessType.all, userAccessQueryString);
  }

  public render() {
    const { children, userAccessFetchStatus } = this.props;

    return (
      <PageTitle>
        {userAccessFetchStatus === FetchStatus.complete && (
          <Suspense fallback={<Spinner />}>
            <Permissions>{children}</Permissions>
          </Suspense>
        )}
      </PageTitle>
    );
  }
}

const mapStateToProps = createMapStateToProps<PermissionsWrapperOwnProps, PermissionsWrapperStateProps>(state => {
  const userAccessQueryString = getUserAccessQuery(userAccessQuery);
  const userAccess = userAccessSelectors.selectUserAccess(state, UserAccessType.all, userAccessQueryString);
  const userAccessError = userAccessSelectors.selectUserAccessError(state, UserAccessType.all, userAccessQueryString);
  // const userAccessFetchStatus = userAccessSelectors.selectUserAccessFetchStatus(
  //   state,
  //   UserAccessType.all,
  //   userAccessQueryString
  // );
  const userAccessFetchStatus = FetchStatus.complete; // Todo: Remove when API is available

  return {
    userAccess,
    userAccessError,
    userAccessFetchStatus,
    userAccessQueryString,
  };
});

const mapDispatchToProps: PermissionsWrapperDispatchProps = {
  fetchUserAccess: userAccessActions.fetchUserAccess,
  resetState: uiActions.resetState,
};

const PermissionsWrapperConnect = connect(mapStateToProps, mapDispatchToProps)(PermissionsWrapperBase);
const PermissionsWrapper = injectIntl(PermissionsWrapperConnect);

export default PermissionsWrapper;