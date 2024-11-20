import { createStore, combineReducers, applyMiddleware, Middleware } from "redux";
import thunkMiddleware, { ThunkMiddleware } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { chatReducer } from "./chat/reducers";
import { authReducer } from "./auth/reducers";
import { errorReducer } from "./error/reducers";
import { usersReducer } from "./users/reducers";
import { projectReducer } from "./project/reducers";
import { issueTypeReducer } from "./issuetype/reducers";
import { kanbanTypeReducer } from "./kanbantype/reducers";
import { priorityReducer } from "./priority/reducers";

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  auth: authReducer,
  chat: chatReducer,
  errors: errorReducer,
  users: usersReducer,
  currentProject: projectReducer,
  issueTypes: issueTypeReducer,
  kanbanTypes: kanbanTypeReducer,
  priorities: priorityReducer,
});

// Define the AppState type based on the root reducer
export type AppState = ReturnType<typeof rootReducer>;

// Configure the Redux store
export const configureStore = () => {
  const logger = createLogger({
    collapsed: true, // Collapse actions in the console
    diff: true, // Show state differences
  });

  // Explicitly type middleware array
  const middlewares: Middleware[] = [
    thunkMiddleware as ThunkMiddleware<AppState, any>,
    logger as Middleware
  ];
  
  const middleWareEnhancer = applyMiddleware(...middlewares);

  const store = createStore(
    rootReducer,
    composeWithDevTools(middleWareEnhancer)
  );

  return store;
};






