const CACHE_EVENT_PREFIX = "clean-cache-";
const ERROR_EVENT_PREFIX = "error-";

export const CREATE_METHOD = "create";
export const READ_METHOD = "read";
export const UPDATE_METHOD = "update";
export const DELETE_METHOD = "delete";

export const VALID_METHODS = [CREATE_METHOD, READ_METHOD, UPDATE_METHOD, DELETE_METHOD];

const CREATE_EVENT_PREFIX = `${CREATE_METHOD}-`;
const READ_EVENT_PREFIX = `${READ_METHOD}-`;
const UPDATE_EVENT_PREFIX = `${UPDATE_METHOD}-`;
const DELETE_EVENT_PREFIX = `${DELETE_METHOD}-`;

const BEFORE_PREFIX = "before-";
const ANY_SUFIX = "any";

export const CREATE_ANY_EVENT = `${CREATE_EVENT_PREFIX}${ANY_SUFIX}`;
export const READ_ANY_EVENT = `${READ_EVENT_PREFIX}${ANY_SUFIX}`;
export const UPDATE_ANY_EVENT = `${UPDATE_EVENT_PREFIX}${ANY_SUFIX}`;
export const DELETE_ANY_EVENT = `${DELETE_EVENT_PREFIX}${ANY_SUFIX}`;

export const ERROR_ANY_EVENT = `${ERROR_EVENT_PREFIX}${ANY_SUFIX}`;

export const BEFORE_CREATE_ANY_EVENT = `${BEFORE_PREFIX}${CREATE_EVENT_PREFIX}${ANY_SUFIX}`;
export const BEFORE_READ_ANY_EVENT = `${BEFORE_PREFIX}${READ_EVENT_PREFIX}${ANY_SUFIX}`;
export const BEFORE_UPDATE_ANY_EVENT = `${BEFORE_PREFIX}${UPDATE_EVENT_PREFIX}${ANY_SUFIX}`;
export const BEFORE_DELETE_ANY_EVENT = `${BEFORE_PREFIX}${DELETE_EVENT_PREFIX}${ANY_SUFIX}`;

export const filterId = filter => JSON.stringify(filter);

export const cleanCacheEventName = filter => `${CACHE_EVENT_PREFIX}${filterId(filter)}`;
export const errorEventName = filter => `${ERROR_EVENT_PREFIX}${filterId(filter)}`;

export const isCacheEventName = eventName => eventName.indexOf(CACHE_EVENT_PREFIX) === 0;

export const readEventName = filter => `${READ_EVENT_PREFIX}${filterId(filter)}`;
export const createEventName = filter => `${CREATE_EVENT_PREFIX}${filterId(filter)}`;
export const updateEventName = filter => `${UPDATE_EVENT_PREFIX}${filterId(filter)}`;
export const deleteEventName = filter => `${DELETE_EVENT_PREFIX}${filterId(filter)}`;

export const beforeReadEventName = filter =>
  `${BEFORE_PREFIX}${READ_EVENT_PREFIX}${filterId(filter)}`;
export const beforeCreateEventName = filter =>
  `${BEFORE_PREFIX}${CREATE_EVENT_PREFIX}${filterId(filter)}`;
export const beforeUpdateEventName = filter =>
  `${BEFORE_PREFIX}${UPDATE_EVENT_PREFIX}${filterId(filter)}`;
export const beforeDeleteEventName = filter =>
  `${BEFORE_PREFIX}${DELETE_EVENT_PREFIX}${filterId(filter)}`;

export const methodsEventNames = {
  [CREATE_METHOD]: createEventName,
  [READ_METHOD]: readEventName,
  [UPDATE_METHOD]: updateEventName,
  [DELETE_METHOD]: deleteEventName
};

export const methodsBeforeEventNames = {
  [CREATE_METHOD]: beforeCreateEventName,
  [READ_METHOD]: beforeReadEventName,
  [UPDATE_METHOD]: beforeUpdateEventName,
  [DELETE_METHOD]: beforeDeleteEventName
};

export const methodsAnyEventNames = {
  [CREATE_METHOD]: CREATE_ANY_EVENT,
  [READ_METHOD]: READ_ANY_EVENT,
  [UPDATE_METHOD]: UPDATE_ANY_EVENT,
  [DELETE_METHOD]: DELETE_ANY_EVENT
};

export const methodsBeforeAnyEventNames = {
  [CREATE_METHOD]: BEFORE_CREATE_ANY_EVENT,
  [READ_METHOD]: BEFORE_READ_ANY_EVENT,
  [UPDATE_METHOD]: BEFORE_UPDATE_ANY_EVENT,
  [DELETE_METHOD]: BEFORE_DELETE_ANY_EVENT
};
