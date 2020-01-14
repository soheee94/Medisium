export default function createAsyncDispatcher(type, promiseFn) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  async function actionHandler(dispatch, ...rest) {
    // 요청 시작
    dispatch({ type });
    try {
      const data = await promiseFn(...rest);
      // 성공
      dispatch({
        type: SUCCESS,
        data
      });
    } catch (e) {
      // 실패
      dispatch({
        type: ERROR,
        error: e
      });
    }
  }

  return actionHandler;
}

export const initialAsyncState = {
  loading: false,
  data: null,
  error: null
};

// 로딩 중일 때 상태 객체
const loadingState = {
  loading: true,
  data: null,
  error: null
};

// 성공 상태 객체
const success = data => ({
  loading: false,
  data,
  error: null
});

// 실패 상태 객체
const error = error => ({
  loading: false,
  data: null,
  error: error
});

// loading, success, error 액션 처리 객체
export function createAsyncHandler(type, key) {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;
  function handler(state, action) {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: loadingState
        };
      case SUCCESS:
        return {
          ...state,
          [key]: success(action.data)
        };
      case ERROR:
        return {
          ...state,
          [key]: error(action.error)
        };

      default:
        return state;
    }
  }

  return handler;
}
